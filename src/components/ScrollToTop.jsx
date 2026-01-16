import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export default function ScrollToTop() {
    const { pathname, key } = useLocation();
    const navType = useNavigationType();

    useEffect(() => {
        if (navType !== 'POP') {
            // On PUSH or REPLACE navigation, always go to top
            window.scrollTo(0, 0);
        } else {
            // On POP (back/forward button), try to restore saved position
            const savedPosition = sessionStorage.getItem(`scrollPos:${key}`);
            if (savedPosition) {
                // We use a small timeout to allow React to finish the initial render
                // For pages with async content (like About.jsx), this helps hit the right spot
                const timeoutId = setTimeout(() => {
                    window.scrollTo({
                        top: parseInt(savedPosition, 10),
                        behavior: 'auto' // Instant jump for accuracy
                    });
                }, 50);
                return () => clearTimeout(timeoutId);
            }
        }
    }, [pathname, navType, key]);

    // Save scroll position as the user scrolls
    useEffect(() => {
        let timeoutId;
        const handleScroll = () => {
            // Debounce saving to avoid excessive storage writes
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                sessionStorage.setItem(`scrollPos:${key}`, window.scrollY.toString());
            }, 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [key]);

    return null;
}
