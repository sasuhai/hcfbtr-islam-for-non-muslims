import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { useOrganization } from "../context/OrganizationContext";
import { translations } from "../translations";

export default function ConvertToIslam() {
    const { orgData } = useOrganization();
    const location = useLocation();
    const isBM = location.pathname.startsWith('/bm');
    const t = translations[isBM ? 'bm' : 'en'];
    const c = t.convert;
    const cl = t.classes;
    const common = t.common;

    const getLink = (path) => isBM ? `/bm${path}` : path;
    return (
        <main className="animate-fade-in bg-stone-50 text-stone-700 dark:bg-black dark:text-stone-300 select-none">
            <Helmet>
                <title>
                    Convert to Islam in Malaysia | Syahadah Guidance & Support – Hidayah Centre Foundation
                </title>

                <meta
                    name="description"
                    content="Learn how to convert to Islam in Malaysia. Hidayah Centre Foundation provides syahadah guidance, classes for non-Muslims, and full support for new Muslims."
                />

                <link
                    rel="canonical"
                    href="https://hcfbtr-brocure-resource.web.app/convert-to-islam-malaysia"
                />
            </Helmet>

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-white dark:bg-black border-b border-stone-100 dark:border-stone-800">
                <div className="container mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
                    <div className="animate-fade-in order-2 md:order-1 mt-20">
                        <span className="inline-block py-1 px-3 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-400 text-xs font-medium tracking-wide mb-6 border border-emerald-100 dark:border-emerald-800">
                            {c.heroSubtitle}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-medium tracking-tighter text-stone-900 dark:text-white leading-[1.1] mb-8">
                            {c.title}
                        </h1>
                        <p className="text-stone-600 dark:text-stone-400 text-lg md:text-xl font-light leading-relaxed max-w-lg mb-8">
                            {c.heroDesc}
                        </p>
                        <div className="mt-24 text-center border-t border-stone-100 dark:border-stone-800 pt-16">
                            <div className="mb-8">
                                <Link to={getLink("/classes-for-non-muslims")} className="inline-flex justify-center items-center px-10 py-4 bg-blue-600 text-white hover:bg-blue-700 rounded-full transition-all shadow-lg hover:shadow-blue-200 hover:-translate-y-1 font-medium tracking-wide">
                                    {cl.registerNow}
                                </Link>
                            </div>
                            <p className="text-stone-600 dark:text-stone-400 font-light">
                                {common.contactUs} <a href={`mailto:${orgData.email}`} className="text-emerald-700 dark:text-emerald-400 hover:underline">{orgData.email}</a> {common.and} <a href={`tel:${orgData.phone && orgData.phone[0]}`} className="text-emerald-700 dark:text-emerald-400 hover:underline">{orgData.phone && orgData.phone[0]}</a>
                            </p>
                        </div>
                    </div>
                    {/* Hero Image */}
                    <div className="order-1 md:order-2 animate-fade-in relative">
                        <div className="aspect-[4/3] bg-stone-100 dark:bg-stone-900 rounded-sm overflow-hidden shadow-xl border border-stone-100 dark:border-stone-800 relative">
                            <img
                                src="/syahadah_ceremony.jpg"
                                alt="Syahadah Ceremony in Malaysia"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 md:grayscale hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* What Does It Mean Section */}
            <section className="py-24 bg-stone-50 dark:bg-stone-950">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-medium tracking-tight text-stone-900 dark:text-white mb-8">{c.whatMeaning}</h2>
                        <div className="bg-white dark:bg-stone-900 p-10 rounded-sm shadow-sm border border-stone-100 dark:border-stone-800 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                            <p className="text-stone-600 dark:text-stone-300 font-light text-xl leading-relaxed mb-6">
                                {c.meaningP1}
                            </p>
                            <p className="text-stone-500 dark:text-stone-400 font-light text-lg">
                                {c.meaningP2}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How to Convert Steps (Timeline style) */}
            <section className="py-24 bg-white dark:bg-black border-y border-stone-100 dark:border-stone-800">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-medium tracking-tight text-stone-900 dark:text-white">{c.stepsTitle}</h2>
                    </div>

                    <div className="grid md:grid-cols-5 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-stone-100 dark:bg-stone-800 -z-10"></div>

                        {[
                            {
                                title: isBM ? "Pelajari Tentang Islam" : "Learn About Islam",
                                desc: isBM ? "Sertai kelas atau sesi satu-ke-satu untuk memahami kepercayaan dan amalan asas Islam." : "Attend classes or one-to-one sessions to understand the basic beliefs and practices of Islam."
                            },
                            {
                                title: isBM ? "Dapatkan Bimbingan" : "Seek Guidance",
                                desc: isBM ? "Berjumpa dengan pendidik atau kaunselor bertauliah dari Hidayah Centre Foundation." : "Meet with qualified educators or counsellors from Hidayah Centre Foundation."
                            },
                            {
                                title: isBM ? "Ucapkan Syahadah" : "Recite the Syahadah",
                                desc: isBM ? "Isytiharkan syahadah di hadapan saksi yang sah apabila anda bersedia." : "Declare the syahadah in front of authorised witnesses when you are ready."
                            },
                            {
                                title: isBM ? "Pendaftaran Rasmi" : "Official Registration",
                                desc: isBM ? "Bantuan disediakan mengikut prosedur Malaysia." : "Assistance is provided according to Malaysian procedures."
                            },
                            {
                                title: isBM ? "Sokongan Berterusan" : "Ongoing Support",
                                desc: isBM ? "Teruskan belajar dan terima sokongan komuniti selepas pemelukan." : "Continue learning and receive community support after conversion."
                            }
                        ].map((step, idx) => (
                            <div key={idx} className="bg-white dark:bg-black group">
                                <div className="w-16 h-16 mx-auto bg-stone-50 dark:bg-stone-900 rounded-full border border-stone-200 dark:border-stone-800 flex items-center justify-center text-xl font-serif text-stone-400 dark:text-stone-600 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:border-emerald-200 dark:group-hover:border-emerald-800 transition-colors z-10 relative">
                                    {idx + 1}
                                </div>
                                <h3 className="text-lg font-medium text-stone-900 dark:text-white text-center mb-4">{step.title}</h3>
                                <p className="text-stone-500 dark:text-stone-400 font-light text-sm text-center leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Syahadah Focus Section */}
            <section className="py-24 bg-stone-900 text-stone-300 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg width="100%" height="100%">
                        <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <circle cx="20" cy="20" r="1.5" className="text-white" fill="currentColor" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#pattern-circles)" />
                    </svg>
                </div>
                <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
                    <h2 className="text-3xl font-medium text-white mb-8">{c.syahadahTitle}</h2>
                    <p className="text-stone-400 font-light text-xl leading-relaxed mb-12">
                        {c.syahadahDesc}
                    </p>

                    <div className="bg-stone-800/50 backdrop-blur-sm p-8 md:p-12 rounded-sm border border-stone-700">
                        <p className="font-serif italic text-2xl md:text-3xl text-emerald-100/90 leading-relaxed mb-6">
                            "Ash-hadu an la ilaha illa Allah, <br /> wa ash-hadu anna Muhammadan Rasulullah."
                        </p>
                        <p className="text-stone-400 font-light text-sm tracking-wide uppercase">
                            {c.syahadahTranslation}
                        </p>
                    </div>
                </div>
            </section>

            {/* Support & Classes Grid */}
            <section className="py-24 bg-stone-50 dark:bg-stone-950">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="bg-white dark:bg-stone-900 p-10 rounded-sm shadow-lg shadow-stone-200/50 dark:shadow-none border border-stone-100 dark:border-stone-800 flex flex-col items-start justify-between group h-full hover:-translate-y-1 transition-transform duration-300">
                            <div>
                                <div className="w-12 h-12 bg-stone-100 dark:bg-stone-800 rounded-sm flex items-center justify-center mb-6">
                                    <span className="iconify text-stone-600 dark:text-stone-400" data-icon="lucide:book-open"></span>
                                </div>
                                <h3 className="text-2xl font-medium text-stone-900 dark:text-white mb-4">{isBM ? 'Kelas untuk Bukan Islam' : 'Classes for Non-Muslims'}</h3>
                                <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed mb-8">
                                    {isBM ? 'Kami menawarkan kelas percuma yang direka untuk bukan Islam yang berminat untuk belajar tentang Islam atau bersedia untuk memeluk Islam. Kelas ini dikendalikan dalam persekitaran yang menghormati dan mesra.' : 'We offer free classes designed for non-Muslims who are interested in learning about Islam or preparing to convert. These classes are conducted in a respectful and welcoming environment.'}
                                </p>
                            </div>
                            <Link to={getLink("/classes-for-non-muslims")} className="text-stone-900 dark:text-white border-b border-stone-300 dark:border-stone-700 hover:border-stone-900 dark:hover:border-white pb-1 transition-colors">
                                {isBM ? 'Lebih lanjut tentang kelas' : 'More about classes'} →
                            </Link>
                        </div>
                        <div className="bg-white dark:bg-stone-900 p-10 rounded-sm shadow-lg shadow-stone-200/50 dark:shadow-none border border-stone-100 dark:border-stone-800 flex flex-col items-start justify-between group h-full hover:-translate-y-1 transition-transform duration-300">
                            <div>
                                <div className="w-12 h-12 bg-stone-100 dark:bg-stone-800 rounded-sm flex items-center justify-center mb-6">
                                    <span className="iconify text-stone-600 dark:text-stone-400" data-icon="lucide:heart-handshake"></span>
                                </div>
                                <h3 className="text-2xl font-medium text-stone-900 dark:text-white mb-4">{c.supportTitle}</h3>
                                <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed mb-8">
                                    {c.supportDesc}
                                </p>
                            </div>
                            <div className="text-stone-400 dark:text-stone-500 text-sm">{isBM ? 'Sentiasa di sini untuk anda' : 'Always here for you'}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 bg-white dark:bg-black border-y border-stone-100 dark:border-stone-800">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="text-3xl font-medium tracking-tight text-stone-900 dark:text-white mb-16">{isBM ? 'Mengapa Memilih Hidayah Centre Foundation?' : 'Why Choose Hidayah Centre Foundation?'}</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        {[
                            common.trusted,
                            common.educators,
                            isBM ? "Bimbingan dan sumber pembelajaran percuma" : "Free guidance and learning resources",
                            common.respectfulEnv,
                            isBM ? "Sokongan sebelum dan selepas pemelukan" : "Support before and after conversion"
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-start">
                                <span className="iconify text-emerald-600 dark:text-emerald-500 mr-4 mt-1 flex-shrink-0" data-icon="lucide:check-circle"></span>
                                <span className="text-stone-700 dark:text-stone-300 font-light">{item}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12">
                        <Link to={getLink("/about")} className="inline-flex items-center text-sm font-medium text-stone-900 dark:text-white border-b border-stone-900 dark:border-white pb-1 hover:text-stone-600 dark:hover:text-stone-300 hover:border-stone-400 transition-all duration-300">
                            {common.learnAbout} {orgData.shortName || 'HCFBTR'}
                            <span className="iconify ml-2" data-icon="lucide:arrow-right"></span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-stone-50 dark:bg-stone-950">
                <div className="container mx-auto px-6 max-w-3xl">
                    <h2 className="text-3xl font-medium tracking-tight text-stone-900 dark:text-white mb-12 text-center">{common.faq}</h2>
                    <div className="space-y-4">
                        {[
                            {
                                q: isBM ? "Adakah percuma untuk memeluk Islam di Malaysia?" : "Is it free to revert to Islam in Malaysia?",
                                a: isBM ? "Ya. Memeluk Islam di Malaysia adalah percuma. Hidayah Centre Foundation menyediakan bimbingan, kelas, dan bantuan syahadah tanpa sebarang kos." : "Yes. Reverting to Islam in Malaysia is free. Hidayah Centre Foundation provides guidance, classes, and syahadah assistance at no cost."
                            },
                            {
                                q: isBM ? "Adakah saya perlu menghadiri kelas sebelum memeluk Islam?" : "Do I need to attend classes before reverting to Islam?",
                                a: isBM ? "Menghadiri kelas tidak wajib, tetapi sangat digalakkan. Kelas membantu bukan Islam memahami kepercayaan dan amalan asas Islam sebelum melaksanakan syahadah." : "Attending classes is not compulsory, but it is highly encouraged. Classes help non-Muslims understand the basic beliefs and practices of Islam before performing the syahadah."
                            },
                            {
                                q: isBM ? "Apakah itu syahadah?" : "What is syahadah?",
                                a: isBM ? "Syahadah adalah pengisytiharan iman dalam Islam. Dengan membaca syahadah secara ikhlas dan mempercayai maknanya, seseorang itu menjadi seorang Muslim." : "Syahadah is the declaration of faith in Islam. By sincerely reciting the syahadah and believing in its meaning, a person becomes a Muslim."
                            },
                            {
                                q: isBM ? "Bolehkah bukan Islam belajar tentang Islam tanpa memeluknya?" : "Can non-Muslims learn about Islam without reverting?",
                                a: isBM ? "Ya. Hidayah Centre Foundation mengalu-alukan bukan Islam yang sekadar ingin belajar tentang Islam tanpa sebarang paksaan untuk memeluk Islam." : "Yes. Hidayah Centre Foundation welcomes non-Muslims who simply want to learn about Islam without any pressure to convert."
                            },
                            {
                                q: isBM ? "Adakah keputusan saya untuk memeluk Islam dirahsiakan?" : "Is my decision to revert kept confidential?",
                                a: isBM ? "Ya. Semua pertanyaan dan sesi bimbingan dikendalikan dengan penuh hormat dan sulit oleh Hidayah Centre Foundation." : "Yes. All enquiries and guidance sessions are handled respectfully and confidentially by Hidayah Centre Foundation."
                            },
                            {
                                q: isBM ? "Apakah sokongan yang tersedia selepas memeluk Islam?" : "What support is available after reverting to Islam?",
                                a: isBM ? "Muslim baru menerima sokongan berterusan termasuk pendidikan, kaunseling, dan bantuan komuniti untuk membantu mereka menyesuaikan diri dan membesar dalam kepercayaan mereka." : "New Muslims receive continued support including education, counselling, and community assistance to help them adjust and grow in their faith."
                            },
                            {
                                q: isBM ? "Adakah saya perlu menukar nama saya?" : "Do I need to change my name?",
                                a: isBM ? "Tidak semestinya. Jika nama asal anda membawa maksud yang baik, ia boleh dikekalkan." : "Not necessarily. If your original name carries a good meaning, it can be retained."
                            },
                            {
                                q: isBM ? "Bagaimana dengan hubungan saya dengan keluarga saya?" : "What about my relationship with my family?",
                                a: isBM ? "Islam memerintahkan kita untuk melayan ibu bapa dan ahli keluarga dengan penuh kebaikan dan hormat, walaupun mereka berbeza kepercayaan." : "Islam enjoins us to treat parents and family members with kindness and respect, even if they are of a different faith."
                            }
                        ].map((faq, idx) => (
                            <div key={idx} className="bg-white dark:bg-stone-900 p-6 rounded-sm border border-stone-200 dark:border-stone-800">
                                <h3 className="font-medium text-stone-900 dark:text-white mb-2">{faq.q}</h3>
                                <p className="text-stone-600 dark:text-stone-400 font-light text-sm">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
