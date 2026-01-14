import { useState, useEffect } from 'react';
import { getDocument } from '../firebase/firestoreService';
import './Volunteer.css';

const Icons = {
    Teacher: () => <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>,
    Palette: () => <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" /><circle cx="6.5" cy="12.5" r=".5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.551-2.5 5.551-5.551C21.988 6.45 17.5 2 12 2z" /></svg>,
    Laptop: () => <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="2" y1="20" x2="22" y2="20" /></svg>,
    Phone: () => <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>,
    HeartHandshake: () => <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>,
    Calendar: () => <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    Check: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
};

function Volunteer() {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        interest: '',
        availability: '',
        experience: '',
        message: ''
    });

    const getDefaultContent = () => ({
        header: {
            title: "Volunteer",
            subtitle: "Jadilah Sebahagian Daripada Perubahan",
            intro: "Sertai kami dalam memberi impak positif kepada generasi masa depan. Masa dan kepakaran anda boleh mengubah hidup ratusan pelajar."
        },
        opportunities: [
            {
                icon: 'Teacher',
                title: 'Guru Kelas',
                subtitle: 'Class Teacher',
                description: 'Mengajar kelas Al-Quran, Bahasa Arab, atau subjek akademik',
                commitment: '4-6 jam seminggu',
                requirements: ['Pengetahuan dalam bidang berkaitan', 'Kesabaran & dedikasi', 'Komitmen minimum 3 bulan']
            },
            {
                icon: 'Palette',
                title: 'Fasilitator Aktiviti',
                subtitle: 'Activity Facilitator',
                description: 'Mengendalikan aktiviti kokurikulum, sukan, dan program khas',
                commitment: '2-4 jam seminggu',
                requirements: ['Kreatif & energetik', 'Suka bekerja dengan kanak-kanak', 'Kemahiran dalam bidang tertentu (seni, sukan, dll)']
            },
            {
                icon: 'Laptop',
                title: 'Sokongan Pentadbiran',
                subtitle: 'Administrative Support',
                description: 'Membantu dalam pengurusan, dokumentasi, dan komunikasi',
                commitment: '3-5 jam seminggu',
                requirements: ['Kemahiran komputer asas', 'Teratur & teliti', 'Boleh bekerja dari rumah']
            },
            {
                icon: 'Phone',
                title: 'Media & Komunikasi',
                subtitle: 'Media & Communications',
                description: 'Menguruskan media sosial, membuat konten, dan dokumentasi',
                commitment: '3-4 jam seminggu',
                requirements: ['Kemahiran fotografi/videografi', 'Kreatif dalam konten', 'Familiar dengan media sosial']
            },
            {
                icon: 'HeartHandshake',
                title: 'Mentor Pelajar',
                subtitle: 'Student Mentor',
                description: 'Membimbing pelajar secara peribadi, motivasi dan sokongan emosi',
                commitment: '2-3 jam seminggu',
                requirements: ['Empati & kemahiran komunikasi', 'Matang & bertanggungjawab', 'Komitmen jangka panjang']
            },
            {
                icon: 'Calendar',
                title: 'Penganjur Acara',
                subtitle: 'Event Organizer',
                description: 'Merancang dan melaksanakan program khas dan acara tahunan',
                commitment: 'Fleksibel mengikut acara',
                requirements: ['Kemahiran pengurusan projek', 'Kreatif & proaktif', 'Boleh bekerja dalam pasukan']
            }
        ],
        benefits: [
            'Pengalaman berharga dalam pendidikan dan pembangunan komuniti',
            'Berjumpa dan berjejaring dengan individu yang bersemangat',
            'Sijil penghargaan dan surat rujukan',
            'Peluang pembelajaran dan pembangunan kemahiran',
            'Kepuasan dalaman memberi impak positif',
            'Jemputan ke acara dan majlis khas'
        ],
        form: {
            title: "Daftar Minat Anda",
            subtitle: "Register Your Interest",
            description: "Sila isi borang di bawah dan kami akan menghubungi anda untuk perbincangan lanjut."
        },
        testimonial: {
            quote: "Menjadi sukarelawan di HCFBTR adalah antara keputusan terbaik dalam hidup saya. Saya datang untuk mengajar, tetapi saya belajar lebih banyak tentang kesabaran, kasih sayang, dan erti sebenar memberi. Setiap senyuman pelajar adalah hadiah yang tidak ternilai.",
            author: "Ahmad bin Hassan",
            role: "Guru Sukarelawan sejak 2019 | Volunteer Teacher since 2019"
        }
    });

    useEffect(() => {
        const loadContent = async () => {
            try {
                const doc = await getDocument('pages', 'volunteer');
                if (doc) {
                    setContent(doc);
                } else {
                    setContent(getDefaultContent());
                }
            } catch (error) {
                console.error('Error loading volunteer page:', error);
                setContent(getDefaultContent());
            } finally {
                setLoading(false);
            }
        };
        loadContent();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In production, this would send data to backend/API
        alert('Terima kasih! Kami akan menghubungi anda tidak lama lagi.\nThank you! We will contact you soon.');
        console.log('Form data:', formData);
    };

    if (loading) return <div className="loading-screen">Loading...</div>;

    const c = content || getDefaultContent();

    return (
        <div className="volunteer-page">
            {/* Header */}
            <section className="volunteer-header">
                <div className="container">
                    <div className="volunteer-header-content text-center">
                        <h1 className="page-title">{c.header.title}</h1>
                        <p className="page-subtitle">{c.header.subtitle}</p>
                        <p className="volunteer-intro" style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: c.header.intro }}></p>
                    </div>
                </div>
            </section>

            {/* Opportunities */}
            <section className="opportunities-section section">
                <div className="container">
                    <h2 className="section-title text-center mb-2xl">
                        Peluang Sukarelawan
                        <span className="section-subtitle" style={{ display: 'block', marginTop: 'var(--space-sm)' }}>
                            Volunteer Opportunities
                        </span>
                    </h2>
                    <div className="opportunities-grid">
                        {c.opportunities?.map((opp, index) => {
                            const IconComponent = Icons[opp.icon] || Icons.Check;
                            return (
                                <div key={index} className="opportunity-card card">
                                    <div className="opportunity-icon"><IconComponent /></div>
                                    <h3 className="opportunity-title">{opp.title}</h3>
                                    <p className="opportunity-subtitle">{opp.subtitle}</p>
                                    <p className="opportunity-description" style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: opp.description }}></p>
                                    <div className="opportunity-commitment">
                                        <strong>Komitmen:</strong> {opp.commitment}
                                    </div>
                                    <div className="opportunity-requirements">
                                        <strong>Keperluan:</strong>
                                        <ul>
                                            {opp.requirements?.map((req, idx) => (
                                                <li key={idx}>{req}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="benefits-section section" style={{ backgroundColor: 'var(--color-bg-light)' }}>
                <div className="container">
                    <h2 className="section-title text-center mb-2xl">
                        Manfaat Menjadi Sukarelawan
                        <span className="section-subtitle" style={{ display: 'block', marginTop: 'var(--space-sm)' }}>
                            Benefits of Volunteering
                        </span>
                    </h2>
                    <div className="benefits-list">
                        {c.benefits?.map((benefit, index) => (
                            <div key={index} className="benefit-item">
                                <span className="benefit-icon"><Icons.Check /></span>
                                <span className="benefit-text">{benefit}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Application Form */}
            <section className="form-section section">
                <div className="container">
                    <div className="form-container">
                        <div className="form-header text-center">
                            <h2 className="form-title">{c.form.title}</h2>
                            <p className="form-subtitle">{c.form.subtitle}</p>
                            <p className="form-description">{c.form.description}</p>
                        </div>

                        <form onSubmit={handleSubmit} className="volunteer-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Nama Penuh | Full Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Nama anda"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="email@example.com"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="phone">No. Telefon | Phone Number *</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        placeholder="+60123456789"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="interest">Bidang Minat | Area of Interest *</label>
                                    <select
                                        id="interest"
                                        name="interest"
                                        value={formData.interest}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Pilih bidang | Select area</option>
                                        <option value="teaching">Guru Kelas | Teaching</option>
                                        <option value="activity">Fasilitator Aktiviti | Activities</option>
                                        <option value="admin">Pentadbiran | Admin</option>
                                        <option value="media">Media & Komunikasi | Media</option>
                                        <option value="mentor">Mentor Pelajar | Mentoring</option>
                                        <option value="events">Penganjur Acara | Events</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="availability">Ketersediaan | Availability *</label>
                                <input
                                    type="text"
                                    id="availability"
                                    name="availability"
                                    value={formData.availability}
                                    onChange={handleChange}
                                    required
                                    placeholder="Contoh: Setiap Sabtu pagi, Selasa petang"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="experience">Pengalaman Berkaitan | Relevant Experience</label>
                                <textarea
                                    id="experience"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    rows="3"
                                    placeholder="Kongsi pengalaman atau kemahiran yang berkaitan..."
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Mesej Tambahan | Additional Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Apa yang memotivasi anda untuk menjadi sukarelawan?"
                                ></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary btn-lg form-submit">
                                Hantar Permohonan | Submit Application
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Testimonial */}
            <section className="volunteer-testimonial-section section" style={{ backgroundColor: 'var(--color-primary)' }}>
                <div className="container">
                    <div className="volunteer-testimonial text-center">
                        <div className="testimonial-quote-large">"</div>
                        <blockquote className="testimonial-text">
                            {c.testimonial.quote}
                        </blockquote>
                        <div className="testimonial-author-large">
                            <div className="author-name-large">{c.testimonial.author}</div>
                            <div className="author-role-large">{c.testimonial.role}</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Volunteer;
