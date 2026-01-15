import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { useOrganization } from "../context/OrganizationContext";
import { translations } from "../translations";

export default function Home() {
    const { orgData } = useOrganization();
    const location = useLocation();
    const isBM = location.pathname.startsWith('/bm');
    const t = translations[isBM ? 'bm' : 'en'];
    const h = t.home;
    const common = t.common;

    const getLink = (path) => isBM ? `/bm${path}` : path;

    return (
        <main className="bg-stone-50 text-stone-700 dark:bg-black dark:text-stone-300 font-sans selection:bg-stone-200 dark:selection:bg-stone-800 selection:text-stone-900 dark:selection:text-stone-100" style={{ fontFamily: "'Inter', sans-serif" }}>
            <Helmet>
                <title>
                    Revert or Convert to Islam in Malaysia | Classes for Non-Muslims & Syahadah – Hidayah Centre Foundation
                </title>
                <meta
                    name="description"
                    content="Hidayah Centre Foundation provides guidance, free classes, and syahadah support for non-Muslims who wish to learn about Islam or convert to Islam in Malaysia."
                />
                <link
                    rel="canonical"
                    href="https://hcfbtr-brocure-resource.web.app/"
                />
            </Helmet>

            {/* Hero Section */}
            <section className="min-h-[90vh] flex items-center justify-center pt-12 pb-12 relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                    {/* Abstract architectural lines background */}
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <line x1="20%" y1="0" x2="20%" y2="100%" stroke="currentColor" className="text-stone-200 dark:text-stone-800" strokeWidth="1"></line>
                        <line x1="80%" y1="0" x2="80%" y2="100%" stroke="currentColor" className="text-stone-200 dark:text-stone-800" strokeWidth="1"></line>
                    </svg>
                </div>

                <div className="max-w-5xl mx-auto px-6 relative z-10 w-full grid md:grid-cols-2 gap-12 items-center">
                    <div className="max-w-xl order-2 md:order-1">
                        <p className="text-stone-500 dark:text-stone-500 text-sm tracking-widest uppercase mb-6 fade-in font-medium">Hidayah Centre Foundation</p>
                        <h1 className="text-5xl md:text-7xl font-medium tracking-tighter text-stone-900 dark:text-white leading-[1.1] mb-8 fade-in">
                            {h.heroTitle} <br />
                            <span className="text-stone-400 dark:text-stone-500">{h.heroSubtitle}</span>
                        </h1>
                        <div className="fade-in-delay">
                            <p className="text-stone-600 dark:text-stone-400 text-lg md:text-xl font-light leading-relaxed max-w-lg mb-10">
                                {h.heroDesc}
                            </p>
                            <Link to={getLink("/convert-to-islam-malaysia")} className="inline-flex items-center text-sm font-medium text-stone-900 dark:text-white border-b border-stone-900 dark:border-white pb-1 hover:text-stone-600 dark:hover:text-stone-300 hover:border-stone-400 transition-all duration-300">
                                {h.heroCTA}
                                <span className="iconify ml-2" data-icon="lucide:arrow-right"></span>
                            </Link>
                        </div>
                    </div>

                    {/* Picture Card */}
                    <div className="order-1 md:order-2 flex justify-center md:justify-end fade-in-delay">
                        <div className="relative w-full max-w-xs md:max-w-sm">
                            {/* Image Container */}
                            <div className="aspect-[3/4] bg-stone-200 rounded-sm overflow-hidden relative shadow-2xl shadow-stone-200 border border-stone-100 z-10">
                                {/* Using a placeholder image that fits the aesthetic */}
                                <img src="https://images.unsplash.com/photo-1564121211835-e88c852648ab?q=80&w=2940&auto=format&fit=crop" alt="Mosque Architecture" className="hover:grayscale-0 transition-all duration-1000 ease-out hover:opacity-100 opacity-90 w-full h-full object-cover grayscale" style={{ outline: 'rgb(245, 158, 11) solid 2px', outlineOffset: '2px', transition: 'outline 0.1s ease-in-out' }} />

                                {/* Overlay Text */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-stone-900/60 to-transparent">
                                    <p className="text-white text-xs font-mono tracking-widest uppercase">Guidance &amp; Light</p>
                                </div>
                            </div>
                            {/* Decorative backing card */}
                            <div className="absolute top-4 -right-4 w-full h-full border border-stone-300 dark:border-stone-700 rounded-sm -z-0 hidden md:block"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy Quote */}
            <section className="py-24 md:py-32 bg-white dark:bg-stone-900 border-y border-stone-100 dark:border-stone-800">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <span className="iconify mx-auto text-stone-300 dark:text-stone-600 mb-8" data-icon="lucide:quote" data-width="24" data-height="24"></span>
                    <blockquote className="serif-quote text-2xl md:text-4xl text-stone-800 dark:text-stone-200 leading-relaxed italic">
                        {h.philosophy}
                    </blockquote>
                </div>
            </section>

            {/* About Section (Classes) */}
            <section id="classes" className="py-24 md:py-32">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="grid md:grid-cols-12 gap-12 items-start">
                        <div className="md:col-span-4">
                            <div className="aspect-[3/4] bg-stone-200 w-full relative overflow-hidden rounded-sm">
                                {/* Abstract placeholder for portrait */}
                                <img src="https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=2940&auto=format&fit=crop" alt="Learning" className="w-full h-full object-cover opacity-80" />
                                <div className="absolute bottom-6 left-6">
                                    <p className="text-xs font-mono text-white/90 uppercase tracking-widest">Education . Understanding</p>
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-8 md:pl-8">
                            <h2 className="text-2xl font-medium tracking-tight text-stone-900 dark:text-white mb-8">{h.classesTitle}</h2>
                            <div className="space-y-6 text-stone-600 dark:text-stone-400 font-light leading-relaxed text-lg">
                                <p>
                                    {h.classesDesc}
                                </p>
                                <p>
                                    {h.classesSubDesc}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mt-12 border-t border-stone-200 dark:border-stone-800 pt-8">
                                <div>
                                    <h3 className="text-sm font-medium text-stone-900 dark:text-stone-300 uppercase tracking-wide mb-2">{common.languages}</h3>
                                    <p className="text-stone-500 dark:text-stone-500 text-sm">English, Bahasa Melayu</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-stone-900 dark:text-stone-300 uppercase tracking-wide mb-2">{common.cost}</h3>
                                    <p className="text-stone-500 dark:text-stone-500 text-sm">{common.free}</p>
                                </div>
                            </div>
                            <div className="mt-8">
                                <Link to={getLink("/classes-for-non-muslims")} className="text-stone-900 dark:text-stone-300 underline hover:text-stone-600 dark:hover:text-stone-100">{h.viewSchedule} →</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Professional Experience (Conversion Process) */}
            <section id="process" className="py-24 bg-white dark:bg-stone-900 border-y border-stone-100 dark:border-stone-800">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-baseline mb-16">
                        <h2 className="text-2xl font-medium tracking-tight text-stone-900 dark:text-white">{h.journeyTitle}</h2>
                        <span className="text-sm text-stone-400 dark:text-stone-600 mt-2 md:mt-0">{common.stepByStep}</span>
                    </div>

                    <div className="space-y-0">
                        {/* Item 1 */}
                        <div className="group border-l border-stone-200 dark:border-stone-800 pl-8 pb-12 relative">
                            <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-stone-300 dark:bg-stone-700 group-hover:bg-emerald-800/60 transition-colors duration-300"></span>
                            <div className="grid md:grid-cols-2 gap-8 items-start">
                                <div className="max-w-xl">
                                    <h3 className="text-lg font-medium text-stone-900 dark:text-stone-200 mb-1">{h.step1Title}</h3>
                                    <p className="text-stone-500 dark:text-stone-500 text-sm mb-4">{common.foundation}</p>
                                    <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                                        {h.step1Desc}
                                    </p>
                                </div>
                                <div className="mt-4 md:mt-0 max-w-md">
                                    <div className="aspect-[16/9] bg-stone-100 dark:bg-stone-800 rounded-sm overflow-hidden mb-3 border border-stone-200 dark:border-stone-800">
                                        <img src="/images/journey-understand.png" alt="Foundation" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                                    </div>
                                    <Link to={getLink("/classes-for-non-muslims")} className="inline-flex items-center text-sm font-medium text-stone-900 dark:text-stone-300 border-b border-transparent hover:border-stone-900 dark:hover:border-stone-300 transition-all">
                                        {isBM ? 'Kelas untuk bukan Islam' : 'Classes for non-Muslims'}
                                        <span className="iconify ml-2" data-icon="lucide:arrow-right" data-width="14"></span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div className="group border-l border-stone-200 dark:border-stone-800 pl-8 pb-12 relative">
                            <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-stone-300 dark:bg-stone-700 group-hover:bg-emerald-800/60 transition-colors duration-300"></span>
                            <div className="grid md:grid-cols-2 gap-8 items-start">
                                <div className="max-w-xl">
                                    <h3 className="text-lg font-medium text-stone-900 dark:text-stone-200 mb-1">{h.step2Title}</h3>
                                    <p className="text-stone-500 dark:text-stone-500 text-sm mb-4">{common.conversion}</p>
                                    <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                                        {h.step2Desc}
                                    </p>
                                </div>
                                <div className="mt-4 md:mt-0 max-w-md">
                                    <div className="aspect-[16/9] bg-stone-100 dark:bg-stone-800 rounded-sm overflow-hidden mb-3 border border-stone-200 dark:border-stone-800">
                                        <img src="/images/journey-convert.png" alt="Conversion" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                                    </div>
                                    <Link to={getLink("/convert-to-islam-malaysia")} className="inline-flex items-center text-sm font-medium text-stone-900 dark:text-stone-300 border-b border-transparent hover:border-stone-900 dark:hover:border-stone-300 transition-all">
                                        {isBM ? 'Kembali kepada Islam' : 'Reverting to Islam'}
                                        <span className="iconify ml-2" data-icon="lucide:arrow-right" data-width="14"></span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Item 3 */}
                        <div className="group border-l border-stone-200 dark:border-stone-800 pl-8 pb-12 relative">
                            <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-stone-300 dark:bg-stone-700 group-hover:bg-emerald-800/60 transition-colors duration-300"></span>
                            <div className="grid md:grid-cols-2 gap-8 items-start">
                                <div className="max-w-xl">
                                    <h3 className="text-lg font-medium text-stone-900 dark:text-stone-200 mb-1">{h.step3Title}</h3>
                                    <p className="text-stone-500 dark:text-stone-500 text-sm mb-4">{common.growth}</p>
                                    <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                                        {h.step3Desc}
                                    </p>
                                </div>
                                <div className="mt-4 md:mt-0 max-w-md">
                                    <div className="aspect-[16/9] bg-stone-100 dark:bg-stone-800 rounded-sm overflow-hidden mb-3 border border-stone-200 dark:border-stone-800">
                                        <img src="/images/journey-support.png" alt="Growth" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                                    </div>
                                    <Link to={getLink("/about")} className="inline-flex items-center text-sm font-medium text-stone-900 dark:text-stone-300 border-b border-transparent hover:border-stone-900 dark:hover:border-stone-300 transition-all">
                                        {isBM ? 'Sokongan untuk Mualaf' : 'Supports for Mualaf'}
                                        <span className="iconify ml-2" data-icon="lucide:arrow-right" data-width="14"></span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Consulting Studio (Why Us) */}
            <section id="why-us" className="py-24 bg-stone-100/50 dark:bg-stone-950">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16">
                        <div>
                            <span className="inline-block py-1 px-3 rounded-full bg-emerald-900/5 text-emerald-900 dark:text-emerald-500 text-xs font-medium tracking-wide mb-6">{common.aboutUs}</span>
                            <h2 className="text-3xl font-medium tracking-tight text-stone-900 dark:text-white mb-6">{h.whyUsTitle} ({orgData.shortName || 'HCFBTR'})</h2>
                            <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed mb-8">
                                {isBM ? 'Kami berdedikasi untuk menyediakan persekitaran yang menyokong dan mendidik untuk semua orang yang meminati Islam.' : 'We are dedicated to providing a supportive and educational environment for everyone interested in Islam.'}
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <span className="iconify text-stone-400 dark:text-stone-600 mr-3 mt-1 flex-shrink-0" data-icon="lucide:check"></span>
                                    <span className="text-stone-700 dark:text-stone-300 text-sm">{common.trusted}</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="iconify text-stone-400 dark:text-stone-600 mr-3 mt-1 flex-shrink-0" data-icon="lucide:check"></span>
                                    <span className="text-stone-700 dark:text-stone-300 text-sm">{common.freeGuidance}</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="iconify text-stone-400 dark:text-stone-600 mr-3 mt-1 flex-shrink-0" data-icon="lucide:check"></span>
                                    <span className="text-stone-700 dark:text-stone-300 text-sm">{common.educators}</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="iconify text-stone-400 dark:text-stone-600 mr-3 mt-1 flex-shrink-0" data-icon="lucide:check"></span>
                                    <span className="text-stone-700 dark:text-stone-300 text-sm">{common.support}</span>
                                </li>
                            </ul>
                            <div className="mt-8">
                                <Link to={getLink("/about")} className="inline-flex items-center text-sm font-medium text-stone-900 dark:text-stone-300 border-b border-stone-900 dark:border-stone-100 pb-1 hover:text-stone-600 dark:hover:text-stone-100 hover:border-stone-400 transition-all duration-300">
                                    {common.getToKnow} {orgData.shortName || 'HCFBTR'}
                                    <span className="iconify ml-2" data-icon="lucide:arrow-right"></span>
                                </Link>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-stone-900 p-10 shadow-sm border border-stone-200 dark:border-stone-800 rounded-sm flex flex-col justify-center">
                            <div className="mb-6">
                                <span className="iconify text-stone-800 dark:text-stone-200" data-icon="lucide:layers" data-width="32" data-height="32"></span>
                            </div>
                            <h3 className="text-lg font-medium text-stone-900 dark:text-white mb-2">{h.missionTitle}</h3>
                            <p className="text-stone-500 dark:text-stone-400 text-sm font-light leading-relaxed">
                                {h.missionDesc}
                            </p>
                        </div>
                    </div>
                </div>
            </section>



            {/* Personal Interests (Services) */}
            <section className="py-24 bg-white dark:bg-black">
                <div className="max-w-5xl mx-auto px-6">
                    <h2 className="text-sm font-medium uppercase tracking-widest text-stone-400 dark:text-stone-600 text-center mb-16">{common.servicesSupport}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="group">
                            <div className="w-12 h-12 mx-auto bg-stone-50 dark:bg-stone-900 rounded-full flex items-center justify-center mb-4 group-hover:bg-stone-100 dark:group-hover:bg-stone-800 transition-colors">
                                <span className="iconify text-stone-600 dark:text-stone-400" data-icon="lucide:book-open" data-width="20" data-height="20"></span>
                            </div>
                            <h4 className="text-sm font-medium text-stone-800 dark:text-stone-200">{common.freeClasses}</h4>
                        </div>
                        <div className="group">
                            <div className="w-12 h-12 mx-auto bg-stone-50 dark:bg-stone-900 rounded-full flex items-center justify-center mb-4 group-hover:bg-stone-100 dark:group-hover:bg-stone-800 transition-colors">
                                <span className="iconify text-stone-600 dark:text-stone-400" data-icon="lucide:heart-handshake" data-width="20" data-height="20"></span>
                            </div>
                            <h4 className="text-sm font-medium text-stone-800 dark:text-stone-200">{common.revertSupport}</h4>
                        </div>
                        <div className="group">
                            <div className="w-12 h-12 mx-auto bg-stone-50 dark:bg-stone-900 rounded-full flex items-center justify-center mb-4 group-hover:bg-stone-100 dark:group-hover:bg-stone-800 transition-colors">
                                <span className="iconify text-stone-600 dark:text-stone-400" data-icon="lucide:users" data-width="20" data-height="20"></span>
                            </div>
                            <h4 className="text-sm font-medium text-stone-800 dark:text-stone-200">{common.community}</h4>
                        </div>
                        <div className="group">
                            <div className="w-12 h-12 mx-auto bg-stone-50 dark:bg-stone-900 rounded-full flex items-center justify-center mb-4 group-hover:bg-stone-100 dark:group-hover:bg-stone-800 transition-colors">
                                <span className="iconify text-stone-600 dark:text-stone-400" data-icon="lucide:map-pin" data-width="20" data-height="20"></span>
                            </div>
                            <h4 className="text-sm font-medium text-stone-800 dark:text-stone-200">{common.branches}</h4>
                        </div>
                    </div>
                </div>
            </section>


        </main>
    );
}
