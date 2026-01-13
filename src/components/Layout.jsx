import { Link, useLocation } from 'react-router-dom';

export default function Layout({ children }) {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <div className="layout">
            <nav className="navbar">
                <div className="container navbar-content">
                    <Link to="/" style={{ fontWeight: '600', fontSize: '14px', color: '#1d1d1f' }}>
                        Hidayah Centre
                    </Link>
                    <div className="nav-links">
                        <Link to="/convert-to-islam-malaysia" className={isActive('/convert-to-islam-malaysia')}>Convert</Link>
                        <Link to="/classes-for-non-muslims" className={isActive('/classes-for-non-muslims')}>Classes</Link>
                        <Link to="/shahadah-guidance" className={isActive('/shahadah-guidance')}>Syahadah</Link>
                        <Link to="/hidayah-centre-branches" className={isActive('/hidayah-centre-branches')}>Branches</Link>
                        <div style={{ marginLeft: '12px', paddingLeft: '12px', borderLeft: '1px solid #d2d2d7', display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <span style={{ fontWeight: '600', fontSize: '12px', cursor: 'default' }}>EN</span>
                            <span style={{ color: '#86868b', fontSize: '12px', cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => alert("Bahasa Malaysia version coming soon!")}>BM</span>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="content">
                {children}
            </div>

            <footer style={{ background: '#f5f5f7', padding: '40px 0', borderTop: '1px solid #e5e5e5', marginTop: '80px', fontSize: '12px', color: '#86868b' }}>
                <div className="container">
                    <p>© {new Date().getFullYear()} Hidayah Centre Foundation. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
