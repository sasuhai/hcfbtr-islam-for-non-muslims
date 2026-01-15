import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { getDocument, getAllDocuments } from "../firebase/firestoreService";
import { useOrganization } from "../context/OrganizationContext";
import Contact from "./Contact";
import "./News.css";
import { useState, useEffect, useRef } from "react";

const getPostImage = (post) => {
    if (post.image && (post.image.startsWith('http') || post.image.startsWith('/'))) return post.image;
    const images = [
        '/images/blog-student-reading.png',
        '/images/blog-community-volunteers.png',
        '/images/blog-teacher-mentoring.png',
        '/images/blog-youth-group.png',
        '/images/blog-quran-rehal.png',
        '/images/blog-mosque-arch.png',
        '/images/blog-kampung-surau.png',
        '/images/community_gathering.png',
        '/images/students_classroom_learning.png',
        '/images/about-students.png',
        '/images/blog-featured.png',
        '/images/hero-volunteer.png'
    ];
    let hash = 0;
    const str = post.title || '';
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    const index = Math.abs(hash) % images.length;
    return images[index];
};

const extractYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

const getVideoEmbedUrl = (link) => {
    if (!link) return "";

    const ytId = extractYoutubeId(link);
    if (ytId) return `https://www.youtube.com/embed/${ytId}?autoplay=1`;

    if (link.includes('facebook.com')) {
        return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(link)}&show_text=0&autoplay=1`;
    }

    return link;
};

export default function News() {
    const { orgData } = useOrganization();
    const shortName = orgData?.shortName || "HCF BTR";
    const fullName = orgData?.fullName || "Hidayah Centre Foundation";
    const email = orgData?.email || "contact@hcfbtr.com";
    const phone = orgData?.phone?.[0] || "";
    const facebook = orgData?.facebook || "";
    const instagram = orgData?.instagram || "";
    const hqUrl = orgData?.hqUrl || "";
    const [weather, setWeather] = useState({ temp: '31', cond: 'Cloudy' });
    const [aboutHero, setAboutHero] = useState({ title: "Convey Islam, Empower Mualaf", description: "Hidayah Centre Foundation is a trusted Islamic organisation in Malaysia that provides guidance, education, and support for non-Muslims." });
    const [prayerTimes, setPrayerTimes] = useState(null);
    const [locationName, setLocationName] = useState('Kuala Lumpur');
    const [showContact, setShowContact] = useState(false);
    const [featuredBlogs, setFeaturedBlogs] = useState([]);
    const [currentBlogIdx, setCurrentBlogIdx] = useState(0);
    const [expandedImg, setExpandedImg] = useState(null);
    const [videos, setVideos] = useState([]);
    const [activeVideo, setActiveVideo] = useState(null);
    const [videoPlaying, setVideoPlaying] = useState(false);
    const [testimonials, setTestimonials] = useState([]);
    const hoverTimerRef = useRef(null);

    const startHoverTimer = (imgSrc) => {
        if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = setTimeout(() => {
            setExpandedImg(imgSrc);
        }, 1000);
    };

    const clearHoverTimer = () => {
        if (hoverTimerRef.current) {
            clearTimeout(hoverTimerRef.current);
            hoverTimerRef.current = null;
        }
    };

    useEffect(() => {
        // 1. Detect Location and Fetch Prayer Times
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(locData => {
                const { latitude, longitude, city } = locData;
                setLocationName(city || 'Kuala Lumpur');

                // Fetch Prayer Times (Method 3 = Muslim World League)
                return fetch(`https://api.aladhan.com/v1/timings?latitude=${latitude || 3.09}&longitude=${longitude || 101.71}&method=3`);
            })
            .then(res => res.json())
            .then(data => {
                setPrayerTimes(data.data.timings);
            })
            .catch(() => {
                // Fallback to KL timings if detection fails
                fetch('https://api.aladhan.com/v1/timings?latitude=3.09&longitude=101.71&method=3')
                    .then(res => res.json())
                    .then(data => setPrayerTimes(data.data.timings));
            });

        // 2. Fetch real-time weather for Bandar Tun Razak (Kuala Lumpur area)
        fetch('https://api.open-meteo.com/v1/forecast?latitude=3.09&longitude=101.71&current=temperature_2m,relative_humidity_2m,weather_code&timezone=Asia%2FKuala_Lumpur')
            .then(res => res.json())
            .then(data => {
                const temp = Math.round(data.current.temperature_2m);
                const code = data.current.weather_code;
                let cond = 'Clear';
                if (code > 0 && code <= 3) cond = 'Partly Cloudy';
                if (code >= 45 && code <= 48) cond = 'Foggy';
                if (code >= 51 && code <= 67) cond = 'Raining';
                if (code >= 71 && code <= 86) cond = 'Snowing';
                if (code >= 95) cond = 'Thunderstorm';
                setWeather({ temp, cond });
            })
            .catch(() => { /* keep defaults */ });

        loadNewsContent();
    }, []);

    const loadNewsContent = async () => {
        try {
            // 1. Load About Hero
            const aboutData = await getDocument('pages', 'about');
            if (aboutData && aboutData.hero) {
                setAboutHero(aboutData.hero);
            }

            // 2. Load Blog Articles (Featured first, then others)
            const posts = await getAllDocuments('blog-posts');
            const published = posts.filter(p => p.published !== false);

            // Sort: Featured post first
            const sorted = [...published].sort((a, b) => {
                const aFeatured = a.featured === true || (a.tags && a.tags.includes('featured'));
                const bFeatured = b.featured === true || (b.tags && b.tags.includes('featured'));

                if (aFeatured && !bFeatured) return -1;
                if (!aFeatured && bFeatured) return 1;
                return new Date(b.date) - new Date(a.date); // Then by date
            });
            setFeaturedBlogs(sorted);

            // 3. Load Videos
            const videoPosts = await getAllDocuments('blog-videos');
            const publishedVideos = videoPosts.filter(v => v.published !== false);
            const sortedVideos = publishedVideos.sort((a, b) => {
                if (a.featured && !b.featured) return -1;
                if (!a.featured && b.featured) return 1;
                return new Date(b.date) - new Date(a.date);
            });
            setVideos(sortedVideos);
            if (sortedVideos.length > 0) {
                setActiveVideo(sortedVideos[0]);
                setVideoPlaying(false);
            }

            // 4. Load Journey Testimonials
            const journeyData = await getDocument('pages', 'journey');
            if (journeyData && journeyData.testimonials) {
                setTestimonials(journeyData.testimonials);
            } else {
                // Fallback default testimonials
                setTestimonials([
                    {
                        name: 'Aminah',
                        role: 'Parent',
                        quote: 'Alhamdulillah, my child has learned so much here. Not just religious knowledge, but noble character and manners.'
                    },
                    {
                        name: 'Ahmad',
                        role: 'Alumni',
                        quote: 'I have been studying at HCFBTR since 2015. An invaluable experience with caring teachers.'
                    },
                    {
                        name: 'Sukarelawan',
                        role: 'Volunteer',
                        quote: 'Teaching here is not just about teaching, but giving and receiving. Every day is a new learning.'
                    }
                ]);
            }
        } catch (error) {
            console.error("Error loading news page content:", error);
        }
    };

    const nextBlog = () => setCurrentBlogIdx((prev) => (prev + 1) % featuredBlogs.length);
    const prevBlog = () => setCurrentBlogIdx((prev) => (prev - 1 + featuredBlogs.length) % featuredBlogs.length);

    return (
        <div className="news-page font-body antialiased selection:bg-stone-300 selection:text-stone-900">
            <Helmet>
                <title>The {shortName} Chronicle - Vintage Edition | News</title>
                <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Old+Standard+TT:wght@400;700&family=Special+Elite&display=swap" rel="stylesheet" />
            </Helmet>

            {/* Paper Container */}
            <div className="news-container bg-paper bg-stone-50">

                {/* Top Metadata Strip */}
                <div className="flex justify-between items-center px-6 py-2 border-b border-stone-800 text-xs uppercase tracking-widest font-semibold text-stone-600">
                    <div className="flex items-center gap-2">
                        <span className="iconify" data-icon={weather.cond === 'Clear' ? "lucide:sun" : "lucide:cloud-sun"} data-width="14"></span>
                        <span>{weather.cond}, {weather.temp}°C</span>
                    </div>
                    <div className="font-typewriter text-stone-900">Est. 2005</div>
                    <div className="flex items-center gap-4 text-stone-900">
                        <span>{fullName}</span>
                    </div>
                </div>

                {/* Masthead */}
                <header className="px-6 py-6 text-center border-b-4 border-double border-stone-800">
                    <h1 className="md:text-5xl lg:text-6xl leading-none uppercase text-4xl font-bold text-stone-900 tracking-tighter font-masthead mb-2">
                        The {shortName} Chronicle
                    </h1>

                    <div className="flex items-center justify-center gap-4 mt-4 py-2 border-t border-b border-stone-800 w-full max-w-4xl mx-auto">
                        <div className="flex-1 flex items-center justify-center gap-4 border-r border-stone-300">
                            {facebook && (
                                <a href={facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-stone-700 hover:text-stone-900 transition-colors">
                                    <span className="iconify" data-icon="lucide:facebook" data-width="16"></span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest leading-none">FB</span>
                                </a>
                            )}
                            {instagram && (
                                <a href={instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-stone-700 hover:text-stone-900 transition-colors">
                                    <span className="iconify" data-icon="lucide:instagram" data-width="16"></span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest leading-none">IG</span>
                                </a>
                            )}
                            {!facebook && !instagram && <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Social Connect</span>}
                        </div>
                        <div className="flex-1 text-center text-sm font-bold uppercase tracking-wide text-stone-700 leading-tight">
                            <div>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                            <div className="text-[11px] font-serif italic tracking-normal normal-case opacity-80">
                                {new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                }).format(new Date())}
                            </div>
                        </div>
                        <div className="flex-1 text-center border-l border-stone-300 text-[10px] font-bold uppercase tracking-wide text-stone-700">
                            {email} {phone ? `| ${phone}` : ''}
                        </div>
                    </div>
                </header>

                {/* Main Layout Grid */}
                <main className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 px-6 py-6">

                    {/* Left Sidebar / Column 1 */}
                    <aside className="col-span-1 lg:col-span-2 flex flex-col gap-8 vertical-separator pb-8 lg:pb-0 border-b lg:border-b-0 border-stone-300">
                        {/* Prayer Times Box */}
                        <div className="border border-stone-800 p-3 bg-stone-200/50">
                            <h4 className="font-masthead font-bold text-center border-b border-stone-400 pb-1 mb-2 text-sm uppercase">Waktu Solat</h4>
                            <p className="text-[10px] text-center mb-2 font-bold text-stone-600">{locationName}</p>
                            {prayerTimes ? (
                                <div className="space-y-1 font-typewriter text-[11px] text-stone-800">
                                    <div className="flex justify-between"><span>Subuh</span> <span>{prayerTimes.Fajr}</span></div>
                                    <div className="flex justify-between"><span>Zohor</span> <span>{prayerTimes.Dhuhr}</span></div>
                                    <div className="flex justify-between"><span>Asar</span> <span>{prayerTimes.Asr}</span></div>
                                    <div className="flex justify-between"><span>Maghrib</span> <span>{prayerTimes.Maghrib}</span></div>
                                    <div className="flex justify-between"><span>Isyak</span> <span>{prayerTimes.Isha}</span></div>
                                </div>
                            ) : (
                                <p className="text-[10px] text-center italic">Memuatkan...</p>
                            )}
                            <p className="text-[9px] text-center leading-tight mt-3 text-stone-500 italic">Source: Aladhan API (MWL Method)</p>
                        </div>

                        {/* About Us Article */}
                        <article>
                            <Link to="/about" className="hover:text-stone-600 transition-colors">
                                <h3 className="font-headline font-semibold text-xl leading-tight mb-2 tracking-tight">{aboutHero.title || "Convey Islam, Empower Mualaf"}</h3>
                            </Link>
                            <Link to="/about"
                                onMouseEnter={() => startHoverTimer("https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop")}
                                onMouseLeave={clearHoverTimer}
                            >
                                <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" className="w-full h-24 object-cover img-vintage mb-3 border border-stone-800 cursor-pointer" alt="Organization Work" />
                            </Link>
                            <div className="w-8 h-0.5 bg-stone-800 mb-3"></div>
                            <p className="text-xs leading-relaxed text-justify-newspaper text-stone-800">
                                {(() => {
                                    const plainDesc = (aboutHero.description || "Hidayah Centre Foundation is a trusted Islamic organisation in Malaysia that provides guidance, education, and support for non-Muslims.").replace(/<[^>]*>/g, '');
                                    return (
                                        <>
                                            <span className="float-left text-3xl font-masthead mr-1 leading-[0.8]">{plainDesc.charAt(0).toUpperCase()}</span>
                                            {plainDesc.substring(1)} <Link to="/about" className="font-bold underline italic hover:text-stone-600 transition-colors">more..</Link>
                                        </>
                                    );
                                })()}
                            </p>
                        </article>

                        {/* Journey Testimonials */}
                        <div className="border-t-2 border-b-2 border-stone-800 py-6 text-stone-900 relative">
                            <h4 className="font-masthead text-xs uppercase tracking-widest mb-4 text-center">Voices of the Journey</h4>

                            <div className="overflow-x-auto snap-x snap-mandatory flex gap-4 no-scrollbar pb-2">
                                {testimonials.map((t, i) => (
                                    <div key={i} className="min-w-[100%] snap-center px-1">
                                        <p className="font-headline text-lg italic leading-tight mb-3 text-justify-newspaper">
                                            "{t.quote}"
                                        </p>
                                        <div className="flex flex-col items-end">
                                            <span className="font-bold text-xs uppercase tracking-wider">— {t.name}</span>
                                            <span className="text-[10px] italic text-stone-600 font-serif">{t.role}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-center gap-1.5 mt-4">
                                {testimonials.map((_, i) => (
                                    <div key={i} className="w-1 h-1 rounded-full bg-stone-400"></div>
                                ))}
                            </div>

                            <div className="absolute top-[4.5rem] left-0 right-0 flex justify-between pointer-events-none px-1">
                                <div className="text-stone-300"><span className="iconify" data-icon="lucide:chevron-left" data-width="12"></span></div>
                                <div className="text-stone-300"><span className="iconify" data-icon="lucide:chevron-right" data-width="12"></span></div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Feature / Center Columns */}
                    <section className="col-span-1 lg:col-span-7 pb-8 lg:pb-0 border-b lg:border-b-0 border-stone-300">
                        {featuredBlogs.length > 0 ? (
                            <>
                                {/* Scroll Navigation */}
                                {featuredBlogs.length > 1 && (
                                    <div className="flex justify-between items-center mb-4 px-2 border-b border-stone-200 pb-2">
                                        <button onClick={prevBlog} className="text-stone-400 hover:text-stone-900 transition-colors flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest">
                                            <span className="iconify" data-icon="lucide:chevron-left"></span> Prev
                                        </button>
                                        <span className="text-[10px] font-masthead text-stone-500 uppercase tracking-widest">
                                            Bulletin {currentBlogIdx + 1} of {featuredBlogs.length}
                                        </span>
                                        <button onClick={nextBlog} className="text-stone-400 hover:text-stone-900 transition-colors flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest">
                                            Next <span className="iconify" data-icon="lucide:chevron-right"></span>
                                        </button>
                                    </div>
                                )}

                                {/* Main Headline */}
                                <div className="text-center mb-6">
                                    <Link to={`/blog/${featuredBlogs[currentBlogIdx].slug}`} className="hover:text-stone-600 transition-colors">
                                        <h2 className="font-headline text-3xl md:text-5xl lg:text-6xl font-semibold leading-[0.9] tracking-tight mb-3 text-stone-900 uppercase">
                                            {featuredBlogs[currentBlogIdx].title}
                                        </h2>
                                    </Link>
                                    {featuredBlogs[currentBlogIdx].subtitle && (
                                        <p className="font-headline text-xl md:text-2xl italic text-stone-600 font-light">
                                            {featuredBlogs[currentBlogIdx].subtitle}
                                        </p>
                                    )}
                                </div>

                                {/* Main Image */}
                                <figure className="mb-6 relative group">
                                    <Link to={`/blog/${featuredBlogs[currentBlogIdx].slug}`} className="block w-full aspect-video bg-stone-300 relative overflow-hidden border border-stone-800 shadow-sm"
                                        onMouseEnter={() => startHoverTimer(getPostImage(featuredBlogs[currentBlogIdx]))}
                                        onMouseLeave={clearHoverTimer}
                                    >
                                        <img
                                            src={getPostImage(featuredBlogs[currentBlogIdx])}
                                            alt={featuredBlogs[currentBlogIdx].title}
                                            className="w-full h-full object-cover img-vintage"
                                        />
                                        <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.2)] pointer-events-none"></div>
                                    </Link>
                                    <figcaption className="text-xs text-center mt-2 italic font-serif text-stone-600">
                                        By {featuredBlogs[currentBlogIdx].author} • {new Date(featuredBlogs[currentBlogIdx].date).toLocaleDateString()}
                                    </figcaption>
                                </figure>

                                {/* Article Body (2 Columns) */}
                                <div className="md:columns-2 gap-8 text-sm leading-relaxed text-stone-800 text-justify-newspaper">
                                    <div
                                        className="blog-teaser-content"
                                        dangerouslySetInnerHTML={{
                                            __html: featuredBlogs[currentBlogIdx].content.substring(0, 1000) + '...'
                                        }}
                                    />
                                    <div className="mt-4 text-center md:text-left">
                                        <Link to={`/blog/${featuredBlogs[currentBlogIdx].slug}`} className="font-bold underline italic text-stone-900 hover:text-stone-600 transition-colors">
                                            Read full chronicle..
                                        </Link>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center justify-center p-20 text-stone-400 italic font-serif text-center border-2 border-dashed border-stone-200">
                                Chronicles are being prepared for print... <br /> Please check back later.
                            </div>
                        )}

                        <div className="flex justify-center mt-8">
                            <span className="font-typewriter text-xs text-stone-500 tracking-[0.5em]">• • •</span>
                        </div>
                    </section>

                    {/* Right Sidebar / Column 3 */}
                    <aside className="col-span-1 lg:col-span-3 flex flex-col gap-6 lg:pl-8 lg:border-l border-stone-300">

                        {/* Bureau of Affairs Box */}
                        <div className="border-2 border-stone-900 p-4 relative">
                            <div className="absolute -top-3 left-4 bg-paper px-2 font-masthead font-bold text-sm uppercase text-stone-900">Bureau of Affairs</div>
                            <ul className="space-y-2 text-xs font-typewriter mt-2 text-stone-900">
                                <li className="flex justify-between border-b border-stone-300 pb-1 group">
                                    <Link to="/donate" className="vintage-link uppercase">DONATE</Link>
                                    <Link to="/donate" className="font-bold text-stone-800 hover:text-blue-600"><span className="iconify" data-icon="lucide:heart" data-width="14"></span></Link>
                                </li>
                                <li className="flex justify-between border-b border-stone-300 pb-1 group">
                                    <Link to="/volunteer" className="vintage-link uppercase">VOLUNTEER</Link>
                                    <Link to="/volunteer" className="font-bold text-stone-800 hover:text-blue-600"><span className="iconify" data-icon="lucide:users" data-width="14"></span></Link>
                                </li>
                                <li className="flex justify-between border-b border-stone-300 pb-1 group">
                                    <a href={hqUrl || "#"} target="_blank" rel="noopener noreferrer" className="vintage-link uppercase">HCF HEADQUARTER</a>
                                    <a href={hqUrl || "#"} target="_blank" rel="noopener noreferrer" className="font-bold text-stone-800 hover:text-blue-600"><span className="iconify" data-icon="lucide:globe" data-width="14"></span></a>
                                </li>
                                <li className="flex justify-between group">
                                    <button onClick={() => setShowContact(true)} className="vintage-link uppercase text-left">CONTACT BUREAU</button>
                                    <button onClick={() => setShowContact(true)} className="font-bold text-stone-800 hover:text-blue-600"><span className="iconify" data-icon="lucide:phone-call" data-width="14"></span></button>
                                </li>
                            </ul>
                        </div>

                        {/* Homepage Feature Article */}
                        <article>
                            <h3 className="font-headline font-semibold text-2xl leading-tight mb-3 text-stone-900">Learn About Islam for non-Muslims</h3>
                            <Link to="/">
                                <img src="https://images.unsplash.com/photo-1564121211835-e88c852648ab?q=80&w=2940&auto=format&fit=crop" className="w-full h-32 object-cover img-vintage mb-3 border border-stone-800 hover:grayscale-0 transition-all duration-700 cursor-pointer" alt="Islamic Architecture" />
                            </Link>
                            <p className="text-xs leading-relaxed text-justify-newspaper text-stone-800">
                                {shortName} is a trusted Islamic organisation in Malaysia that provides guidance, education, and support for non-Muslims who wish to learn about Islam or revert to Islam. <Link to="/" className="font-bold underline italic hover:text-stone-600 transition-colors">more..</Link>
                            </p>
                        </article>

                        {/* Cinematic Chronicles Section */}
                        <div className="bg-stone-200/30 p-4 border border-stone-800">
                            <h4 className="font-masthead font-bold text-center text-sm mb-3 uppercase tracking-wider text-stone-900 border-b border-stone-400 pb-2">The Cinematic Chronicles</h4>

                            {activeVideo ? (
                                <div className="space-y-4">
                                    {/* Featured Video Container */}
                                    <div className="border border-stone-800 bg-stone-900 aspect-video relative group overflow-hidden">
                                        {(() => {
                                            const ytId = extractYoutubeId(activeVideo.link);
                                            const isYoutube = !!ytId;
                                            const thumbSrc = activeVideo.thumbnail || (ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : '');

                                            if (videoPlaying) {
                                                const embedUrl = getVideoEmbedUrl(activeVideo.link);
                                                const isExternal = !!ytId || activeVideo.link.includes('facebook.com');

                                                if (isExternal) {
                                                    return (
                                                        <iframe
                                                            key={activeVideo.id}
                                                            src={embedUrl}
                                                            className="absolute inset-0 w-full h-full"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                            allowFullScreen
                                                            title={activeVideo.title}
                                                        ></iframe>
                                                    );
                                                }
                                                return (
                                                    <video
                                                        key={activeVideo.id}
                                                        src={activeVideo.link}
                                                        controls
                                                        autoPlay
                                                        className="absolute inset-0 w-full h-full z-0"
                                                        poster={thumbSrc}
                                                    >
                                                        Your browser does not support the video tag.
                                                    </video>
                                                );
                                            }

                                            return (
                                                <div
                                                    className="absolute inset-0 z-10 cursor-pointer"
                                                    onClick={() => setVideoPlaying(true)}
                                                >
                                                    {thumbSrc ? (
                                                        <img
                                                            src={thumbSrc}
                                                            alt=""
                                                            className="w-full h-full object-cover img-vintage"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-stone-300 text-stone-600">
                                                            <span className="iconify" data-icon="lucide:video" data-width="32"></span>
                                                        </div>
                                                    )}

                                                    {/* Play Button Overlay */}
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-transparent transition-all">
                                                        <div className="w-14 h-14 bg-paper/90 border-2 border-stone-800 rounded-full flex items-center justify-center text-stone-900 shadow-xl group-hover:scale-110 transition-transform">
                                                            <span className="iconify" data-icon={isYoutube ? "lucide:external-link" : "lucide:play"} data-width="28" style={!isYoutube ? { marginLeft: '4px' } : {}}></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })()}
                                    </div>

                                    <div>
                                        <h5 className="font-headline font-bold text-base leading-tight text-stone-900">{activeVideo.title}</h5>
                                        <p className="text-[10px] text-stone-500 font-typewriter mt-1 uppercase">Recorded: {activeVideo.date}</p>
                                        <p className="text-[11px] leading-relaxed text-stone-800 mt-2 line-clamp-3 italic">
                                            {activeVideo.description}
                                        </p>
                                    </div>

                                    {/* Video Library List */}
                                    <div className="border-t border-stone-400 pt-3 mt-4">
                                        <p className="text-[9px] font-bold uppercase tracking-widest text-stone-500 mb-3">Archive Reels</p>
                                        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                            {videos.filter(v => v.id !== activeVideo.id).map(video => (
                                                <button
                                                    key={video.id}
                                                    onClick={() => {
                                                        setActiveVideo(video);
                                                        setVideoPlaying(false); // Reset to poster view when switching
                                                    }}
                                                    className="w-full flex gap-3 text-left group transition-all p-1 rounded hover:bg-stone-200/50"
                                                >
                                                    <div className="w-16 h-10 flex-shrink-0 bg-stone-200 border border-stone-800 overflow-hidden">
                                                        {(() => {
                                                            const ytId = extractYoutubeId(video.link);
                                                            const thumbSrc = video.thumbnail || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : '');
                                                            return thumbSrc ? (
                                                                <img
                                                                    src={thumbSrc}
                                                                    alt=""
                                                                    className="w-full h-full object-cover img-vintage"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center bg-stone-300 text-stone-600">
                                                                    <span className="iconify" data-icon="lucide:video" data-width="14"></span>
                                                                </div>
                                                            );
                                                        })()}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-[10px] font-bold leading-tight truncate text-stone-700">
                                                            {video.title}
                                                        </p>
                                                        <p className="text-[9px] font-typewriter text-stone-500">{video.date}</p>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-[10px] text-center italic py-10 text-stone-500 font-serif">Film chronicles arriving soon...</p>
                            )}
                        </div>

                    </aside>
                </main>

                {/* Footer / Page Bottom */}
                <footer className="border-t-4 border-double border-stone-900 mt-2 mx-6 py-4 flex justify-between items-end mb-6">
                    <div className="text-[10px] uppercase font-bold tracking-widest text-stone-500">
                        Printed by {shortName}
                    </div>
                    <div className="text-center text-stone-900">
                        <p className="font-headline italic text-lg">"Sampaikan Islam, Perkasakan Mualaf"</p>
                    </div>
                    <div className="text-[10px] uppercase font-bold tracking-widest text-stone-500">
                        Page 1
                    </div>
                </footer>

            </div>

            {/* Contact Overlay */}
            {showContact && <Contact isModal={true} onClose={() => setShowContact(false)} />}
            {/* Background texture note (visual flair outside the paper) */}
            <div className="fixed bottom-4 right-4 text-stone-500 text-xs font-typewriter opacity-50 hidden lg:block">
                Viewing: Archive #4922A
            </div>


        </div>
    );
}
