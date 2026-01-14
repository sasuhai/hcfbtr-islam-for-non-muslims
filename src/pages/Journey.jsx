import { useState, useEffect, useRef } from 'react';
import { getDocument } from '../firebase/firestoreService';
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

function Journey() {
    const [pageContent, setPageContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { orgData } = useOrganization();

    const scroll = (direction) => {
        if (scrollRef.current) {
            const amount = 340; // Card width + margin approx
            scrollRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        loadPageContent();
    }, []);

    const loadPageContent = async () => {
        try {
            const content = await getDocument('pages', 'journey');
            setPageContent(content || getDefaultContent());
        } catch (err) {
            console.error('Error loading journey page:', err);
            setPageContent(getDefaultContent());
        } finally {
            setLoading(false);
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
