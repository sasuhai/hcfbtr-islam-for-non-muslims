import { Link, useLocation } from 'react-router-dom';
import { useOrganization } from '../context/OrganizationContext';
import { translations } from '../translations';
import './Footer.css';

const Icons = {
    Mail: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>,
    Phone: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
    MapPin: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
    Heart: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#ff375f' }}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>,
    Instagram: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>,
    Facebook: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
};

function Footer() {
    const currentYear = new Date().getFullYear();
    const { orgData } = useOrganization();
    const location = useLocation();
    const isBM = location.pathname.startsWith('/bm');
    const t = translations[isBM ? 'bm' : 'en'];

    const getLink = (path) => isBM ? `/bm${path}` : path;

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <div className="footer-mission-statement">
                            <h3 className="footer-title">{orgData?.shortName || 'HCFBTR'}</h3>
                            <div className="mission-divider"></div>
                            <p className="mission-text">
                                {isBM ? 'Sampaikan Islam, Perkasakan Mualaf' : 'Convey Islam, Empower the Mualaf'}
                            </p>
                            <p className="mission-cta">
                                {isBM
                                    ? 'Sertai kami dalam menyebarkan keindahan Islam dan menyokong Mualaf kami.'
                                    : 'Be part of the journey. Join us in sharing the message of Islam and supporting our Mualaf.'}
                            </p>
                            <p className="footer-description">
                                {orgData?.fullName || 'Hidayah Center Foundation @ Bandar Tun Razak'}
                            </p>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading">{isBM ? 'Navigasi' : 'Navigation'}</h4>
                        <ul className="footer-links">
                            <li><Link to={getLink('/')}>{t.nav.home}</Link></li>
                            <li><Link to={getLink('/classes-for-non-muslims')}>{t.nav.classes}</Link></li>
                            <li><Link to={getLink('/journey')}>{t.nav.journey}</Link></li>
                            <li><Link to={getLink('/news')}>{t.nav.news}</Link></li>
                            <li><Link to={getLink('/blog')}>{isBM ? 'Cerita' : 'Stories'}</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading">{isBM ? 'Terlibat' : 'Get Involved'}</h4>
                        <ul className="footer-links">
                            <li><Link to={getLink('/donate')}>{t.nav.donate}</Link></li>
                            <li><Link to={getLink('/volunteer')}>{t.nav.volunteer}</Link></li>
                            <li><Link to={getLink('/about')}>{t.nav.about}</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading">{isBM ? 'Hubungi Kami' : 'Contact Us'}</h4>
                        <ul className="footer-contact">
                            <li>
                                <span className="contact-icon"><Icons.Mail /></span>
                                <a href={`mailto:${orgData?.email}`}>{orgData?.email || 'info@hcfbtr.org'}</a>
                            </li>
                            {orgData?.phone?.map((p, i) => (
                                <li key={i}>
                                    <span className="contact-icon"><Icons.Phone /></span>
                                    <span>{p}</span>
                                </li>
                            ))}
                            {orgData?.address && (
                                <li>
                                    <span className="contact-icon" style={{ alignSelf: 'flex-start' }}><Icons.MapPin /></span>
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(orgData.address)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="address-link"
                                    >
                                        {orgData.address}
                                    </a>
                                </li>
                            )}
                            {/* Social Media Links */}
                            {(orgData?.facebook || orgData?.instagram) && (
                                <li style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem' }}>
                                    {orgData.facebook && (
                                        <a href={orgData.facebook} target="_blank" rel="noopener noreferrer" className="social-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span className="contact-icon"><Icons.Facebook /></span> Facebook
                                        </a>
                                    )}
                                    {orgData.instagram && (
                                        <a href={orgData.instagram} target="_blank" rel="noopener noreferrer" className="social-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span className="contact-icon"><Icons.Instagram /></span> Instagram
                                        </a>
                                    )}
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>Idiahus @ {currentYear} {orgData?.shortName || 'HCFBTR'}. {isBM ? 'Hak cipta terpelihara.' : 'All rights reserved.'}</p>
                    <p className="footer-tagline">{isBM ? 'Dibina dengan' : 'Built with'} <Icons.Heart /> {isBM ? 'untuk Islam kita' : 'for our Islam'}</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
