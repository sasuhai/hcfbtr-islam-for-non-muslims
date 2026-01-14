import { Link, useLocation } from 'react-router-dom';
import Footer from './Footer';

export default function Layout({ children }) {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <div className="layout">
            <nav className="navbar">
                <div className="container navbar-content">
                    <Link to="/" style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2', textDecoration: 'none' }}>
                        <span style={{ fontWeight: '700', fontSize: '14px', color: '#1d1d1f' }}>HCFBTR</span>
                        <span style={{ fontWeight: '600', fontSize: '12px', color: '#1d1d1f' }}>Hidayah Centre Foundation</span>
                        <span style={{ fontWeight: '400', fontSize: '11px', color: '#86868b' }}>Bandar Tun Razak, KL</span>
                    </Link>
                    <div className="nav-links">
                        <Link to="/classes-for-non-muslims" className={isActive('/classes-for-non-muslims')}>Classes</Link>
                        <Link to="/convert-to-islam-malaysia" className={isActive('/convert-to-islam-malaysia')}>Revert</Link>

                        <Link to="/blog" className={isActive('/blog')}>News</Link>
                        <Link to="/journey" className={isActive('/journey')}>Journey</Link>
                        <Link to="/volunteer" className={isActive('/volunteer')}>Volunteer</Link>
                        <Link to="/donate" className={isActive('/donate')}>Donate</Link>
                        <Link to="/about" className={isActive('/about')}>About</Link>
                        <Link to="/admin" className={`admin-icon ${isActive('/admin')}`} title="Admin Dashboard">
                            ⚙️
                        </Link>
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
