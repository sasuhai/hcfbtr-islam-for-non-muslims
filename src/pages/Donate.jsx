import { useState, useEffect } from 'react';
import { useOrganization } from '../context/OrganizationContext';
import { getDocument } from '../firebase/firestoreService';
import './Donate.css';

const Icons = {
    Heart: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>,
    Smartphone: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></svg>,
    Camera: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>,
    Bank: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18" /><path d="M5 21v-7" /><path d="M19 21v-7" /><path d="M10 21v-7" /><path d="M14 21v-7" /><rect x="2" y="3" width="20" height="5" /><path d="M12 3V21" /></svg>,
    Copy: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>,
    Mail: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>,
    Message: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>,
    Check: () => <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
};

function Donate() {
    const { orgData } = useOrganization();
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);

    const getDefaultContent = () => ({
        header: {
            title: "Donate",
            subtitle: "Sumbangan Anda Membawa Perubahan",
            intro: "Setiap ringgit yang anda sumbangkan adalah pelaburan untuk menyampaikan Islam dan memperkasakan mualaf. Bersama-sama, kita membina masa depan yang lebih cerah."
        },
        premiumSection: {
            title: "Cara Menderma | How to Donate",
            subtitle: "Scan QR Code atau gunakan butiran bank di bawah",
            qrPlaceholder: {
                title: "QR Code",
                subtitle: "Scan untuk derma"
            },
            qrLabel: "Scan dengan banking app anda",
            dividerText: "ATAU",
            bankTitle: "Butiran Bank | Bank Details",
            bankLabels: {
                accountName: "Nama Akaun | Account Name",
                bankName: "Nama Bank | Bank Name",
                accountNumber: "Nombor Akaun | Account Number",
                copy: "Copy"
            }
        },
        instructions: {
            title: "Selepas Menderma | After Donating",
            subtitle: "Sila hantar resit untuk pengesahan dan tax receipt",
            steps: [
                { number: 1, title: "Screenshot Resit Pembayaran", desc: "Take a screenshot of your transaction receipt" },
                { number: 2, title: "Hantar Melalui | Send Via:", desc: "" },
                { number: 3, title: "Terima Pengesahan", desc: "You'll receive confirmation and tax receipt within 2-3 business days" }
            ]
        },
        thankYou: {
            title: "Terima Kasih Atas Sokongan Anda!",
            subtitle: "Thank You For Your Support!",
            message: "Sumbangan anda membantu kami meneruskan misi untuk menyediakan pendidikan berkualiti kepada komuniti. Setiap ringgit membawa perubahan yang bermakna dalam kehidupan pelajar kami.",
            stats: [
                { value: "100%", label: "Untuk Program" },
                { value: "500+", label: "Pelajar Dibantu" },
                { value: "10+", label: "Tahun Berkhidmat" }
            ]
        }
    });

    useEffect(() => {
        const loadContent = async () => {
            try {
                const doc = await getDocument('pages', 'donate');
                if (doc) {
                    setContent(doc);
                } else {
                    setContent(getDefaultContent());
                }
            } catch (error) {
                console.error('Error loading donate page:', error);
                setContent(getDefaultContent());
            } finally {
                setLoading(false);
            }
        };
        loadContent();
    }, []);

    if (loading) return <div className="loading-screen">Loading...</div>;

    const c = content || getDefaultContent();

    return (
        <div className="donate-page">
            {/* Header */}
            <section className="donate-header">
                <div className="container">
                    <div className="donate-header-content text-center">
                        <h1 className="page-title">{c.header.title}</h1>
                        <p className="page-subtitle">{c.header.subtitle}</p>
                        <p className="donate-intro" style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: c.header.intro }}></p>
                    </div>
                </div>
            </section>

            {/* Premium Donation Section */}
            <section className="premium-donate-section section">
                <div className="container">
                    <div className="premium-donate-wrapper">
                        {/* Main Donation Card */}
                        {/* Main Donation Card - Redesigned to match the poster screenshot */}
                        <div className="donation-poster-card shadow-2xl">
                            {/* Top part with background image and text overlay */}
                            <div className="poster-header relative overflow-hidden">
                                <div className="poster-bg-img" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/nmnr_class.png')` }}></div>
                                <div className="poster-header-content relative z-10 flex flex-col items-center justify-center h-full text-center p-6 pt-12">
                                    <div className="duitnow-logo-wrapper mb-4">
                                        <div className="duitnow-logo bg-white rounded-full p-1.5 w-16 h-16 flex items-center justify-center shadow-lg">
                                            <div className="flex flex-col items-center">
                                                <div className="text-[#d81e5b] font-black text-[10px] leading-none uppercase">DuitNow</div>
                                                <div className="text-stone-800 font-bold text-[8px] leading-none">QR</div>
                                            </div>
                                        </div>
                                    </div>
                                    <h2 className="text-white font-bold text-4xl md:text-5xl uppercase tracking-tight mb-0">INFAQ DI SINI</h2>
                                    <p className="text-white text-lg md:text-xl font-medium mt-1">Donate Here</p>
                                </div>
                                {/* The curved bottom shape */}
                                <div className="poster-curve">
                                    <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                                        <path fill="#9e1b12" d="M0,120 L1440,120 L1440,0 C1080,80 360,80 0,0 L0,120 Z"></path>
                                    </svg>
                                </div>
                            </div>

                            {/* Bottom part with red background and bank details */}
                            <div className="poster-body bg-[#9e1b12] text-white p-8 md:p-12 text-center pb-16">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-medium uppercase tracking-wide leading-tight">
                                            {orgData?.fullName?.split('Bandar Tun Razak')[0] || "HIDAYAH CENTRE FOUNDATION"}
                                        </h3>
                                        <p className="text-xl md:text-2xl font-bold mt-1">
                                            {orgData?.bank?.accountName?.split('Foundation ')[1] || "RH Bandar Tun Razak"}
                                        </p>
                                    </div>

                                    <div className="text-3xl md:text-4xl font-bold tracking-wider py-4 border-y border-white/20">
                                        {orgData?.bank?.accountNumber || "1211 3010 7744 82"}
                                    </div>

                                    <div className="bank-logo-container flex justify-center py-4">
                                        <div className="bg-white rounded-lg p-4 px-8 shadow-inner flex items-center justify-center min-w-[200px]">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[#9e1b12] font-black text-2xl italic">BANK</span>
                                                <div className="h-8 w-px bg-stone-300 mx-1"></div>
                                                <span className="text-[#9e1b12] font-bold text-2xl tracking-tighter">ISLAM</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="reference-text mt-8">
                                        <p className="text-xl md:text-2xl italic font-light">
                                            Rujukan: <span className="font-bold">Infak {orgData?.shortName || "HCFBTR"}</span>
                                        </p>
                                    </div>

                                    <button
                                        className="mt-8 bg-white/10 hover:bg-white/20 text-white border border-white/30 px-6 py-2 rounded-full text-sm transition-all backdrop-blur-sm"
                                        onClick={() => {
                                            navigator.clipboard.writeText(orgData?.bank?.accountNumber);
                                            alert("Account number copied!");
                                        }}
                                    >
                                        Copy Account Number
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Redesigned Instructions Section - Compact & Consistent */}
                        <div className="donation-after-action mt-12">
                            <div className="section-header-compact text-center mb-8">
                                <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{c.instructions.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{c.instructions.subtitle}</p>
                            </div>

                            <div className="action-steps-grid">
                                {c.instructions.steps?.map((step, idx) => (
                                    <div className="action-step-card" key={idx}>
                                        <div className="action-step-icon-wrapper">
                                            <div className="action-step-number">{step.number}</div>
                                            <div className="action-icon">
                                                {idx === 0 && <span className="iconify" data-icon="lucide:camera" data-width="24"></span>}
                                                {idx === 1 && <span className="iconify" data-icon="lucide:send" data-width="24"></span>}
                                                {idx === 2 && <span className="iconify" data-icon="lucide:mail-check" data-width="24"></span>}
                                            </div>
                                        </div>
                                        <div className="action-step-body">
                                            <h4 className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{step.title}</h4>
                                            {step.desc && <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', lineHeight: '1.625' }}>{step.desc}</p>}

                                            {/* Specific sub-actions for the contact step (index 1) */}
                                            {idx === 1 && (
                                                <div className="action-buttons-compact mt-3">
                                                    {orgData?.phone?.[0] && (
                                                        <a href={`https://wa.me/${orgData.phone[0].replace(/[^0-9]/g, '')}`} className="action-btn-mini whatsapp" target="_blank" rel="noopener noreferrer">
                                                            <Icons.Message /> <span>WhatsApp</span>
                                                        </a>
                                                    )}
                                                    <a href={`mailto:${orgData?.email}`} className="action-btn-mini email">
                                                        <Icons.Mail /> <span>Email</span>
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Thank You Card */}
                        {/* Other Ways to Give Section */}
                        <div className="other-donations-section mt-20 mb-12">
                            <div className="section-header-compact text-center mb-10">
                                <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Wait!.. Selain Wang Tunai anda juga boleh menyumbangkan:</h3>
                                <p className="text-sm md:text-base font-medium" style={{ color: 'var(--text-secondary)' }}>Wait!.. Apart from cash, you can also contribute:</p>
                            </div>

                            <div className="other-donations-grid">
                                <div className="other-donation-card">
                                    <div className="other-card-img-wrapper">
                                        <img src="/images/ibadah_essentials.png" alt="Keperluan Ibadah" className="other-card-img" />
                                    </div>
                                    <div className="other-card-content">
                                        <h4>Keperluan Ibadah</h4>
                                        <p>Al-Quran, Iqra, buku solat & barang mengaji.</p>
                                    </div>
                                </div>

                                <div className="other-donation-card">
                                    <div className="other-card-img-wrapper">
                                        <img src="/images/basic_necessities.png" alt="Keperluan Asasi" className="other-card-img" />
                                    </div>
                                    <div className="other-card-content">
                                        <h4>Keperluan Asasi</h4>
                                        <p>Pakaian & tajaan Iftar.</p>
                                    </div>
                                </div>

                                <div className="other-donation-card">
                                    <div className="other-card-img-wrapper">
                                        <img src="/images/experience_donation.png" alt="Donate Experience" className="other-card-img" />
                                    </div>
                                    <div className="other-card-content">
                                        <h4>Donate Experience</h4>
                                        <p>Menaja aktiviti atau modul pembelajaran yang menarik buat mualaf.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Compact Thank You Section */}
                        <div className="donation-thank-you-banner mt-12 overflow-hidden relative">
                            <div className="thank-you-bg-texture absolute inset-0 opacity-[0.03] pointer-events-none"></div>
                            <div className="relative z-10 p-8 md:p-12">
                                <div className="thank-you-header-compact flex flex-col items-center text-center">
                                    <div className="thank-you-heart-icon mb-4">
                                        <Icons.Heart />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{c.thankYou.title}</h3>
                                    <p className="text-sm md:text-base font-medium max-w-2xl mx-auto mb-8" style={{ color: 'var(--text-secondary)' }}>
                                        {c.thankYou.subtitle}
                                    </p>
                                </div>

                                <div className="thank-you-stats-compact grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                                    {c.thankYou.stats?.map((stat, idx) => (
                                        <div className="stat-card-compact" key={idx}>
                                            <div className="stat-value-mini">{stat.value}</div>
                                            <div className="stat-label-mini">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Redesigned Contact Section - Invitational & Empathetic */}
            <section className="contact-help-section section pb-24">
                <div className="container">
                    <div className="contact-help-card overflow-hidden relative">
                        <div className="help-card-glow"></div>
                        <div className="contact-help-content relative z-10">
                            <div className="help-icon-badge mb-6">
                                <span className="iconify" data-icon="lucide:message-circle-question" data-width="40"></span>
                            </div>

                            <h2 className="help-title" style={{ color: 'var(--text-primary)' }}>Masih tertanya-tanya?</h2>
                            <p className="help-subtitle mb-6" style={{ color: 'var(--text-secondary)' }}>Still wondering? We're here to listen.</p>

                            <div className="help-message-box p-6 rounded-2xl mb-8 max-w-2xl mx-auto" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-light)' }}>
                                <p className="italic leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                                    "Setiap niat murni pasti ada persoalannya. Sama ada anda ingin tahu tentang impak sumbangan atau cara lain untuk menyumbang, kami sedia membantu dengan setulus hati."
                                </p>
                            </div>

                            <div className="help-actions flex flex-wrap justify-center gap-6">
                                {orgData?.phone?.[0] && (
                                    <a href={`https://wa.me/${orgData.phone[0].replace(/[^0-9]/g, '')}`} className="help-btn whatsapp-help" target="_blank" rel="noopener noreferrer">
                                        <div className="btn-icon-circular">
                                            <Icons.Message />
                                        </div>
                                        <div className="btn-text-content">
                                            <span className="btn-label">Tanya melalui WhatsApp</span>
                                            <span className="btn-subtext">{orgData.phone[0]}</span>
                                        </div>
                                    </a>
                                )}

                                <a href={`mailto:${orgData?.email}`} className="help-btn email-help">
                                    <div className="btn-icon-circular">
                                        <Icons.Mail />
                                    </div>
                                    <div className="btn-text-content">
                                        <span className="btn-label">Hantarkan Email</span>
                                        <span className="btn-subtext">{orgData?.email}</span>
                                    </div>
                                </a>
                            </div>

                            <p className="help-footer-note mt-10 text-sm font-medium uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>
                                #SatuHatiSatuTujuan
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Donate;
