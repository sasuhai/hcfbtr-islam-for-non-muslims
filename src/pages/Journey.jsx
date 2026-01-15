import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getDocument, getAllDocuments } from '../firebase/firestoreService';
import { useOrganization } from '../context/OrganizationContext';
import './Journey.css';

const Icons = {
    Seed: () => <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 10a6 6 0 0 0-6-6c-2 2-2 5 0 7l9 9 9-9c2-2 2-5 0-7a6 6 0 0 0-6 6z" /><path d="M12 22s0-9-5-14" /></svg>,
    Book: () => <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>,
    Building: () => <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M8 10h.01" /><path d="M16 10h.01" /><path d="M8 14h.01" /><path d="M16 14h.01" /></svg>,
    Muscle: () => <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>,
    Rocket: () => <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>,
    Party: () => <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72z" /><path d="m11 13 2 2" /><path d="m20 3-3 3" /></svg>,
    User: () => <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    GradCap: () => <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>,
    Group: () => <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    Trophy: () => <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 21h8" /><path d="M12 17v4" /><path d="M7 4h10" /><path d="M17 4v8a5 5 0 0 1-10 0V4" /><line x1="12" y1="4" x2="12" y2="2" /></svg>,
    Target: () => <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
    Globe: () => <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>,
    Heart: () => <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>,
    ArrowLeft: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>,
    ArrowRight: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
};

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

function Journey() {
    const [pageContent, setPageContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { orgData } = useOrganization();

    // Blog Integration States
    const [blogPosts, setBlogPosts] = useState([]);
    const [blogVideos, setBlogVideos] = useState([]);
    const [selectedTag, setSelectedTag] = useState('semua');
    const [activeVideo, setActiveVideo] = useState(null);
    const [videoPlaying, setVideoPlaying] = useState(false);
    const [blogError, setBlogError] = useState(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const amount = 340; // Card width + margin approx
            scrollRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await Promise.all([
                loadPageContent(),
                loadBlogPosts(),
                loadBlogVideos()
            ]);
            setLoading(false);
        };
        fetchData();
    }, []);

    const loadPageContent = async () => {
        try {
            const content = await getDocument('pages', 'journey');
            setPageContent(content || getDefaultContent());
        } catch (err) {
            console.error('Error loading journey page:', err);
            setPageContent(getDefaultContent());
        }
    };

    const loadBlogPosts = async () => {
        try {
            const posts = await getAllDocuments('blog-posts');
            const publishedPosts = posts.filter(post => post.published === true);
            const sortedPosts = publishedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
            setBlogPosts(sortedPosts);
            setBlogError(null);
        } catch (err) {
            console.error('Error loading blog posts:', err);
            setBlogError('Gagal memuatkan artikel.');
        }
    };

    const loadBlogVideos = async () => {
        try {
            const videos = await getAllDocuments('blog-videos');
            const publishedVideos = videos
                .filter(v => v.published === true)
                .sort((a, b) => (b.date?.seconds || 0) - (a.date?.seconds || 0));
            setBlogVideos(publishedVideos);
            if (publishedVideos.length > 0) {
                const featured = publishedVideos.find(v => v.featured);
                setActiveVideo(featured || publishedVideos[0]);
            }
        } catch (err) {
            console.error('Error loading blog videos:', err);
        }
    };

    const getDefaultContent = () => ({
        header: {
            title: "Sedekad & Terus Melangkah",
            subtitle: "A Decade & Moving Forward",
            intro: "Perjalanan kami bukanlah mudah, tetapi setiap langkah penuh dengan pelajaran, keberkatan, dan keazaman untuk terus memberi. Ini adalah kisah kami."
        },
        timeline: [
            {
                year: '2014',
                title: 'Permulaan Yang Sederhana',
                subtitle: 'Humble Beginnings',
                description: 'HCFBTR bermula dengan sebuah kelas kecil Al-Quran di rumah, hanya 8 pelajar. Dengan satu misi: memberikan pendidikan agama yang berkualiti kepada komuniti.',
                icon: <Icons.Seed />
            },
            {
                year: '2016',
                title: 'Perluasan Program',
                subtitle: 'Program Expansion',
                description: 'Menambah kelas Bahasa Arab dan Fardhu Ain. Bilangan pelajar berkembang menjadi 50+ dengan bantuan 5 guru sukarelawan yang berdedikasi.',
                icon: <Icons.Book />
            },
            {
                year: '2018',
                title: 'Ruang Sendiri',
                subtitle: 'Own Space',
                description: 'Menyewa premis khas untuk kelas. Impian untuk memiliki tempat pembelajaran yang selesa akhirnya tercapai. Pelajar meningkat kepada 150+.',
                icon: <Icons.Building />
            },
            {
                year: '2020',
                title: 'Menghadapi Cabaran',
                subtitle: 'Facing Challenges',
                description: 'Pandemik COVID-19 menguji ketahanan kami. Beralih kepada pembelajaran dalam talian, memastikan tiada pelajar ketinggalan.',
                icon: <Icons.Muscle />
            },
            {
                year: '2022',
                title: 'Bangkit Semula',
                subtitle: 'Rising Again',
                description: 'Kembali dengan lebih kuat. Memperkenalkan program Tahfiz dan bimbingan akademik. Lebih 300 pelajar aktif dan 30+ sukarelawan.',
                icon: <Icons.Rocket />
            },
            {
                year: '2024',
                title: 'Sedekad Perkhidmatan',
                subtitle: 'A Decade of Service',
                description: 'Meraikan 10 tahun perkhidmatan. Lebih 500 pelajar telah didik. Komitmen kami lebih kuat untuk terus melangkah ke hadapan.',
                icon: <Icons.Party />
            }
        ],
        testimonials: [
            {
                name: 'Aminah binti Abdullah',
                role: 'Ibu bapa pelajar | Parent',
                quote: 'Alhamdulillah, anak saya belajar banyak di sini. Bukan sahaja ilmu agama, malah akhlak dan adab yang mulia. Terima kasih HCFBTR!',
                image: <Icons.User />
            },
            {
                name: 'Ahmad bin Hassan',
                role: 'Bekas pelajar | Alumni',
                quote: 'Saya belajar di HCFBTR sejak 2015. Pengalaman yang tidak ternilai. Guru-guru yang prihatin dan suasana pembelajaran yang menyeronokkan.',
                image: <Icons.User />
            },
            {
                name: 'Sukarelawan | Volunteer',
                role: 'Guru sukarelawan sejak 2017',
                quote: 'Mengajar di sini bukan sekadar mengajar, tetapi memberi dan menerima. Setiap hari adalah pembelajaran baru dan penuh keberkatan.',
                image: <Icons.User />
            }
        ],
        milestones: [
            { icon: <Icons.GradCap />, number: '500+', label: 'Pelajar Didik | Students Taught' },
            { icon: <Icons.Group />, number: '50+', label: 'Sukarelawan | Volunteers' },
            { icon: <Icons.Book />, number: '15+', label: 'Program Aktif | Active Programs' },
            { icon: <Icons.Trophy />, number: '10', label: 'Tahun Perkhidmatan | Years Serving' }
        ],
        forward: {
            title: "Terus Melangkah",
            subtitle: "Moving Forward",
            description: "10 tahun adalah permulaan. Kami berkomitmen untuk terus berkembang, meningkatkan kualiti pengajaran, dan memberi impak yang lebih besar kepada komuniti. Dengan sokongan anda, kami yakin masa depan akan lebih cerah.",
            vision: [
                {
                    icon: <Icons.Target />,
                    title: 'Visi 2030',
                    description: '1000+ pelajar, 20+ program, premis sendiri'
                },
                {
                    icon: <Icons.Globe />,
                    title: 'Impak Komuniti',
                    description: 'Menjadi pusat pembelajaran terkemuka'
                },
                {
                    icon: <Icons.Heart />,
                    title: 'Kerjasama',
                    description: 'Jalin hubungan dengan lebih banyak NGO'
                }
            ]
        }
    });

    if (loading) {
        return (
            <div className="journey-page">
                <div className="loading-state">
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    const { header, timeline, testimonials, milestones, forward } = pageContent;



    const nextTestimonial = () => {
        if (currentIndex < testimonials.length - 3) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const prevTestimonial = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3);

    const allTags = ['semua', ...new Set(blogPosts.flatMap(post => post.tags || []))].sort();
    const featuredPost = blogPosts.find(post => post.featured);
    const filteredPosts = (selectedTag === 'semua'
        ? blogPosts
        : blogPosts.filter(post => post.tags && post.tags.includes(selectedTag))
    ).filter(post => post.id !== featuredPost?.id);

    return (
        <div className="journey-page">
            {/* Header */}
            <section className="journey-header">
                <div className="container">
                    <div className="journey-header-content text-center">
                        <h1 className="page-title animate-fade-in">{header.title}</h1>
                        <p className="page-subtitle">{header.subtitle}</p>
                        <p className="journey-intro" style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: header.intro }}></p>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="timeline-section section">
                <div className="container">
                    <h2 className="section-title text-center mb-2xl">Perjalanan Kami | Our Journey</h2>
                    <div className="timeline">
                        {timeline.map((item, index) => (
                            <div
                                key={index}
                                className={`timeline-item ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}
                            >
                                <div className="timeline-content card">
                                    <div className="timeline-icon">{item.icon}</div>
                                    <div className="timeline-year">{item.year}</div>
                                    <h3 className="timeline-title">{item.title}</h3>
                                    <p className="timeline-subtitle">{item.subtitle}</p>
                                    <p className="timeline-description" style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: item.description }}></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Milestones */}
            <section className="milestones-section section" style={{ backgroundColor: 'var(--color-bg-light)' }}>
                <div className="container">
                    <h2 className="section-title text-center mb-sm">Pencapaian Kami | Our Achievements</h2>
                    <p className="section-subtitle text-center mb-2xl">{orgData?.shortName}</p>
                    <div className="milestones-grid">
                        {milestones.map((milestone, index) => (
                            <div key={index} className="milestone-card">
                                <div className="milestone-icon">{milestone.icon}</div>
                                <div className="milestone-number">{milestone.number}</div>
                                <div className="milestone-label">{milestone.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials-section section">
                <div className="container">
                    <h2 className="section-title text-center mb-2xl">Suara Mereka | Their Voices</h2>
                    <div className="testimonials-wrapper">
                        {testimonials.length > 3 && (
                            <>
                                <button
                                    className="scroll-btn scroll-btn-left"
                                    onClick={prevTestimonial}
                                    style={{ opacity: currentIndex === 0 ? 0.3 : 1, pointerEvents: currentIndex === 0 ? 'none' : 'auto' }}
                                    aria-label="Previous"
                                >
                                    <Icons.ArrowLeft />
                                </button>
                                <button
                                    className="scroll-btn scroll-btn-right"
                                    onClick={nextTestimonial}
                                    style={{ opacity: currentIndex >= testimonials.length - 3 ? 0.3 : 1, pointerEvents: currentIndex >= testimonials.length - 3 ? 'none' : 'auto' }}
                                    aria-label="Next"
                                >
                                    <Icons.ArrowRight />
                                </button>
                            </>
                        )}
                        {/* Always use center-mode logic within the wrapper since we only show 3 */}
                        <div className="testimonials-grid center-mode">
                            {visibleTestimonials.map((testimonial, index) => {
                                const globalIndex = currentIndex + index;
                                const colorClass = ['color-blue', 'color-orange', 'color-pink'][globalIndex % 3];
                                return (
                                    <div key={index} className={`testimonial-card card ${colorClass}`}>
                                        <p className="testimonial-quote">{testimonial.quote}</p>
                                        <div className="testimonial-author">
                                            <div className="author-image">{testimonial.image}</div>
                                            <div className="author-info">
                                                <div className="author-name">{testimonial.name}</div>
                                                <div className="author-role">{testimonial.role}</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Cinematic Reels Section Integrated from Blog */}
            {blogVideos.length > 0 && (
                <section className="video-section section-sm bg-stone-50 dark:bg-stone-900/50">
                    <div className="container">
                        <h2 className="section-title text-center mb-8">Album & Kenangan: Menuju 2 Dekad Melangkah</h2>
                        <div className="video-layout">
                            {/* Main Player */}
                            <div className="video-player-main card overflow-hidden">
                                {activeVideo && (
                                    <div className="aspect-video relative bg-black">
                                        {!videoPlaying ? (
                                            <div
                                                className="absolute inset-0 z-10 cursor-pointer group"
                                                onClick={() => setVideoPlaying(true)}
                                            >
                                                {(() => {
                                                    const ytId = extractYoutubeId(activeVideo.link);
                                                    const thumbSrc = activeVideo.thumbnail || (ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : '');
                                                    return thumbSrc ? (
                                                        <img src={thumbSrc} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="thumb-fallback text-4xl">
                                                            <span className="iconify" data-icon="lucide:video"></span>
                                                        </div>
                                                    );
                                                })()}
                                                {/* Play Button Overlay */}
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-all">
                                                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center text-stone-900 shadow-2xl group-hover:scale-110 transition-transform">
                                                        <span className="iconify" data-icon="lucide:play" data-width="32" style={{ marginLeft: '4px' }}></span>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <iframe
                                                src={getVideoEmbedUrl(activeVideo.link)}
                                                title={activeVideo.title}
                                                className="w-full h-full border-0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        )}
                                    </div>
                                )}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2">{activeVideo?.title}</h3>
                                    <p className="text-stone-600 dark:text-stone-400 text-sm">{activeVideo?.description}</p>
                                </div>
                            </div>

                            {/* Archive Thumbnails */}
                            <div className="video-sidebar custom-scrollbar">
                                <div className="video-archive-list">
                                    {blogVideos.filter(v => v.id !== activeVideo?.id).map((video) => (
                                        <button
                                            key={video.id}
                                            onClick={() => {
                                                setActiveVideo(video);
                                                setVideoPlaying(false);
                                            }}
                                            className="video-thumb-card"
                                        >
                                            <div className="thumb-img-wrapper">
                                                {(() => {
                                                    const ytId = extractYoutubeId(video.link);
                                                    const thumbSrc = video.thumbnail || (ytId ? `https://img.youtube.com/vi/${ytId}/mqdefault.jpg` : '');
                                                    return thumbSrc ? (
                                                        <img src={thumbSrc} alt="" className="thumb-img" />
                                                    ) : (
                                                        <div className="thumb-fallback"><span className="iconify" data-icon="lucide:video"></span></div>
                                                    );
                                                })()}
                                                <div className="play-overlay"><span className="iconify" data-icon="lucide:play"></span></div>
                                            </div>
                                            <div className="thumb-text">
                                                <h4 className="text-sm font-semibold line-clamp-2">{video.title}</h4>
                                                <p className="text-xs opacity-60">
                                                    {video.date?.toDate ? video.date.toDate().toLocaleDateString('ms-MY') : ''}
                                                </p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Featured Post Integrated from Blog */}
            {featuredPost && (
                <section className="featured-section section-sm">
                    <div className="container">
                        <Link to={`/blog/${featuredPost.slug}`} className="featured-post-compact card">
                            <div className="featured-content-compact">
                                <div className="featured-image-compact">
                                    <img src={getPostImage(featuredPost)} alt={featuredPost.title} />
                                    <div className="featured-badge">Sorotan | Featured</div>
                                </div>
                                <div className="featured-text-compact">
                                    <div className="post-meta mb-2">
                                        <span className="post-date text-xs uppercase tracking-wider">{new Date(featuredPost.date).toLocaleDateString('ms-MY', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                    <h2 className="text-2xl md:text-4xl font-bold mb-4">{featuredPost.title}</h2>
                                    <p className="text-lg opacity-80 mb-6 line-clamp-3">{featuredPost.excerpt}</p>
                                    <span className="btn btn-primary btn-sm">Baca Kisah Penuh | Read Full Story</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </section>
            )}

            {/* Blog Posts Grid Integrated from Blog */}
            {blogPosts.length > 0 && (
                <section className="posts-section section-sm">
                    <div className="container">
                        <h2 className="section-title text-center mb-8">Arkib Cerita & Berita</h2>
                        <div className="tag-filter mb-8">
                            {allTags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => setSelectedTag(tag)}
                                    className={`tag-button ${selectedTag === tag ? 'active' : ''}`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>

                        {blogError && (
                            <div className="text-center py-8">
                                <p className="text-red-500">{blogError}</p>
                            </div>
                        )}

                        <div className="posts-grid">
                            {filteredPosts.map((post) => (
                                <Link key={post.id} to={`/blog/${post.slug}`} className="post-card card">
                                    <div className="post-image" style={{ backgroundImage: `url(${getPostImage(post)})` }}>
                                    </div>
                                    <div className="post-content">
                                        <div className="post-meta">
                                            <span className="post-date">{new Date(post.date).toLocaleDateString('ms-MY', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                        </div>
                                        <h3 className="post-title">{post.title}</h3>
                                        <p className="post-excerpt">{post.excerpt}</p>
                                        <div className="post-tags">
                                            {post.tags && post.tags.slice(0, 2).map((tag, index) => (
                                                <span key={index} className="badge">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Forward Looking */}
            <section className="forward-section section" style={{ backgroundColor: 'var(--color-primary)' }}>
                <div className="container">
                    <div className="forward-content text-center">
                        <h2 className="forward-title">{forward.title}</h2>
                        <p className="forward-subtitle">{forward.subtitle}</p>
                        <p className="forward-description" style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: forward.description }}></p>
                        <div className="forward-vision">
                            {forward.vision.map((item, index) => (
                                <div key={index} className="vision-item">
                                    <span className="vision-icon">{item.icon}</span>
                                    <h4>{item.title}</h4>
                                    <p>{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Journey;
