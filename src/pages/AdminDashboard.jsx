import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext';
import { useOrganization } from '../context/OrganizationContext';
import {
    getAllDocuments,
    getDocument,
    createDocument,
    updateDocument,
    deleteDocument
} from '../firebase/firestoreService';
import AnalyticsChart from '../components/AnalyticsChart';
import './AdminDashboard.css';

const Icons = {
    Lock: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
    Hand: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" /><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" /><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" /><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" /></svg>,
    Heart: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>,
    LogOut: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>,
    Users: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    FileText: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>,
    Book: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>,
    Layout: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>,
    Plus: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
    X: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
    Check: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
    Trash: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>,
    Edit: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
    Save: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>,
    AlertTriangle: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
    Home: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
    Rocket: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>,
    Star: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
    Settings: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>,
    Activity: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
};

function AdminDashboard() {
    const { user, isAdmin, logout, createAdminUser } = useAuth();
    const { orgData, updateOrgData } = useOrganization();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('analytics'); // Default to analytics for visibility

    // Analytics state
    const [analyticsData, setAnalyticsData] = useState([]);
    const [analyticsSummary, setAnalyticsSummary] = useState({ totalViews: 0, totalVisitors: 0, topPages: [] });

    // Users state
    const [users, setUsers] = useState([]);
    const [showUserForm, setShowUserForm] = useState(false);
    const [newUser, setNewUser] = useState({ email: '', password: '', displayName: '' });

    // Blog state
    const [blogPosts, setBlogPosts] = useState([]);
    const [showBlogForm, setShowBlogForm] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [blogForm, setBlogForm] = useState({
        slug: '', title: '', subtitle: '', excerpt: '', content: '',
        date: '', author: '', tags: '', image: '📝', featured: false, published: true
    });

    // Classes state
    const [classes, setClasses] = useState([]);
    const [showClassForm, setShowClassForm] = useState(false);
    const [editingClass, setEditingClass] = useState(null);
    const [classForm, setClassForm] = useState({
        title: '', subtitle: '', objective: '', audience: '', schedule: '',
        icon: '📖', color: 'primary', published: true
    });


    // Volunteers state
    const [employees, setEmployees] = useState([]);
    const [showVolunteerForm, setShowVolunteerForm] = useState(false);
    const [editingVolunteer, setEditingVolunteer] = useState(null);
    const [volunteerForm, setVolunteerForm] = useState({
        name: '', title: '', department: '', imageUrl: ''
    });
    // Pages state
    const [pages, setPages] = useState({ home: null, journey: null, donate: null, volunteer: null, classes: null });
    const [editingPage, setEditingPage] = useState(null); // 'home' or 'journey'
    const [pageForm, setPageForm] = useState(null);

    // Organization state
    const [orgForm, setOrgForm] = useState(null);
    const [uploadingQr, setUploadingQr] = useState(false);

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [showActions, setShowActions] = useState(false);
    const [storageStats, setStorageStats] = useState({ dbSize: 0, mediaSize: 0, docCount: 0 });

    // Redirect if not admin
    useEffect(() => {
        if (!isAdmin) {
            navigate('/login');
        } else {
            loadData();
        }
    }, [isAdmin, navigate]);

    const loadData = async () => {
        setLoading(true);
        try {
            const [usersData, blogData, classesData, homeData, journeyData, donateData, volunteerData, classesPageData, analyticsRaw, employeesData] = await Promise.all([
                getAllDocuments('users'),
                getAllDocuments('blog-posts'),
                getAllDocuments('classes'),
                getDocument('pages', 'home'),
                getDocument('pages', 'journey'),
                getDocument('pages', 'donate'),
                getDocument('pages', 'volunteer'),
                getDocument('pages', 'classes'),
                getAllDocuments('analytics_daily'),
                getAllDocuments('employees')
            ]);
            setUsers(usersData);
            setEmployees(employeesData || []);
            setBlogPosts(blogData.sort((a, b) => new Date(b.date) - new Date(a.date)));
            setClasses(classesData);
            setPages({
                home: homeData,
                journey: journeyData,
                donate: donateData,
                volunteer: volunteerData,
                classes: classesPageData
            });

            // Process Analytics
            // Sort by Date Descending
            const sortedAnalytics = analyticsRaw.sort((a, b) => new Date(b.id) - new Date(a.id));
            setAnalyticsData(sortedAnalytics);

            // Estimate Storage (Database + Embedded Media)
            const allStorageData = {
                users: usersData,
                blog: blogData,
                classes: classesData,
                pages: { homeData, journeyData, donateData, volunteerData, classesPageData },
                analytics: analyticsRaw
            };
            const jsonString = JSON.stringify(allStorageData);
            const totalBytes = new Blob([jsonString]).size;

            // Calculate Embedded Media (Base64) roughly
            const mediaMatches = jsonString.match(/data:image\/[^"]+/g) || [];
            const mediaBytes = mediaMatches.reduce((acc, str) => acc + str.length, 0);

            setStorageStats({
                dbSize: totalBytes,
                mediaSize: mediaBytes,
                docCount: usersData.length + blogData.length + classesData.length + analyticsRaw.length + 5
            });

            console.log('Analytics Loaded:', sortedAnalytics);

            // Compute Summary (Last 30 Days)
            let totalViews = 0;
            let totalVisitors = 0;
            let totalSessions = 0;
            const pageViewMap = {};

            // Take last 30 entries (days)
            sortedAnalytics.slice(0, 30).forEach(day => {
                totalViews += (day.totalPageViews || 0);
                totalVisitors += (day.dailyActiveUsers || 0); // Changed to use dailyActiveUsers
                totalSessions += (day.totalSessions || 0);

                if (day.pageViews) {
                    Object.entries(day.pageViews).forEach(([page, count]) => {
                        // Restore clean path from flattened key if needed, though we used safe characters
                        pageViewMap[page] = (pageViewMap[page] || 0) + count;
                    });
                }

                // Backward compatibility for malformed dot-notation keys
                Object.keys(day).forEach(key => {
                    if (key.startsWith('pageViews.')) {
                        const pageName = key.split('.')[1];
                        pageViewMap[pageName] = (pageViewMap[pageName] || 0) + day[key];
                    }
                });
            });

            const topPages = Object.entries(pageViewMap)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 10)
                .map(([page, count]) => ({ page, count }));

            setAnalyticsSummary({ totalViews, totalVisitors, totalSessions, topPages });

        } catch (error) {
            showMessage('Error loading data: ' + error.message, 'error');
        }
        setLoading(false);
    };

    const handleResetAnalytics = async () => {
        if (!window.confirm('DANGER: This will wipe ALL analytics data permanently. Are you sure?')) return;

        setLoading(true);
        try {
            const allDays = await getAllDocuments('analytics_daily');
            const promises = allDays.map(day => deleteDocument('analytics_daily', day.id));
            await Promise.all(promises);

            showMessage('Analytics data reset successfully!');
            // Also reset local state
            setAnalyticsData([]);
            setAnalyticsSummary({ totalViews: 0, totalVisitors: 0, topPages: [] });
            loadData();
        } catch (error) {
            showMessage('Error resetting analytics: ' + error.message, 'error');
        }
        setLoading(false);
    };

    const handleResetLocalVisitor = () => {
        if (window.confirm('This will clear your browser\'s tracking data (Active User status). You will count as a NEW visitor on the next reload. Continue?')) {
            localStorage.removeItem('analytics_visitor_id');
            localStorage.removeItem('analytics_last_visit');
            localStorage.removeItem('analytics_first_visit');
            sessionStorage.removeItem('analytics_session_id');
            sessionStorage.removeItem('analytics_debounce_path');
            window.location.reload();
        }
    };


    const showMessage = (text, type = 'success') => {
        setMessage({ text, type });
        setTimeout(() => setMessage(null), 5000);
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    // USER MANAGEMENT
    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            const result = await createAdminUser(newUser.email, newUser.password, newUser.displayName);

            if (result.success) {
                showMessage('Admin user created successfully!');
                setShowUserForm(false);
                setNewUser({ email: '', password: '', displayName: '' });
                loadData();
            } else {
                showMessage(result.error, 'error');
            }
        } catch (error) {
            showMessage('Error creating user: ' + error.message, 'error');
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            await deleteDocument('users', userId);
            showMessage('User deleted successfully!');
            loadData();
        } catch (error) {
            showMessage('Error deleting user: ' + error.message, 'error');
        }
    };

    // BLOG MANAGEMENT
    const handleBlogSubmit = async (e) => {
        e.preventDefault();
        try {
            const blogData = {
                ...blogForm,
                tags: blogForm.tags.split(',').map(t => t.trim()),
                date: blogForm.date || new Date().toISOString().split('T')[0]
            };

            if (editingBlog) {
                await updateDocument('blog-posts', editingBlog.id, blogData);
                showMessage('Blog post updated successfully!');
            } else {
                await createDocument('blog-posts', blogData);
                showMessage('Blog post created successfully!');
            }

            setShowBlogForm(false);
            setEditingBlog(null);
            resetBlogForm();
            loadData();
        } catch (error) {
            showMessage('Error saving blog post: ' + error.message, 'error');
        }
    };

    const handleEditBlog = (post) => {
        setEditingBlog(post);
        setBlogForm({
            slug: post.slug,
            title: post.title,
            subtitle: post.subtitle || '',
            excerpt: post.excerpt,
            content: post.content,
            date: post.date,
            author: post.author,
            tags: Array.isArray(post.tags) ? post.tags.join(', ') : '',
            image: post.image || '📝',
            featured: post.featured || false,
            published: post.published !== false
        });
        setShowBlogForm(true);
    };

    const handleDeleteBlog = async (postId) => {
        if (!window.confirm('Are you sure you want to delete this blog post?')) return;

        try {
            await deleteDocument('blog-posts', postId);
            showMessage('Blog post deleted successfully!');
            loadData();
        } catch (error) {
            showMessage('Error deleting blog post: ' + error.message, 'error');
        }
    };

    const resetBlogForm = () => {
        setBlogForm({
            slug: '', title: '', subtitle: '', excerpt: '', content: '',
            date: '', author: '', tags: '', image: '📝', featured: false, published: true
        });
    };

    // CLASS MANAGEMENT
    const handleClassSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingClass) {
                await updateDocument('classes', editingClass.id, classForm);
                showMessage('Class updated successfully!');
            } else {
                await createDocument('classes', classForm);
                showMessage('Class created successfully!');
            }

            setShowClassForm(false);
            setEditingClass(null);
            resetClassForm();
            loadData();
        } catch (error) {
            showMessage('Error saving class: ' + error.message, 'error');
        }
    };

    const handleEditClass = (classItem) => {
        setEditingClass(classItem);
        setClassForm({
            title: classItem.title,
            subtitle: classItem.subtitle || '',
            objective: classItem.objective,
            audience: classItem.audience,
            schedule: classItem.schedule,
            icon: classItem.icon || '📖',
            color: classItem.color || 'primary',
            published: classItem.published !== false
        });
        setShowClassForm(true);
    };

    const handleDeleteClass = async (classId) => {
        if (!window.confirm('Are you sure you want to delete this class?')) return;

        try {
            await deleteDocument('classes', classId);
            showMessage('Class deleted successfully!');
            loadData();
        } catch (error) {
            showMessage('Error deleting class: ' + error.message, 'error');
        }
    };

    const resetClassForm = () => {
        setClassForm({
            title: '', subtitle: '', objective: '', audience: '', schedule: '',
            icon: '📖', color: 'primary', published: true
        });
    };

    // VOLUNTEER MANAGEMENT
    const handleVolunteerSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingVolunteer) {
                await updateDocument('employees', editingVolunteer.id, volunteerForm);
                showMessage('Volunteer updated successfully!');
            } else {
                await createDocument('employees', volunteerForm);
                showMessage('Volunteer created successfully!');
            }
            setShowVolunteerForm(false);
            setEditingVolunteer(null);
            setVolunteerForm({ name: '', title: '', department: '', imageUrl: '' });
            loadData();
        } catch (error) {
            showMessage('Error saving volunteer: ' + error.message, 'error');
        }
    };

    const handleEditVolunteer = (vol) => {
        setEditingVolunteer(vol);
        setVolunteerForm({
            name: vol.name,
            title: vol.title,
            department: vol.department || '',
            imageUrl: vol.imageUrl || ''
        });
        setShowVolunteerForm(true);
    };

    const handleDeleteVolunteer = async (id) => {
        if (!window.confirm('Delete this volunteer?')) return;
        try {
            await deleteDocument('employees', id);
            showMessage('Volunteer deleted successfully');
            loadData();
        } catch (error) {
            showMessage('Error deleting: ' + error.message, 'error');
        }
    };

    const handleVolunteerImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 500 * 1024) { showMessage('File too large (Max 500KB)', 'error'); return; }
        const reader = new FileReader();
        reader.onloadend = () => setVolunteerForm(prev => ({ ...prev, imageUrl: reader.result }));
        reader.readAsDataURL(file);
    };

    const handleSaveOrgSettings = async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await updateOrgData(orgForm);
        if (result.success) {
            showMessage('Organization settings updated successfully');
        } else {
            showMessage('Error updating settings: ' + result.error, 'error');
        }
        setLoading(false);
    };

    const handleOrgPhoneChange = (index, value) => {
        const newPhones = [...orgForm.phone];
        newPhones[index] = value;
        setOrgForm({ ...orgForm, phone: newPhones });
    };

    const handleQrUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Check file size (limit to 500KB to be safe for Firestore)
        if (file.size > 500 * 1024) {
            showMessage('File too large. Please use an image under 500KB.', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            // result is the Base64 string
            setOrgForm(prev => ({ ...prev, qrCodeUrl: reader.result }));
            showMessage('QR Code converted! Click Save Settings to persist.');
        };
        reader.readAsDataURL(file);
    };

    const addPhoneField = () => {
        setOrgForm({ ...orgForm, phone: [...orgForm.phone, ''] });
    };

    const removePhoneField = (index) => {
        const newPhones = orgForm.phone.filter((_, i) => i !== index);
        setOrgForm({ ...orgForm, phone: newPhones });
    };

    // Initialize org form when tab is switched or data loads
    useEffect(() => {
        if (activeTab === 'settings' && orgData) {
            setOrgForm(orgData);
        }
    }, [activeTab, orgData]);

    if (loading && !users.length) return <div className="loading-screen">Loading dashboard...</div>;

    if (loading) {
        return (
            <div className="admin-loading">
                <p>Loading admin dashboard...</p>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            {/* Header */}
            <div className="admin-header">
                <div className="admin-header-content">
                    <div>
                        <h1><span className="icon-inline"><Icons.Lock /></span> Admin Dashboard</h1>
                        <p>Welcome, {user?.email}</p>
                    </div>
                    <button onClick={handleLogout} className="btn btn-secondary">
                        <span className="icon-inline"><Icons.LogOut /></span> Logout
                    </button>
                </div>
            </div>

            {/* Message */}
            {message && (
                <div className={`admin-message ${message.type}`}>
                    {message.type === 'success' ? <Icons.Check /> : <Icons.AlertTriangle />} {message.text}
                </div>
            )}

            {/* Tabs */}
            <div className="admin-tabs">
                <button
                    className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
                    onClick={() => setActiveTab('analytics')}
                >
                    <span className="tab-icon"><Icons.Activity /></span> Analytics
                </button>
                <button
                    className={`tab ${activeTab === 'users' ? 'active' : ''}`}
                    onClick={() => setActiveTab('users')}
                >
                    <span className="tab-icon"><Icons.Users /></span> Users ({users.length})
                </button>
                <button
                    className={`tab ${activeTab === 'blog' ? 'active' : ''}`}
                    onClick={() => setActiveTab('blog')}
                >
                    <span className="tab-icon"><Icons.FileText /></span> Blog Posts ({blogPosts.length})
                </button>
                <button
                    className={`tab ${activeTab === 'classes' ? 'active' : ''}`}
                    onClick={() => setActiveTab('classes')}
                >
                    <span className="tab-icon"><Icons.Book /></span> Classes ({classes.length})
                </button>
                <button
                    className={`tab ${activeTab === 'pages' ? 'active' : ''}`}
                    onClick={() => setActiveTab('pages')}
                >
                    <span className="tab-icon"><Icons.Layout /></span> Pages
                </button>
                <button
                    className={`tab ${activeTab === 'volunteers' ? 'active' : ''}`}
                    onClick={() => setActiveTab('volunteers')}
                >
                    <span className="tab-icon"><Icons.Heart /></span> Volunteers ({employees.length})
                </button>
                <button
                    className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('settings')}
                >
                    <span className="tab-icon"><Icons.Settings /></span> Settings
                </button>
            </div>

            {/* Content */}
            <div className="admin-content">
                {/* Analytics Tab */}
                {activeTab === 'analytics' && (
                    <div className="tab-content analytics-dashboard">
                        {/* Storage Box */}
                        <div className="card" style={{
                            background: 'var(--bg-tertiary)',
                            color: 'var(--text-primary)',
                            padding: '20px',
                            borderRadius: '12px',
                            marginBottom: '25px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            border: '1px solid var(--border-light)',
                            boxShadow: 'var(--shadow-sm)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div style={{ background: 'var(--color-primary)', color: 'white', padding: '12px', borderRadius: '50%', display: 'flex' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>
                                </div>
                                <div>
                                    <h5 style={{ margin: '0 0 5px 0', fontSize: '0.95em', opacity: 0.9, fontWeight: 'normal' }}>Total Database & Image Storage</h5>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                                        <h3 style={{ margin: 0, fontSize: '1.8em', fontWeight: 'bold' }}>
                                            {(storageStats.dbSize / 1024 / 1024).toFixed(3)} MB
                                        </h3>
                                        <span style={{ fontSize: '0.9em', opacity: 0.9 }}>across {storageStats.docCount} items</span>
                                    </div>
                                    <div style={{ fontSize: '0.8em', opacity: 0.5, marginTop: '4px' }}>
                                        {((storageStats.dbSize - storageStats.mediaSize) / 1024 / 1024).toFixed(2)} MB Text + {(storageStats.mediaSize / 1024 / 1024).toFixed(2)} MB Images
                                    </div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right', color: 'var(--text-secondary)', fontSize: '0.8em', maxWidth: '200px', lineHeight: '1.4' }}>
                                <div style={{ opacity: 0.8 }}><Icons.AlertTriangle /> Estimate excludes indexes.</div>
                                <div style={{ marginTop: '5px', opacity: 0.8 }}>Storage Bucket: 0 Bytes (Unused)</div>
                            </div>
                        </div>
                        <div className="content-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', width: '100%', gap: '10px' }}>
                                <div></div>
                                <h2 style={{ margin: 0, textAlign: 'center' }}>Website Usage (Last 30 Days)</h2>
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <button
                                        onClick={() => setShowActions(!showActions)}
                                        className="btn btn-icon"
                                        style={{ padding: '4px', background: 'transparent', color: 'var(--text-secondary)', display: 'flex' }}
                                        title={showActions ? "Hide Actions" : "Show Actions"}
                                    >
                                        <Icons.Settings />
                                    </button>
                                </div>
                            </div>

                            {showActions && (
                                <div className="action-buttons" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    <button onClick={loadData} className="btn btn-secondary">
                                        Refresh Data
                                    </button>
                                    <button onClick={handleResetAnalytics} className="btn btn-danger">
                                        <span className="icon-inline"><Icons.Trash /></span> Reset All Data
                                    </button>
                                    <button onClick={handleResetLocalVisitor} className="btn btn-secondary">
                                        <span className="icon-inline"><Icons.Users /></span> Reset My Status
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="analytics-grid">
                            <div className="stat-card">
                                <div className="stat-icon blue"><Icons.Activity /></div>
                                <div className="stat-info">
                                    <h3>{analyticsSummary.totalViews}</h3>
                                    <p>Total Page Views</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon green"><Icons.Users /></div>
                                <div className="stat-info">
                                    <h3>{analyticsSummary.totalVisitors}</h3>
                                    <p>Active Users (Est)</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon orange"><Icons.Rocket /></div>
                                <div className="stat-info">
                                    <h3>{analyticsSummary.totalSessions}</h3>
                                    <p>Sessions</p>
                                </div>
                            </div>
                        </div>

                        <AnalyticsChart data={analyticsData} topPages={analyticsSummary.topPages} />

                        <div className="analytics-split">
                            <div className="analytics-section">
                                <h3>Most Popular Pages</h3>
                                <div className="data-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Page Path</th>
                                                <th>Views</th>
                                                <th>% of Traffic</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {analyticsSummary.topPages.length > 0 ? (
                                                analyticsSummary.topPages.map((page, index) => (
                                                    <tr key={page.page}>
                                                        <td>{page.page.replace(/_/g, '/')}</td>
                                                        <td><strong>{page.count}</strong></td>
                                                        <td>{Math.round((page.count / analyticsSummary.totalViews) * 100)}%</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr><td colSpan="3">No data yet. Visit some pages!</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="analytics-section">
                                <h3>Daily Traffic (Last 7 Days)</h3>
                                <div className="traffic-list">
                                    {analyticsData.slice(0, 7).map(day => (
                                        <div key={day.id} className="traffic-row">
                                            <div className="traffic-date">{new Date(day.id).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                                            <div className="traffic-bar-container">
                                                <div
                                                    className="traffic-bar"
                                                    style={{ width: `${Math.min((day.totalPageViews / (analyticsData[0]?.totalPageViews || 1)) * 100, 100)}%` }}
                                                ></div>
                                            </div>
                                            <div className="traffic-count">{day.totalPageViews || 0}</div>
                                        </div>
                                    ))}
                                    {analyticsData.length === 0 && <p>No daily data recorded yet.</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Users Tab */}
                {activeTab === 'users' && (
                    <div className="tab-content">
                        <div className="content-header">
                            <h2>Manage Admin Users</h2>
                            <button
                                onClick={() => setShowUserForm(!showUserForm)}
                                className="btn btn-primary"
                            >
                                {showUserForm ? <><span className="icon-inline"><Icons.X /></span> Cancel</> : <><span className="icon-inline"><Icons.Plus /></span> Add User</>}
                            </button>
                        </div>

                        {showUserForm && (
                            <form onSubmit={handleCreateUser} className="admin-form card animate-in" style={{ maxWidth: '500px', margin: '0 0 2rem 0', padding: '1.5rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-md)', background: 'var(--bg-card)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Create New Admin User</h3>
                                    <button type="button" onClick={() => setShowUserForm(false)} style={{ background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>✖</button>
                                </div>
                                <div style={{ display: 'grid', gap: '1.2rem' }}>
                                    <div className="form-group" style={{ margin: 0 }}>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Address *</label>
                                        <input
                                            type="email"
                                            value={newUser.email}
                                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                            style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid var(--border-light)', borderRadius: '6px', fontSize: '0.95rem', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                                            required
                                            placeholder="admin@example.com"
                                        />
                                    </div>
                                    <div className="form-group" style={{ margin: 0 }}>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Password *</label>
                                        <input
                                            type="password"
                                            value={newUser.password}
                                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                            style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid var(--border-light)', borderRadius: '6px', fontSize: '0.95rem', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                                            required
                                            minLength="6"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                    <div className="form-group" style={{ margin: 0 }}>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Display Name</label>
                                        <input
                                            type="text"
                                            value={newUser.displayName}
                                            onChange={(e) => setNewUser({ ...newUser, displayName: e.target.value })}
                                            style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid var(--border-light)', borderRadius: '6px', fontSize: '0.95rem', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                                            placeholder="e.g. Admin User"
                                        />
                                    </div>
                                </div>
                                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'flex-end' }}>
                                    <button type="submit" className="btn btn-primary" style={{ minWidth: '120px' }}>
                                        <span className="icon-inline"><Icons.Check /></span> Create User
                                    </button>
                                </div>
                            </form>
                        )}

                        <div className="data-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Email</th>
                                        <th>Display Name</th>
                                        <th>Role</th>
                                        <th>Created</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user.id}>
                                            <td>{user.email}</td>
                                            <td>{user.displayName || '-'}</td>
                                            <td><span className="badge">{user.role}</span></td>
                                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                <button
                                                    onClick={() => handleDeleteUser(user.id)}
                                                    className="btn-icon btn-danger"
                                                    title="Delete user"
                                                >
                                                    <Icons.Trash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Blog Tab - Will continue in next message due to length */}
                {activeTab === 'blog' && (
                    <div className="tab-content">
                        <div className="content-header">
                            <h2>Manage Blog Posts</h2>
                            <button
                                onClick={() => {
                                    setEditingBlog(null);
                                    resetBlogForm();
                                    setShowBlogForm(!showBlogForm);
                                }}
                                className="btn btn-primary"
                            >
                                {showBlogForm ? <><span className="icon-inline"><Icons.X /></span> Cancel</> : <><span className="icon-inline"><Icons.Plus /></span> Add Blog Post</>}
                            </button>
                        </div>

                        {showBlogForm && (
                            <form onSubmit={handleBlogSubmit} className="admin-form card animate-in" style={{ maxWidth: '900px', margin: '0 0 2rem 0', padding: '1.5rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-md)', background: 'var(--bg-card)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{editingBlog ? 'Edit Blog Post' : 'New Blog Post'}</h3>
                                    <button type="button" onClick={() => setShowBlogForm(false)} style={{ background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>✖</button>
                                </div>

                                <div style={{ display: 'grid', gap: '1.2rem' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                                        <div className="form-group" style={{ margin: 0 }}>
                                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Slug (URL) *</label>
                                            <input
                                                type="text"
                                                value={blogForm.slug}
                                                onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                                                required
                                                placeholder="my-cool-blog-post"
                                                style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid var(--border-light)', borderRadius: '6px', fontSize: '0.95rem', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                                            />
                                        </div>
                                        <div className="form-group" style={{ margin: 0 }}>
                                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date *</label>
                                            <input
                                                type="date"
                                                value={blogForm.date}
                                                onChange={(e) => setBlogForm({ ...blogForm, date: e.target.value })}
                                                required
                                                style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid var(--border-light)', borderRadius: '6px', fontSize: '0.95rem', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group" style={{ margin: 0 }}>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Title *</label>
                                        <input
                                            type="text"
                                            value={blogForm.title}
                                            onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                                            required
                                            placeholder="Enter post title"
                                            style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid var(--border-light)', borderRadius: '6px', fontSize: '1rem', fontWeight: 600, background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                                        />
                                    </div>

                                    <div className="form-group" style={{ margin: 0 }}>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Subtitle (English)</label>
                                        <input
                                            type="text"
                                            value={blogForm.subtitle}
                                            onChange={(e) => setBlogForm({ ...blogForm, subtitle: e.target.value })}
                                            placeholder="Secondary title"
                                            style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid var(--border-light)', borderRadius: '6px', fontSize: '0.95rem', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                                        />
                                    </div>

                                    <div className="form-group" style={{ margin: 0 }}>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Excerpt *</label>
                                        <textarea
                                            value={blogForm.excerpt}
                                            onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                                            required
                                            rows="2"
                                            placeholder="Short summary for preview"
                                            style={{ width: '100%', padding: '0.6rem 0.75rem', border: '1px solid var(--border-light)', borderRadius: '6px', fontSize: '0.95rem', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', resize: 'vertical' }}
                                        />
                                    </div>

                                    <div className="form-group" style={{ margin: 0 }}>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Content (HTML) *</label>
                                        <textarea
                                            value={blogForm.content}
                                            onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                                            required
                                            rows="8"
                                            placeholder="HTML content here..."
                                            style={{ width: '100%', padding: '0.6rem 0.75rem', border: '1px solid var(--border-light)', borderRadius: '6px', fontSize: '0.9rem', fontFamily: 'monospace', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', resize: 'vertical' }}
                                        />
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div className="form-group" style={{ margin: 0 }}>
                                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Author *</label>
                                            <input
                                                type="text"
                                                value={blogForm.author}
                                                onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                                                required
                                                style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid var(--border-light)', borderRadius: '6px', fontSize: '0.95rem', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                                            />
                                        </div>
                                        <div className="form-group" style={{ margin: 0 }}>
                                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Icon/Emoji</label>
                                            <input
                                                type="text"
                                                value={blogForm.image}
                                                onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                                                placeholder="e.g. 🕌"
                                                style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid var(--border-light)', borderRadius: '6px', fontSize: '0.95rem', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group" style={{ margin: 0 }}>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tags (comma separated)</label>
                                        <input
                                            type="text"
                                            value={blogForm.tags}
                                            onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                                            placeholder="faith, community, education"
                                            style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid var(--border-light)', borderRadius: '6px', fontSize: '0.95rem', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                                        />
                                    </div>

                                    <div style={{ display: 'flex', gap: '1.5rem', background: 'var(--bg-tertiary)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                            <input
                                                type="checkbox"
                                                checked={blogForm.featured}
                                                onChange={(e) => setBlogForm({ ...blogForm, featured: e.target.checked })}
                                                style={{ width: '1.1rem', height: '1.1rem' }}
                                            />
                                            Featured Post
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                            <input
                                                type="checkbox"
                                                checked={blogForm.published}
                                                onChange={(e) => setBlogForm({ ...blogForm, published: e.target.checked })}
                                                style={{ width: '1.1rem', height: '1.1rem' }}
                                            />
                                            Published
                                        </label>
                                    </div>
                                </div>

                                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'flex-end' }}>
                                    <button type="submit" className="btn btn-primary" style={{ minWidth: '150px' }}>
                                        {editingBlog ? <><span className="icon-inline"><Icons.Save /></span> Update Post</> : <><span className="icon-inline"><Icons.Check /></span> Create Post</>}
                                    </button>
                                </div>
                            </form>
                        )}

                        <div className="data-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Author</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {blogPosts.map(post => (
                                        <tr key={post.id}>
                                            <td>
                                                <div className="post-title">
                                                    <span>{post.image}</span>
                                                    {post.title}
                                                    {post.featured && <span className="badge featured"><Icons.Star /> Featured</span>}
                                                </div>
                                            </td>
                                            <td>{post.author}</td>
                                            <td>{new Date(post.date).toLocaleDateString()}</td>
                                            <td>
                                                <span className={`badge ${post.published ? 'success' : 'warning'}`}>
                                                    {post.published ? <><Icons.Check /> Published</> : <><Icons.Layout /> Draft</>}
                                                </span>
                                            </td>
                                            <td className="actions">
                                                <button
                                                    onClick={() => handleEditBlog(post)}
                                                    className="btn-icon"
                                                    title="Edit"
                                                >
                                                    <Icons.Edit />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteBlog(post.id)}
                                                    className="btn-icon btn-danger"
                                                    title="Delete"
                                                >
                                                    <Icons.Trash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Classes Tab */}
                {activeTab === 'classes' && (
                    <div className="tab-content">
                        <div className="content-header">
                            <h2>Manage Classes</h2>
                            <button
                                onClick={() => {
                                    setEditingClass(null);
                                    resetClassForm();
                                    setShowClassForm(!showClassForm);
                                }}
                                className="btn btn-primary"
                            >
                                {showClassForm ? <><span className="icon-inline"><Icons.X /></span> Cancel</> : <><span className="icon-inline"><Icons.Plus /></span> Add Class</>}
                            </button>
                        </div>

                        {showClassForm && (
                            <form onSubmit={handleClassSubmit} className="admin-form card animate-in" style={{ maxWidth: '700px', margin: '0 0 2rem 0', padding: '1.5rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-md)', background: 'var(--bg-card)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{editingClass ? 'Edit Class' : 'New Class'}</h3>
                                    <button type="button" onClick={() => setShowClassForm(false)} style={{ background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>✖</button>
                                </div>

                                <div style={{ display: 'grid', gap: '1.2rem' }}>
                                    <div className="form-group" style={{ margin: 0 }}>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Title *</label>
                                        <input
                                            type="text"
                                            value={classForm.title}
                                            onChange={(e) => setClassForm({ ...classForm, title: e.target.value })}
                                            required
                                            placeholder="Class Name"
                                            style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid var(--border-light)', borderRadius: '6px', fontSize: '1rem', fontWeight: 600, background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                                        />
                                    </div>

                                    <div className="form-group" style={{ margin: 0 }}>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Subtitle (English)</label>
                                        <input
                                            type="text"
                                            value={classForm.subtitle}
                                            onChange={(e) => setClassForm({ ...classForm, subtitle: e.target.value })}
                                            placeholder="Secondary title"
                                            style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid var(--border-light)', borderRadius: '6px', fontSize: '0.95rem', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                                        />
                                    </div>

                                    <div className="form-group" style={{ margin: 0 }}>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Objective *</label>
                                        <textarea
                                            value={classForm.objective}
                                            onChange={(e) => setClassForm({ ...classForm, objective: e.target.value })}
                                            required
                                            rows="3"
                                            placeholder="What will students learn?"
                                            style={{ width: '100%', padding: '0.6rem 0.75rem', border: '1px solid var(--border-light)', borderRadius: '6px', fontSize: '0.95rem', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', resize: 'vertical' }}
                                        />
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div className="form-group" style={{ margin: 0 }}>
                                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Audience</label>
                                            <input
                                                type="text"
                                                value={classForm.audience}
                                                onChange={(e) => setClassForm({ ...classForm, audience: e.target.value })}
                                                placeholder="e.g. Beginners"
                                                style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid var(--border-light)', borderRadius: '6px', fontSize: '0.95rem', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                                            />
                                        </div>
                                        <div className="form-group" style={{ margin: 0 }}>
                                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Schedule</label>
                                            <input
                                                type="text"
                                                value={classForm.schedule}
                                                onChange={(e) => setClassForm({ ...classForm, schedule: e.target.value })}
                                                placeholder="e.g. Sundays, 10 AM"
                                                style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid var(--border-light)', borderRadius: '6px', fontSize: '0.95rem', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                                            />
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div className="form-group" style={{ margin: 0 }}>
                                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Theme Color</label>
                                            <select
                                                value={classForm.color}
                                                onChange={(e) => setClassForm({ ...classForm, color: e.target.value })}
                                                style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid var(--border-light)', borderRadius: '6px', fontSize: '0.95rem', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                                            >
                                                <option value="primary">Deep Blue (Primary)</option>
                                                <option value="secondary">Teal (Secondary)</option>
                                                <option value="accent">Amber (Accent)</option>
                                            </select>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                                                <input
                                                    type="checkbox"
                                                    checked={classForm.published}
                                                    onChange={(e) => setClassForm({ ...classForm, published: e.target.checked })}
                                                    style={{ width: '1.2rem', height: '1.2rem' }}
                                                />
                                                Published / visible
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'flex-end' }}>
                                    <button type="submit" className="btn btn-primary" style={{ minWidth: '150px' }}>
                                        {editingClass ? <><span className="icon-inline"><Icons.Save /></span> Save Changes</> : <><span className="icon-inline"><Icons.Check /></span> Create Class</>}
                                    </button>
                                </div>
                            </form>
                        )}

                        <div className="data-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Class</th>
                                        <th>Audience</th>
                                        <th>Schedule</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {classes.map(classItem => (
                                        <tr key={classItem.id}>
                                            <td>
                                                <div className="post-title">
                                                    {classItem.title}
                                                </div>
                                            </td>
                                            <td>{classItem.audience}</td>
                                            <td>{classItem.schedule}</td>
                                            <td>
                                                <span className={`badge ${classItem.published ? 'success' : 'warning'}`}>
                                                    {classItem.published ? <><Icons.Check /> Published</> : <><Icons.Layout /> Hidden</>}
                                                </span>
                                            </td>
                                            <td className="actions">
                                                <button
                                                    onClick={() => handleEditClass(classItem)}
                                                    className="btn-icon"
                                                    title="Edit"
                                                >
                                                    <Icons.Edit />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClass(classItem.id)}
                                                    className="btn-icon btn-danger"
                                                    title="Delete"
                                                >
                                                    <Icons.Trash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Pages Tab */}
                {activeTab === 'pages' && (
                    <div className="tab-content">
                        <div className="content-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h2>Manage Pages</h2>
                                <p>Edit Home, Journey, Donate, and Volunteer page content</p>
                            </div>
                            <a href="#/migrate-pages" target="_blank" className="btn btn-secondary">
                                <span className="icon-inline"></span> Backup & Restore Data
                            </a>
                        </div>

                        <div className="pages-grid" style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr 1fr' }}>
                            {/* Home Page */}
                            <div className="page-card card">
                                <h3><span className="icon-inline"><Icons.Home /></span> Home Page</h3>
                                {pages.home ? (
                                    <>
                                        <div className="page-sections" style={{ marginTop: '1rem' }}>
                                            <h4>Content Sections:</h4>
                                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                                <li>✓ Hero Section</li>
                                                <li>✓ Impact Stats ({pages.home.impactStats?.length || 0})</li>
                                                <li>✓ About Section</li>
                                                <li>✓ Features ({pages.home.features?.length || 0})</li>
                                                <li>✓ CTA Section</li>
                                            </ul>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setEditingPage('home');
                                                setPageForm(JSON.stringify(pages.home, null, 2));
                                            }}
                                            className="btn btn-primary mt-md"
                                        >
                                            <span className="icon-inline"><Icons.Edit /></span> Edit Home Page
                                        </button>
                                    </>
                                ) : (
                                    <p>No content found. Please run migration first.</p>
                                )}
                            </div>

                            {/* Journey Page */}
                            <div className="page-card card">
                                <h3><span className="icon-inline"><Icons.Rocket /></span> Journey Page</h3>
                                {pages.journey ? (
                                    <>
                                        <div className="page-sections" style={{ marginTop: '1rem' }}>
                                            <h4>Content Sections:</h4>
                                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                                <li>✓ Header Section</li>
                                                <li>✓ Timeline ({pages.journey.timeline?.length || 0})</li>
                                                <li>✓ Testimonials ({pages.journey.testimonials?.length || 0})</li>
                                                <li>✓ Milestones ({pages.journey.milestones?.length || 0})</li>
                                                <li>✓ Vision 2030</li>
                                            </ul>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setEditingPage('journey');
                                                setPageForm(JSON.stringify(pages.journey, null, 2));
                                            }}
                                            className="btn btn-primary mt-md"
                                        >
                                            <span className="icon-inline"><Icons.Edit /></span> Edit Journey Page
                                        </button>
                                    </>
                                ) : (
                                    <p>No content found. Please run migration first.</p>
                                )}
                            </div>

                            {/* Donate Page */}
                            <div className="page-card card">
                                <h3><span className="icon-inline"><Icons.Heart /></span> Donate Page</h3>
                                {pages.donate ? (
                                    <>
                                        <div className="page-sections" style={{ marginTop: '1rem' }}>
                                            <h4>Content Sections:</h4>
                                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                                <li>✓ Header Section</li>
                                                <li>✓ Premium Section</li>
                                                <li>✓ Instructions</li>
                                                <li>✓ Thank You Content</li>
                                            </ul>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setEditingPage('donate');
                                                setPageForm(JSON.stringify(pages.donate, null, 2));
                                            }}
                                            className="btn btn-primary mt-md"
                                        >
                                            <span className="icon-inline"><Icons.Edit /></span> Edit Donate Page
                                        </button>
                                    </>
                                ) : (
                                    <p>No content found. Please run migration first.</p>
                                )}
                            </div>

                            {/* Volunteer Page */}
                            <div className="page-card card">
                                <h3><span className="icon-inline"><Icons.Hand /></span> Volunteer Page</h3>
                                {pages.volunteer ? (
                                    <>
                                        <div className="page-sections" style={{ marginTop: '1rem' }}>
                                            <h4>Content Sections:</h4>
                                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                                <li>✓ Header Section</li>
                                                <li>✓ Opportunities ({pages.volunteer.opportunities?.length || 0})</li>
                                                <li>✓ Benefits ({pages.volunteer.benefits?.length || 0})</li>
                                                <li>✓ Testimonial</li>
                                            </ul>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setEditingPage('volunteer');
                                                setPageForm(JSON.stringify(pages.volunteer, null, 2));
                                            }}
                                            className="btn btn-primary mt-md"
                                        >
                                            <span className="icon-inline"><Icons.Edit /></span> Edit Volunteer Page
                                        </button>
                                    </>
                                ) : (
                                    <p>No content found. Please run migration first.</p>
                                )}
                            </div>

                            {/* Classes Page */}
                            <div className="page-card card">
                                <h3><span className="icon-inline"><Icons.Book /></span> Classes Page</h3>
                                {pages.classes ? (
                                    <>
                                        <div className="page-sections" style={{ marginTop: '1rem' }}>
                                            <h4>Content Sections:</h4>
                                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                                <li>✓ Header Title & Description</li>
                                                <li>✓ Info Cards (Registration, Fees, Hours)</li>
                                            </ul>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setEditingPage('classes');
                                                setPageForm(JSON.stringify(pages.classes, null, 2));
                                            }}
                                            className="btn btn-primary mt-md"
                                        >
                                            <span className="icon-inline"><Icons.Edit /></span> Edit Classes Page
                                        </button>
                                    </>
                                ) : (
                                    <p>No content found. Please run migration first.</p>
                                )}
                            </div>
                        </div>

                        {/* JSON Editor Modal */}
                        {editingPage && (
                            <div className="modal-overlay" onClick={() => setEditingPage(null)}>
                                <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '900px', maxHeight: '90vh', overflow: 'auto' }}>
                                    <div className="modal-header">
                                        <h2>Edit {editingPage ? editingPage.charAt(0).toUpperCase() + editingPage.slice(1) : ''} Page</h2>
                                        <button className="btn-close" onClick={() => setEditingPage(null)}>✖️</button>
                                    </div>
                                    <div className="modal-body">
                                        <p className="help-text">
                                            Edit the JSON content below. Be careful with syntax - wrong format may break the page.
                                            <a href={`/#/migrate-pages`} target="_blank" style={{ marginLeft: '1rem' }}>🔄 Run Migration</a>
                                        </p>
                                        <div className="formatting-guide" style={{
                                            background: 'var(--bg-secondary)',
                                            padding: '1rem',
                                            borderRadius: '8px',
                                            marginBottom: '1rem',
                                            fontSize: '0.9rem',
                                            color: 'var(--text-primary)',
                                            border: '1px solid var(--border-light)'
                                        }}>
                                            <strong>Formatting Guide:</strong>
                                            <ul style={{ margin: '0.5rem 0 0 1.2rem', padding: 0 }}>
                                                <li><b>Bold:</b> Use <code>&lt;b&gt;text&lt;/b&gt;</code> or <code>&lt;strong&gt;text&lt;/strong&gt;</code></li>
                                                <li><i>Italic:</i> Use <code>&lt;i&gt;text&lt;/i&gt;</code> or <code>&lt;em&gt;text&lt;/em&gt;</code></li>
                                                <li>Line Break: Use <code>\n</code> or <code>&lt;br&gt;</code></li>
                                            </ul>
                                        </div>
                                        <textarea
                                            value={pageForm}
                                            onChange={(e) => setPageForm(e.target.value)}
                                            rows={25}
                                            style={{
                                                width: '100%',
                                                fontFamily: 'monospace',
                                                fontSize: '14px',
                                                padding: '1rem',
                                                border: '1px solid var(--border-light)',
                                                borderRadius: '8px',
                                                background: 'var(--bg-tertiary)',
                                                color: 'var(--text-primary)'
                                            }}
                                        />
                                        <div className="modal-actions" style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                                            <button
                                                onClick={async () => {
                                                    try {
                                                        const parsed = JSON.parse(pageForm);
                                                        await updateDocument('pages', editingPage, parsed);
                                                        setPages({ ...pages, [editingPage]: parsed });
                                                        showMessage(`${editingPage} page updated successfully!`);
                                                        setEditingPage(null);
                                                        loadData();
                                                    } catch (error) {
                                                        showMessage('Error: ' + error.message, 'error');
                                                    }
                                                }}
                                                className="btn btn-primary"
                                            >
                                                💾 Save Changes
                                            </button>
                                            <button
                                                onClick={() => setEditingPage(null)}
                                                className="btn btn-secondary"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* VOLUNTEERS TAB */}
                {activeTab === 'volunteers' && (
                    <div className="tab-content">
                        <div className="section-header">
                            <h2>Manage Volunteers</h2>
                            <p>Add and edit team members shown on the Volunteer page.</p>
                            <button className="btn btn-primary" onClick={() => {
                                setEditingVolunteer(null);
                                setVolunteerForm({ name: '', title: '', department: '', imageUrl: '' });
                                setShowVolunteerForm(true);
                            }}>
                                <span className="icon-inline"><Icons.Plus /></span> Add Volunteer
                            </button>
                        </div>



                        {showVolunteerForm && (
                            <form onSubmit={handleVolunteerSubmit} className="admin-form card animate-in" style={{
                                maxWidth: '600px',
                                margin: '0 0 2rem 0',
                                padding: '1.5rem',
                                border: '1px solid var(--border-light)',
                                boxShadow: 'var(--shadow-md)',
                                background: 'var(--bg-card)'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>{editingVolunteer ? 'Edit Volunteer' : 'Add Volunteer'}</h3>
                                    <button type="button" onClick={() => setShowVolunteerForm(false)} className="btn-close" style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>✖</button>
                                </div>

                                <div style={{ display: 'grid', gap: '1.25rem' }}>
                                    {/* Name */}
                                    <div className="form-group" style={{ margin: 0 }}>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            value={volunteerForm.name}
                                            onChange={e => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                                            style={{ width: '100%', padding: '0.6rem 1rem', border: '1px solid var(--border-light)', borderRadius: '6px', fontSize: '1rem', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                                            placeholder="e.g. Suhaidi Ali"
                                        />
                                    </div>

                                    {/* Row: Title & Dept */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                                        <div className="form-group" style={{ margin: 0 }}>
                                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Title / Role</label>
                                            <input
                                                required
                                                type="text"
                                                value={volunteerForm.title}
                                                onChange={e => setVolunteerForm({ ...volunteerForm, title: e.target.value })}
                                                style={{ width: '100%', padding: '0.6rem 1rem', border: '1px solid var(--border-light)', borderRadius: '6px', fontSize: '1rem', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                                                placeholder="e.g. Vice President"
                                            />
                                        </div>
                                        <div className="form-group" style={{ margin: 0 }}>
                                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Department</label>
                                            <select
                                                value={
                                                    ['Management', 'Engineering', 'Education', 'Outreach', 'Finance', 'Administration', ...employees.map(e => e.department)].includes(volunteerForm.department)
                                                        ? volunteerForm.department
                                                        : (volunteerForm.department ? 'OTHER' : '')
                                                }
                                                onChange={e => {
                                                    const val = e.target.value;
                                                    if (val === 'OTHER') {
                                                        setVolunteerForm({ ...volunteerForm, department: 'New Department' });
                                                    } else {
                                                        setVolunteerForm({ ...volunteerForm, department: val });
                                                    }
                                                }}
                                                style={{ width: '100%', padding: '0.6rem 1rem', border: '1px solid var(--border-light)', borderRadius: '6px', fontSize: '1rem', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', marginBottom: '0.5rem' }}
                                            >
                                                <option value="">-- Choose Department --</option>
                                                {[...new Set(['Management', 'Engineering', 'Education', 'Outreach', 'Finance', 'Administration', ...employees.map(e => e.department).filter(d => d && typeof d === 'string' && d.trim() !== '')])].sort().map(d => (
                                                    <option key={d} value={d}>{d}</option>
                                                ))}
                                                <option value="OTHER">+ Add New / Custom...</option>
                                            </select>

                                            {/* Custom Input appears if not in the known list or if 'OTHER' selected */}
                                            {(!['Management', 'Engineering', 'Education', 'Outreach', 'Finance', 'Administration', ...employees.map(e => e.department)].includes(volunteerForm.department) || volunteerForm.department === 'New Department') && (
                                                <input
                                                    required
                                                    type="text"
                                                    value={volunteerForm.department === 'New Department' ? '' : volunteerForm.department}
                                                    onChange={e => setVolunteerForm({ ...volunteerForm, department: e.target.value })}
                                                    placeholder="Type new department name..."
                                                    style={{ width: '100%', padding: '0.6rem 1rem', border: '1px solid var(--border-light)', borderRadius: '6px', fontSize: '1rem', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                                                />
                                            )}
                                        </div>
                                    </div>

                                    {/* Photo Section (Compact) */}
                                    <div className="form-group" style={{ margin: 0 }}>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Profile Photo</label>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', border: '1px solid var(--border-light)', borderRadius: '8px', background: 'var(--bg-tertiary)' }}>
                                            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--bg-card)', overflow: 'hidden', flexShrink: 0, border: '2px solid var(--border-light)', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                                                {volunteerForm.imageUrl ? (
                                                    <img src={volunteerForm.imageUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : (
                                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontSize: '1.2rem', fontWeight: 'bold' }}><Icons.User style={{ width: '1.5rem', height: '1.5rem', opacity: 0.3, color: 'var(--text-secondary)' }} /></div>
                                                )}
                                            </div>

                                            <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                                                    {volunteerForm.imageUrl
                                                        ? (volunteerForm.imageUrl.startsWith('data:') ? '✅ Custom Photo Uploaded' : '🔗 Linked via URL')
                                                        : 'No photo selected'
                                                    }
                                                </div>
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    {volunteerForm.imageUrl ? (
                                                        <button type="button" onClick={() => setVolunteerForm({ ...volunteerForm, imageUrl: '' })} className="btn btn-sm btn-danger btn-outline" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}>
                                                            Remove
                                                        </button>
                                                    ) : (
                                                        <label className="btn btn-sm btn-primary" style={{ cursor: 'pointer', padding: '0.35rem 0.75rem', fontSize: '0.75rem', marginBottom: 0, display: 'inline-flex', alignItems: 'center' }}>
                                                            <span style={{ marginRight: '4px' }}>📁</span> Upload
                                                            <input type="file" accept="image/*" onChange={handleVolunteerImageUpload} style={{ display: 'none' }} />
                                                        </label>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        {/* Simple URL Fallback if no image */}
                                        {!volunteerForm.imageUrl && (
                                            <div style={{ marginTop: '0.5rem' }}>
                                                <input
                                                    type="text"
                                                    placeholder="Or paste image URL..."
                                                    value={volunteerForm.imageUrl}
                                                    onChange={e => setVolunteerForm({ ...volunteerForm, imageUrl: e.target.value })}
                                                    style={{ width: '100%', fontSize: '0.8rem', padding: '0.4rem', border: '1px solid var(--border-light)', borderRadius: '4px', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="form-actions" style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowVolunteerForm(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-primary" style={{ minWidth: '100px' }}>
                                        <span className="icon-inline"><Icons.Save /></span> Save
                                    </button>
                                </div>
                            </form>
                        )}

                        <div className="data-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Volunteer</th>
                                        <th>Role</th>
                                        <th>Dept</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map(vol => (
                                        <tr key={vol.id}>
                                            <td>
                                                <div className="post-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    {vol.imageUrl ? (
                                                        <img src={vol.imageUrl} alt="" style={{ width: 30, height: 30, borderRadius: '50%' }} />
                                                    ) : (
                                                        <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            {vol.name.charAt(0)}
                                                        </div>
                                                    )}
                                                    {vol.name}
                                                </div>
                                            </td>
                                            <td>{vol.title}</td>
                                            <td>{vol.department}</td>
                                            <td className="actions">
                                                <button className="btn-icon" onClick={() => handleEditVolunteer(vol)}><Icons.Edit /></button>
                                                <button className="btn-icon btn-danger" onClick={() => handleDeleteVolunteer(vol.id)}><Icons.Trash /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* SETTINGS TAB */}
                {activeTab === 'settings' && orgForm && (
                    <div className="tab-content settings-tab">
                        <div className="section-header">
                            <h2>Organization Settings</h2>
                            <p>Manage your foundation's details.</p>
                        </div>

                        <form onSubmit={handleSaveOrgSettings} className="admin-form card animate-in" style={{ maxWidth: '800px', margin: '0 0 2rem 0', padding: '1.5rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-md)', background: 'var(--bg-card)' }}>
                            <div style={{ display: 'grid', gap: '2rem' }}>
                                {/* Basic Branding */}
                                <section>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Icons.Layout style={{ width: '1.1rem' }} /> Basic Branding
                                    </h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                                        <div className="form-group" style={{ margin: 0 }}>
                                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Short Name (Logo Text)</label>
                                            <input
                                                type="text"
                                                value={orgForm.shortName}
                                                onChange={(e) => setOrgForm({ ...orgForm, shortName: e.target.value })}
                                                required
                                                style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid var(--border-light)', borderRadius: '6px', fontSize: '0.95rem', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                                                placeholder="e.g. HCF.BTR"
                                            />
                                            <small style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block', opacity: 0.8 }}>Appears in navigation and logos</small>
                                        </div>
                                        <div className="form-group" style={{ margin: 0 }}>
                                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Address</label>
                                            <input
                                                type="email"
                                                value={orgForm.email}
                                                onChange={(e) => setOrgForm({ ...orgForm, email: e.target.value })}
                                                required
                                                style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid var(--border-light)', borderRadius: '6px', fontSize: '0.95rem', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                                                placeholder="contact@hcfbtr.com"
                                            />
                                        </div>
                                        <div className="form-group" style={{ margin: 0, gridColumn: 'span 2' }}>
                                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Foundation Name</label>
                                            <input
                                                type="text"
                                                value={orgForm.fullName}
                                                onChange={(e) => setOrgForm({ ...orgForm, fullName: e.target.value })}
                                                required
                                                style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid var(--border-light)', borderRadius: '6px', fontSize: '0.95rem', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                                                placeholder="Hidayah Center Foundation Bintulu"
                                            />
                                        </div>
                                    </div>
                                </section>

                                {/* Contact & Location */}
                                <section>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Icons.MapPin style={{ width: '1.1rem' }} /> Contact & Location
                                    </h3>
                                    <div style={{ display: 'grid', gap: '1.25rem' }}>
                                        <div className="form-group" style={{ margin: 0 }}>
                                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>HQ Address</label>
                                            <textarea
                                                value={orgForm.address}
                                                onChange={(e) => setOrgForm({ ...orgForm, address: e.target.value })}
                                                rows="2"
                                                style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid var(--border-light)', borderRadius: '6px', fontSize: '0.95rem', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', resize: 'vertical' }}
                                                placeholder="Full physical address"
                                            />
                                        </div>
                                        <div className="form-group" style={{ margin: 0 }}>
                                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone Numbers</label>
                                            <div style={{ display: 'grid', gap: '0.75rem' }}>
                                                {orgForm.phone.map((number, index) => (
                                                    <div key={index} style={{ display: 'flex', gap: '0.5rem' }}>
                                                        <input
                                                            type="text"
                                                            value={number}
                                                            onChange={(e) => handleOrgPhoneChange(index, e.target.value)}
                                                            placeholder="+60 12-345 6789"
                                                            style={{ flex: 1, padding: '0.5rem 0.75rem', border: '1px solid var(--border-light)', borderRadius: '6px', fontSize: '0.9rem', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                                                        />
                                                        <button type="button" onClick={() => removePhoneField(index)} className="btn btn-icon btn-danger btn-outline" style={{ padding: '0.4rem', background: 'transparent' }}>
                                                            <Icons.Trash style={{ width: '1rem', height: '1rem' }} />
                                                        </button>
                                                    </div>
                                                ))}
                                                <button type="button" onClick={addPhoneField} className="btn btn-secondary btn-sm" style={{ alignSelf: 'flex-start', fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
                                                    <span className="icon-inline"><Icons.Plus /></span> Add Number
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Banking & Donations */}
                                <section>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Icons.CreditCard style={{ width: '1.1rem' }} /> Banking & Donations
                                    </h3>
                                    <div style={{ display: 'grid', gap: '1.25rem' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                                            <div className="form-group" style={{ margin: 0 }}>
                                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Bank Name</label>
                                                <input
                                                    type="text"
                                                    value={orgForm.bank?.bankName || ''}
                                                    onChange={(e) => setOrgForm({ ...orgForm, bank: { ...orgForm.bank, bankName: e.target.value } })}
                                                    placeholder="e.g. Maybank"
                                                    style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid var(--border-light)', borderRadius: '6px', fontSize: '0.95rem', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                                                />
                                            </div>
                                            <div className="form-group" style={{ margin: 0 }}>
                                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Account Number</label>
                                                <input
                                                    type="text"
                                                    value={orgForm.bank?.accountNumber || ''}
                                                    onChange={(e) => setOrgForm({ ...orgForm, bank: { ...orgForm.bank, accountNumber: e.target.value } })}
                                                    placeholder="e.g. 5642 0350 1894"
                                                    style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid var(--border-light)', borderRadius: '6px', fontSize: '0.95rem', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group" style={{ margin: 0 }}>
                                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Account Beneficiary Name</label>
                                            <input
                                                type="text"
                                                value={orgForm.bank?.accountName || ''}
                                                onChange={(e) => setOrgForm({ ...orgForm, bank: { ...orgForm.bank, accountName: e.target.value } })}
                                                placeholder="e.g. Hidayah Center Foundation"
                                                style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid var(--border-light)', borderRadius: '6px', fontSize: '0.95rem', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                                            />
                                        </div>

                                        <div style={{ marginTop: '0.5rem', background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Donation QR Code</label>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                                {orgForm.qrCodeUrl ? (
                                                    <div style={{ textAlign: 'center' }}>
                                                        <div style={{ width: '120px', height: '120px', border: '2px solid var(--bg-card)', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', background: 'var(--bg-card)' }}>
                                                            <img src={orgForm.qrCodeUrl} alt="QR Code" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => setOrgForm({ ...orgForm, qrCodeUrl: '' })}
                                                            className="btn btn-danger btn-sm"
                                                            style={{ marginTop: '0.5rem', fontSize: '0.7rem', padding: '0.3rem 0.6rem' }}
                                                        >
                                                            <Icons.Trash style={{ width: '0.8rem' }} /> Replace
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div style={{ width: '120px', height: '120px', border: '2px dashed var(--border-light)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-card)', color: 'var(--text-secondary)' }}>
                                                        <Icons.Type style={{ width: '2rem', height: '2rem', opacity: 0.3 }} />
                                                    </div>
                                                )}
                                                <div style={{ flex: 1 }}>
                                                    <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', marginBottom: '0.5rem' }}>
                                                        <Icons.Plus style={{ width: '1rem' }} /> {orgForm.qrCodeUrl ? 'Change QR Image' : 'Upload QR Image'}
                                                        <input type="file" accept="image/*" onChange={handleQrUpload} disabled={uploadingQr} style={{ display: 'none' }} />
                                                    </label>
                                                    {uploadingQr && <div style={{ fontSize: '0.8rem', color: '#3b82f6' }}>Uploading...</div>}
                                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0.5rem 0 0 0', lineHeight: '1.4' }}>
                                                        Upload your DuitNow/Bank QR Code. It will be featured on the main Donate page.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Social Presence */}
                                <section>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Icons.Share2 style={{ width: '1.1rem' }} /> Social Presence
                                    </h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                                        <div className="form-group" style={{ margin: 0 }}>
                                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Facebook URL</label>
                                            <input
                                                type="url"
                                                value={orgForm.facebook || ''}
                                                onChange={(e) => setOrgForm({ ...orgForm, facebook: e.target.value })}
                                                placeholder="https://facebook.com/..."
                                                style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid var(--border-light)', borderRadius: '6px', fontSize: '0.95rem', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                                            />
                                        </div>
                                        <div className="form-group" style={{ margin: 0 }}>
                                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Instagram URL</label>
                                            <input
                                                type="url"
                                                value={orgForm.instagram || ''}
                                                onChange={(e) => setOrgForm({ ...orgForm, instagram: e.target.value })}
                                                placeholder="https://instagram.com/..."
                                                style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid var(--border-light)', borderRadius: '6px', fontSize: '0.95rem', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                                            />
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '2px solid var(--border-light)', display: 'flex', justifyContent: 'flex-end' }}>
                                <button type="submit" className="btn btn-primary" style={{ minWidth: '180px', padding: '0.8rem 1.5rem', fontSize: '1rem', fontWeight: 700, boxShadow: 'var(--shadow-md)' }}>
                                    <span className="icon-inline"><Icons.Save /></span> Update All Settings
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;
