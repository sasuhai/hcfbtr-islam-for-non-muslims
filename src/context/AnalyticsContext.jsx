import { useEffect, createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { updateAnalytics } from '../firebase/firestoreService';
import { increment } from 'firebase/firestore';

const AnalyticsContext = createContext();

export const useAnalytics = () => useContext(AnalyticsContext);

export const AnalyticsProvider = ({ children }) => {
    const location = useLocation();
    useEffect(() => {
        const now = Date.now();
        const lastPath = sessionStorage.getItem('analytics_debounce_path');
        const lastTime = parseInt(sessionStorage.getItem('analytics_debounce_time') || '0', 10);

        const isSamePath = lastPath === location.pathname;
        const isRapidFire = (now - lastTime) < 2000;

        if (isSamePath) {
            console.log('Ignored same-path re-render:', location.pathname);
            return;
        }

        sessionStorage.setItem('analytics_debounce_path', location.pathname);
        sessionStorage.setItem('analytics_debounce_time', now.toString());
        const trackPageView = async () => {
            // Basic bot detection
            const userAgent = navigator.userAgent || '';
            if (/bot|crawler|spider|crawling/i.test(userAgent)) return;

            // Get Today's Date ID (YYYY-MM-DD)
            const today = new Date().toISOString().split('T')[0];

            // Clean path (remove query params for grouping)
            const path = location.pathname;

            // Prepare updates
            const updates = {
                pageViews: {
                    [path.replace(/\//g, '_')]: increment(1)
                },
                totalPageViews: increment(1),
                lastUpdated: new Date().toISOString()
            };

            // Session Tracking (Session Storage)
            // A session lasts as long as the browser tab is open
            const sessionId = sessionStorage.getItem('analytics_session_id');
            if (!sessionId) {
                const newSessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
                sessionStorage.setItem('analytics_session_id', newSessionId);
                updates.totalSessions = increment(1);
            }

            // Unique Visitor Tracking (Local Storage)
            // Persists across sessions
            const visitorId = localStorage.getItem('analytics_visitor_id');
            const lastVisit = localStorage.getItem('analytics_last_visit');

            if (!visitorId) {
                const newVisitorId = `vis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
                localStorage.setItem('analytics_visitor_id', newVisitorId);
                localStorage.setItem('analytics_first_visit', today);
                updates.totalVisitors = increment(1); // New Unique Visitor
                updates.dailyActiveUsers = increment(1); // Count as active for today
            } else {
                // Return visitor, count as "Daily Visitor" if not visited today
                if (lastVisit !== today) {
                    updates.dailyActiveUsers = increment(1);
                }
            }
            localStorage.setItem('analytics_last_visit', today);

            // Execute Update
            await updateAnalytics(today, updates);
        };

        trackPageView();

    }, [location.pathname]); // Run on every path change

    return (
        <AnalyticsContext.Provider value={{}}>
            {children}
        </AnalyticsContext.Provider>
    );
};
