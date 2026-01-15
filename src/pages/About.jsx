import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getDocument } from '../firebase/firestoreService';
import { useOrganization } from '../context/OrganizationContext';
import './About.css';

// Simple Icons
const Icons = {
    Heart: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
    ),
    Hand: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" /><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" /><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" /><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" /></svg>
    ),
    Book: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
    ),
    Users: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
    ),
    Star: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
    ),
    Leaf: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>
    )
};

function About() {
    const { orgData } = useOrganization();
    const [pageContent, setPageContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Comprehensive Facebook error suppression
    useEffect(() => {
        const originalError = console.error;
        const originalWarn = console.warn;

        // Facebook-specific error patterns and file signatures
        const fbFileSignatures = [
            'aZUh82_UR0Y.js',
            'x3IU3bl1BvF.js',
            'zdNi2lPgAb0.js',
            'hh5Up06oxz4.js',
            'Xogr7p60AX5.js'
        ];

        const fbErrorPatterns = [
            'ErrorUtils',
            'DataStore.get',
            'Could not find element',
            'Permissions policy violation',
            'facebook.com',
            'fb.com',
            'connect.facebook.net',
            'unload is not allowed'
        ];

        const shouldSuppressError = (...args) => {
            const message = args.join(' ');

            // Check message patterns
            const hasPattern = fbErrorPatterns.some(pattern =>
                message.toLowerCase().includes(pattern.toLowerCase())
            );

            // Get stack trace to check file origins
            const stack = new Error().stack || '';
            const hasFbFile = fbFileSignatures.some(file => stack.includes(file));

            return hasPattern || hasFbFile;
        };

        // Override console methods
        console.error = (...args) => {
            if (!shouldSuppressError(...args)) {
                originalError.apply(console, args);
            }
        };

        console.warn = (...args) => {
            if (!shouldSuppressError(...args)) {
                originalWarn.apply(console, args);
            }
        };

        // Global error event handler for uncaught errors
        const handleError = (event) => {
            if (event.filename && fbFileSignatures.some(sig => event.filename.includes(sig))) {
                event.preventDefault();
                event.stopPropagation();
                return true;
            }
        };

        // Global unhandledrejection handler
        const handleRejection = (event) => {
            const reason = event.reason?.stack || event.reason?.message || String(event.reason);
            if (fbFileSignatures.some(sig => reason.includes(sig)) ||
                fbErrorPatterns.some(pattern => reason.toLowerCase().includes(pattern.toLowerCase()))) {
                event.preventDefault();
                event.stopPropagation();
            }
        };

        window.addEventListener('error', handleError, true);
        window.addEventListener('unhandledrejection', handleRejection, true);

        // Cleanup
        return () => {
            console.error = originalError;
            console.warn = originalWarn;
            window.removeEventListener('error', handleError, true);
            window.removeEventListener('unhandledrejection', handleRejection, true);
        };
    }, []);

    useEffect(() => {
        loadPageContent();
    }, []);

    const loadPageContent = async () => {
        try {
            const content = await getDocument('pages', 'about');
            if (content) {
                setPageContent(content);
            } else {
                // Fallback to default content if not in Firestore
                setPageContent(getDefaultContent());
            }
        } catch (err) {
            console.error('Error loading home page content:', err);
            setError(err.message);
            setPageContent(getDefaultContent());
        } finally {
            setLoading(false);
        }
    };

    const getDefaultContent = () => ({
        hero: {
            title: "",
            subtitle: "",
            description: ""
        },
        impactStats: [
            { number: '20+', label: 'Tahun Perkhidmatan', sublabel: 'Years of Service' },
            { number: '1000+', label: 'Mualaf Dibimbing', sublabel: 'Students Guided' },
            { number: '500+', label: 'Sukarelawan Aktif', sublabel: 'Active Volunteers' },
            { number: '15+', label: 'Program & Kelas', sublabel: 'Programs & Classes' }
        ],
        about: {
            title: "",
            subtitle: "",
            paragraph1: "",
            paragraph2: ""
        },
        features: [],
        whyChooseUs: {
            title: "",
            subtitle: "",
            description: ""
        },
        cta: {
            title: "",
            subtitle: "",
            description: ""
        }
    });

    // Loading check
    if (loading) return <div className="loading-spinner">Loading...</div>;

    if (error && !pageContent) {
        return (
            <div className="about-page">
                <div className="error-state">
                    <p>Error loading content: {error}</p>
                    <p>Using default content...</p>
                </div>
            </div>
        );
    }

    // Use content from Firestore or fall back to default
    const defaultContent = getDefaultContent(); // Get default content once
    const hero = pageContent?.hero || defaultContent.hero;
    const impactStats = pageContent?.impactStats || defaultContent.impactStats;
    const about = pageContent?.about || defaultContent.about;
    const features = pageContent?.features || defaultContent.features;
    const whyChooseUs = pageContent?.whyChooseUs || defaultContent.whyChooseUs; // Added this line
    const cta = pageContent?.cta || defaultContent.cta;

    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-overlay"></div>
                <div className="container hero-content">
                    <h1 className="hero-title">
                        <span>{hero.title.split(' ').slice(0, -2).join(' ')}</span>
                        <span className="text-gradient">{hero.title.split(' ').slice(-2).join(' ')}</span>
                    </h1>
                    <p className="hero-subtitle">{hero.subtitle}</p>
                    <p className="hero-description" style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: hero.description }}></p>
                    <div className="hero-cta">
                        <Link to="/donate" className="btn btn-primary btn-lg shine-effect">
                            <span className="btn-icon"><Icons.Heart /></span> Donate Now
                        </Link>
                        <Link to="/volunteer" className="btn btn-outline btn-lg hero-btn-outline">
                            <span className="btn-icon"><Icons.Hand /></span> Volunteer With Us
                        </Link>
                        <Link to="/" className="btn btn-outline btn-lg hero-btn-outline">
                            <span className="btn-icon"><Icons.Book /></span> Islam for Non-Muslims
                        </Link>
                    </div>
                </div>
                <div className="hero-wave">
                    <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
            </section >

            {/* Official Registration Widgets */}
            <section className="py-12 bg-stone-50 dark:bg-stone-900/50 border-b border-stone-100 dark:border-stone-800">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-3 gap-4 md:gap-8">
                        {/* Widget 1 */}
                        <div className="group relative bg-[var(--bg-card)] p-4 md:p-8 rounded-2xl shadow-2xl hover:shadow-sm transition-all duration-500 transform -translate-y-2 hover:translate-y-0 border border-[var(--border-light)] overflow-hidden">
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-100 dark:bg-blue-900/20 rounded-full opacity-50 blur-2xl group-hover:bg-blue-50 dark:group-hover:bg-blue-900/10 transition-colors"></div>
                            <div className="relative z-10">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-4 md:mb-6 scale-110 group-hover:scale-100 transition-transform duration-500">
                                    <span className="iconify text-xl md:text-2xl" data-icon="lucide:building-2"></span>
                                </div>
                                <h3 className="text-sm md:text-lg font-semibold text-stone-900 dark:text-white mb-2 md:mb-3">Identiti Korporat</h3>
                                <p className="text-stone-600 dark:text-stone-400 text-xs md:text-sm leading-relaxed">
                                    HCF BTR adalah cawangan institusi <strong>The Trustees of Hidayah Centre Foundation Registered</strong>.
                                </p>
                            </div>
                        </div>

                        {/* Widget 2 */}
                        <div className="group relative bg-[var(--bg-card)] p-4 md:p-8 rounded-2xl shadow-2xl hover:shadow-sm transition-all duration-500 transform -translate-y-2 hover:translate-y-0 border border-[var(--border-light)] overflow-hidden">
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-amber-100 dark:bg-amber-900/20 rounded-full opacity-50 blur-2xl group-hover:bg-amber-50 dark:group-hover:bg-amber-900/10 transition-colors"></div>
                            <div className="relative z-10">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center mb-4 md:mb-6 scale-110 group-hover:scale-100 transition-transform duration-500">
                                    <span className="iconify text-xl md:text-2xl" data-icon="lucide:landmark"></span>
                                </div>
                                <h3 className="text-sm md:text-lg font-semibold text-stone-900 dark:text-white mb-2 md:mb-3">Pendaftaran Sah</h3>
                                <p className="text-stone-600 dark:text-stone-400 text-xs md:text-sm leading-relaxed">
                                    Diperbadankan di bawah Bahagian Hal Ehwal Undang-undang (BHEUU), <strong>Jabatan Perdana Menteri (JPM)</strong>.
                                </p>
                            </div>
                        </div>

                        {/* Widget 3 */}
                        <div className="group relative bg-[var(--bg-card)] p-4 md:p-8 rounded-2xl shadow-2xl hover:shadow-sm transition-all duration-500 transform -translate-y-2 hover:translate-y-0 border border-[var(--border-light)] overflow-hidden">
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-emerald-100 dark:bg-emerald-900/20 rounded-full opacity-50 blur-2xl group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/10 transition-colors"></div>
                            <div className="relative z-10">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-4 md:mb-6 scale-110 group-hover:scale-100 transition-transform duration-500">
                                    <span className="iconify text-xl md:text-2xl" data-icon="lucide:file-check"></span>
                                </div>
                                <h3 className="text-sm md:text-lg font-semibold text-stone-900 dark:text-white mb-2 md:mb-3">No. Pendaftaran</h3>
                                <p className="text-lg md:text-3xl font-bold text-stone-900 dark:text-white tracking-tight">
                                    PPAB-14/2012
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Stats */}
            < section className="impact-section section" >
                <div className="max-w-7xl mx-auto px-6">
                    <div className="impact-grid">
                        {impactStats.map((stat, index) => (
                            <div key={index} className="impact-card">
                                <div className="impact-number">{stat.number}</div>
                                <div className="impact-label">{stat.label}</div>
                                <div className="impact-sublabel">{stat.sublabel}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section >

            {/* About Section */}
            < section className="about-section section" >
                <div className="container">
                    <div className="about-content">
                        <div className="about-text">
                            <h2 className="section-title">Tentang {orgData?.shortName || 'HCFBTR'}</h2>
                            <p className="section-subtitle">{about.subtitle}</p>
                            <p style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: about.paragraph1 }}></p>
                            <p style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: about.paragraph2 }}></p>
                            <Link to="/journey" className="btn btn-secondary mt-lg">
                                Baca Perjalanan Kami <span>→</span>
                            </Link>
                        </div>
                        <div className="about-image h-full">
                            <div className="grid grid-cols-2 gap-4 h-full min-h-[500px]">
                                {/* Large Left Image */}
                                <div className="row-span-2 relative rounded-2xl overflow-hidden shadow-lg group">
                                    <img
                                        src="/hcf_community.png"
                                        alt="Community Service"
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                                {/* Top Right Image */}
                                <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                                    <img
                                        src="/hcf_center.png"
                                        alt="HCF Centre"
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                                {/* Bottom Right Image */}
                                <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                                    <img
                                        src="/kbm_class.png"
                                        alt="Classes"
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* Social Feed Section (Facebook) */}

            <section className="social-section section bg-stone-50 dark:bg-stone-950">
                <div className="container">
                    <div className="section-header text-center mb-2xl">
                        <span className="badge-pill mb-sm bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">Sosial Media</span>
                        <h2 className="section-title text-stone-900 dark:text-white">Ikuti Perkembangan Kami</h2>
                        <p className="section-subtitle text-stone-500 dark:text-stone-400">Latest Updates @ HCF.btr</p>
                    </div>

                    <div className="social-feed-wrapper">
                        {/* Facebook Page Plugin Iframe (Reliable Method) */}
                        <div className="fb-feed-container card bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800" style={{ padding: '0', overflow: 'hidden', minHeight: '300px', height: '600px', position: 'relative', width: '500px', margin: '0 auto' }}>
                            <iframe
                                key="fb-feed-adapt-test"
                                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FHCF.btr&tabs=timeline&width=500&height=600&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false"
                                width="100%"
                                height="600"
                                style={{ border: 'none', overflow: 'hidden' }}
                                scrolling="no"
                                frameBorder="0"
                                allowFullScreen={true}
                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                title="HCF BTR Facebook Feed"
                            ></iframe>
                        </div>

                        {/* Side Panel: Connect & info */}
                        <div className="social-side-panel">
                            {/* Connect Card */}
                            <div className="social-connect-card">
                                <div className="connect-content">
                                    <div className="fb-logo-container dark:bg-blue-900 dark:text-blue-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                    </div>
                                    <h3 className="text-stone-900 dark:text-white">HCF BTR</h3>
                                    <p className="connect-subtitle text-stone-500 dark:text-stone-400">Komuniti Sokongan Mualaf & Asnaf</p>
                                    <div className="fb-stats">
                                        <div className="stat-item"><strong>Official</strong> Page</div>
                                        <div className="stat-separator">•</div>
                                        <div className="stat-item"><strong>Live</strong> Updates</div>
                                    </div>
                                    <a href="https://www.facebook.com/HCF.btr" target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full mt-md">
                                        Visit Page
                                    </a>
                                </div>
                            </div>

                            {/* Info Card - Stay Updated */}
                            <div className="social-info-card mt-lg bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/30">

                                <h4 className="text-emerald-900 dark:text-emerald-300">Stay Updated</h4>
                                <p className="text-emerald-800 dark:text-emerald-400">
                                    Follow our page to get notifications about upcoming events, donation drives, and community stories.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* Features Section */}
            < section className="features-section section bg-stone-100 dark:bg-black" >
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title">{whyChooseUs.title}</h2>
                        <p className="section-subtitle">{whyChooseUs.subtitle}</p>
                        <p className="section-description" style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: whyChooseUs.description }}></p>
                    </div>
                    <div className="features-grid grid grid-2">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card card">
                                <div className="feature-icon">{feature.icon}</div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-subtitle">{feature.subtitle}</p>
                                <p className="feature-description">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section >

            {/* CTA Section */}
            < section className="cta-section section" >
                <div className="container">
                    <div className="cta-card">
                        <div className="cta-content">
                            <h2 className="cta-title">{cta.title}</h2>
                            <p className="cta-subtitle">{cta.subtitle}</p>
                            <p className="cta-description" style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: cta.description }}></p>
                            <div className="cta-buttons">
                                <Link to="/volunteer" className="btn btn-secondary btn-lg">
                                    Support & Volunteer
                                </Link>
                                <Link to="/news" className="btn btn-outline btn-lg" style={{ borderColor: 'white', color: 'white' }}>
                                    News & Stories
                                </Link>
                                <Link to="/classes-for-non-muslims" className="btn btn-outline btn-lg" style={{ borderColor: 'white', color: 'white' }}>
                                    Explore Classes
                                </Link>
                                <Link to="/" className="btn btn-outline btn-lg" style={{ borderColor: 'white', color: 'white' }}>
                                    Islam for Non-Muslims
                                </Link>
                                <Link to="/donate" className="btn btn-primary btn-lg">
                                    Donate Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    );
}

export default About;
