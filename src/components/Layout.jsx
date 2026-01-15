import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Footer from './Footer';
import { useOrganization } from '../context/OrganizationContext';
import { useTheme } from '../context/ThemeContext';
import { translations } from '../translations';

export default function Layout({ children }) {
    const { orgData } = useOrganization();
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();

    // Determine current language from path
    const isBM = location.pathname.startsWith('/bm');
    const lang = isBM ? 'bm' : 'en';
    const t = translations[lang];

    const isActive = (path) => {
        const fullPath = isBM ? `/bm${path}` : path;
        return location.pathname === fullPath || location.pathname === path ? 'active' : '';
    };

    const toggleLanguage = () => {
        const currentPath = location.pathname;
        if (isBM) {
            // Switch to EN - remove /bm prefix
            const nextPath = currentPath.replace('/bm', '') || '/';
            navigate(nextPath);
        } else {
            // Switch to BM - add /bm prefix
            const nextPath = `/bm${currentPath === '/' ? '' : currentPath}`;
            navigate(nextPath);
        }
    };

    const getLink = (path) => {
        return isBM ? `/bm${path}` : path;
    };

    // List of paths that have full translation support
    const supportedPaths = [
        '/',
        '/classes-for-non-muslims',
        '/convert-to-islam-malaysia'
    ];

    const showLanguageToggle = supportedPaths.some(path => {
        const fullPath = isBM ? `/bm${path === '/' ? '' : path}` : path;
        // Exact match or match with /bm prefix
        return location.pathname === path || location.pathname === (isBM ? `/bm${path === '/' ? '' : path}` : `/bm${path === '/' ? '' : path}`);
    });

    // Simplify the check: if it's the home page or matches one of the translated pages (with or without /bm)
    const normalizedPath = location.pathname.replace(/^\/bm/, '') || '/';
    const isSupported = supportedPaths.includes(normalizedPath);

    return (
        <div className="layout">
            <nav className="navbar">
                <div className="container navbar-content">
                    <Link to={getLink('/')} style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2', textDecoration: 'none' }}>
                        <span style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text-primary)' }}>{orgData.shortName || 'HCFBTR'}</span>
                        <span style={{ fontWeight: '400', fontSize: '10px', color: 'var(--text-secondary)', maxWidth: '150px' }}>
                            {orgData.fullName || 'Hidayah Centre Foundation'}
                        </span>
                    </Link>
                    <div className="nav-links">
                        <Link to={getLink('/classes-for-non-muslims')} className={isActive('/classes-for-non-muslims')}>{t.nav.classes}</Link>
                        <Link to={getLink('/convert-to-islam-malaysia')} className={isActive('/convert-to-islam-malaysia')}>{t.nav.revert}</Link>

                        <Link to={getLink('/news')} className={isActive('/news')}>{t.nav.news}</Link>
                        <Link to={getLink('/blog')} className={isActive('/blog')}>Blog</Link>
                        <Link to={getLink('/journey')} className={isActive('/journey')}>{t.nav.journey}</Link>
                        <Link to={getLink('/volunteer')} className={isActive('/volunteer')}>{t.nav.volunteer}</Link>
                        <Link to={getLink('/donate')} className={isActive('/donate')}>{t.nav.donate}</Link>
                        <Link to={getLink('/about')} className={isActive('/about')}>{t.nav.about}</Link>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderLeft: '1px solid var(--border-light)', paddingLeft: '12px', marginLeft: '4px' }}>
                            {isSupported && (
                                <button
                                    onClick={toggleLanguage}
                                    style={{
                                        background: 'var(--bg-tertiary)',
                                        border: '1px solid var(--border-light)',
                                        borderRadius: '4px',
                                        padding: '2px 8px',
                                        fontSize: '11px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        color: 'var(--text-primary)'
                                    }}
                                >
                                    {isBM ? 'EN' : 'BM'}
                                </button>
                            )}

                            <button
                                onClick={toggleTheme}
                                className="theme-toggle"
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    padding: '4px 8px',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                            >
                                {theme === 'light' ? '🌙' : '☀️'}
                            </button>

                            <Link to="/admin" className={`admin-icon ${isActive('/admin')}`} title="Admin Dashboard">
                                ⚙️
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="content">
                {children}
            </div>

            <Footer />
        </div>
    );
}
