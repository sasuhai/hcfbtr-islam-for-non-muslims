import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Footer from './Footer';
import { useOrganization } from '../context/OrganizationContext';
import { useTheme } from '../context/ThemeContext';
import { translations } from '../translations';

export default function Layout({ children }) {
    const { orgData } = useOrganization();
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Close menu when location changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    // Determine current language from path
    const isBM = location.pathname.startsWith('/bm');
    const lang = isBM ? 'bm' : 'en';
    const t = translations[lang];

    const isActive = (path) => {
        const fullPath = isBM ? `/bm${path}` : path;
        return (location.pathname === fullPath || (path === '/' && location.pathname === '/')) ? 'active' : '';
    };

    const getLink = (path) => {
        return isBM ? `/bm${path}` : path;
    };

    const toggleLanguage = () => {
        if (isBM) {
            navigate(location.pathname.replace('/bm', '') || '/');
        } else {
            navigate(`/bm${location.pathname === '/' ? '' : location.pathname}`);
        }
    };

    return (
        <div className="layout">
            <nav className="navbar">
                <div className="container navbar-content">
                    <Link to={getLink('/')} className="navbar-logo">
                        <span className="logo-short">{orgData.shortName || 'HCFBTR'}</span>
                        <span className="logo-full">{orgData.fullName || 'Hidayah Centre Foundation'}</span>
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="mobile-menu-toggle"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? '✕' : '☰'}
                    </button>

                    <div className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
                        <Link to={getLink('/classes-for-non-muslims')} className={isActive('/classes-for-non-muslims')}>{t.nav.classes}</Link>
                        <Link to={getLink('/convert-to-islam-malaysia')} className={isActive('/convert-to-islam-malaysia')}>{t.nav.revert}</Link>
                        <Link to={getLink('/news')} className={isActive('/news')}>{t.nav.news}</Link>
                        <Link to={getLink('/journey')} className={isActive('/journey')}>{t.nav.journey}</Link>
                        <Link to={getLink('/volunteer')} className={isActive('/volunteer')}>{t.nav.volunteer}</Link>
                        <Link to={getLink('/donate')} className={isActive('/donate')}>{t.nav.donate}</Link>
                        <Link to={getLink('/about')} className={isActive('/about')}>{t.nav.about}</Link>

                        {/* Mobile Only Extras */}
                        <div className="mobile-only-extras">
                            <button onClick={toggleLanguage} className="mobile-extra-btn">
                                <span className="iconify" data-icon="lucide:languages"></span>
                                {isBM ? 'English' : 'Bahasa Melayu'}
                            </button>
                            <button onClick={toggleTheme} className="mobile-extra-btn">
                                <span className="iconify" data-icon={theme === 'dark' ? 'lucide:sun' : 'lucide:moon'}></span>
                                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                            </button>
                            <Link to="/admin" className="mobile-extra-btn">
                                <span className="iconify" data-icon="lucide:settings"></span>
                                Admin
                            </Link>
                        </div>
                    </div>

                    {/* Desktop Extras */}
                    <div className="desktop-nav-extras">
                        <button onClick={toggleLanguage} className="lang-toggle" title="Switch Language">
                            {isBM ? 'EN' : 'BM'}
                        </button>
                        <button onClick={toggleTheme} className="theme-toggle" title="Toggle Theme">
                            <span className="iconify" data-icon={theme === 'dark' ? 'lucide:sun' : 'lucide:moon'}></span>
                        </button>
                        <Link to="/admin" className={`admin-icon ${isActive('/admin')}`} title="Admin Dashboard">
                            <span className="iconify" data-icon="lucide:settings"></span>
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="content">
                {children}
            </main>

            <Footer />
        </div>
    );
}
