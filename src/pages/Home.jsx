import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <main className="bg-stone-50 text-stone-700 font-sans selection:bg-stone-200 selection:text-stone-900" style={{ fontFamily: "'Inter', sans-serif" }}>
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
                        <line x1="20%" y1="0" x2="20%" y2="100%" stroke="#E7E5E4" strokeWidth="1"></line>
                        <line x1="80%" y1="0" x2="80%" y2="100%" stroke="#E7E5E4" strokeWidth="1"></line>
                    </svg>
                </div>

                <div className="max-w-5xl mx-auto px-6 relative z-10 w-full grid md:grid-cols-2 gap-12 items-center">
                    <div className="max-w-xl order-2 md:order-1">
                        <p className="text-stone-500 text-sm tracking-widest uppercase mb-6 fade-in font-medium">Hidayah Centre Foundation</p>
                        <h1 className="text-5xl md:text-7xl font-medium tracking-tighter text-stone-900 leading-[1.1] mb-8 fade-in">
                            Learn About Islam for non-Muslims. <br />
                            <span className="text-stone-400">Guidance & Support — <br className="md:hidden" />for your journey.</span>
                        </h1>
                        <div className="fade-in-delay">
                            <p className="text-stone-600 text-lg md:text-xl font-light leading-relaxed max-w-lg mb-10">
                                Hidayah Centre Foundation Bandar Tun Razak (HCFBTR) KL is a trusted Islamic organisation in Malaysia that provides guidance, education, and support for non-Muslims who wish to learn about Islam or revert to Islam. We offer free introductory classes, personal guidance, and assistance with syahadah (declaration of faith) in a respectful and welcoming environment.
                            </p>
                            <Link to="/convert-to-islam-malaysia" className="inline-flex items-center text-sm font-medium text-stone-900 border-b border-stone-900 pb-1 hover:text-stone-600 hover:border-stone-400 transition-all duration-300">
                                Learn about Revert to Islam
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
                            <div className="absolute top-4 -right-4 w-full h-full border border-stone-300 rounded-sm -z-0 hidden md:block"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy Quote */}
            <section className="py-24 md:py-32 bg-white border-y border-stone-100">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <span className="iconify mx-auto text-stone-300 mb-8" data-icon="lucide:quote" data-width="24" data-height="24"></span>
                    <blockquote className="serif-quote text-2xl md:text-4xl text-stone-800 leading-relaxed italic">
                        “Helping you discover the beauty of Islam with knowledge, compassion, and understanding.”
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
                            <h2 className="text-2xl font-medium tracking-tight text-stone-900 mb-8">Islam Classes for Non-Muslims</h2>
                            <div className="space-y-6 text-stone-600 font-light leading-relaxed text-lg">
                                <p>
                                    We provide structured and easy-to-understand Islamic classes specially designed
                                    for non-Muslims. These classes introduce the basic beliefs of Islam, the purpose
                                    of life, and common questions about Islamic practices.
                                </p>
                                <p>
                                    Classes are offered through Hidayah Centre branches across Malaysia and are
                                    conducted in English or Bahasa Melayu, depending on availability.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mt-12 border-t border-stone-200 pt-8">
                                <div>
                                    <h3 className="text-sm font-medium text-stone-900 uppercase tracking-wide mb-2">Languages</h3>
                                    <p className="text-stone-500 text-sm">English, Bahasa Melayu</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-stone-900 uppercase tracking-wide mb-2">Cost</h3>
                                    <p className="text-stone-500 text-sm">Free of Charge (FOC)</p>
                                </div>
                            </div>
                            <div className="mt-8">
                                <Link to="/classes-for-non-muslims" className="text-stone-900 underline hover:text-stone-600">View Class Schedule →</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Professional Experience (Conversion Process) */}
            <section id="process" className="py-24 bg-white border-y border-stone-100">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-baseline mb-16">
                        <h2 className="text-2xl font-medium tracking-tight text-stone-900">Your Journey to Islam</h2>
                        <span className="text-sm text-stone-400 mt-2 md:mt-0">Step by Step</span>
                    </div>

                    <div className="space-y-0">
                        {/* Item 1 */}
                        <div className="group border-l border-stone-200 pl-8 pb-12 relative">
                            <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-stone-300 group-hover:bg-emerald-800/60 transition-colors duration-300"></span>
                            <h3 className="text-lg font-medium text-stone-900 mb-1">Learn & Understand</h3>
                            <p className="text-stone-500 text-sm mb-4">Foundation</p>
                            <p className="text-stone-600 font-light leading-relaxed max-w-2xl">
                                Attend our introductory classes to understand the basic beliefs (Aqidah) and practices of Islam. Ask questions and clarify doubts in a safe, non-judgmental environment.
                            </p>
                        </div>

                        {/* Item 2 */}
                        <div className="group border-l border-stone-200 pl-8 pb-12 relative">
                            <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-stone-300 group-hover:bg-emerald-800/60 transition-colors duration-300"></span>
                            <h3 className="text-lg font-medium text-stone-900 mb-1">Syahadah (Declaration of Faith)</h3>
                            <p className="text-stone-500 text-sm mb-4">Conversion</p>
                            <p className="text-stone-600 font-light leading-relaxed max-w-2xl">
                                Reverting or converting to Islam involves reciting the Syahadah in front of authorised witnesses. Hidayah Centre Foundation provides step-by-step guidance to ensure the process is clear, respectful, and meaningful.
                            </p>
                            <Link to="/shahadah-guidance" className="text-sm mt-2 inline-block text-stone-800 border-b border-stone-300 hover:border-stone-800">Read more about Syahadah</Link>
                        </div>

                        {/* Item 3 */}
                        <div className="group border-l border-stone-200 pl-8 pb-12 relative">
                            <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-stone-300 group-hover:bg-emerald-800/60 transition-colors duration-300"></span>
                            <h3 className="text-lg font-medium text-stone-900 mb-1">New Muslim Support</h3>
                            <p className="text-stone-500 text-sm mb-4">Growth (Mualaf)</p>
                            <p className="text-stone-600 font-light leading-relaxed max-w-2xl">
                                Becoming a Muslim is a meaningful life change. We continue to support new
                                Muslims (Mualaf) through education, counselling, and community connections to help
                                them grow confidently in their new faith.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Consulting Studio (Why Us) */}
            <section id="why-us" className="py-24 bg-stone-100/50">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16">
                        <div>
                            <span className="inline-block py-1 px-3 rounded-full bg-emerald-900/5 text-emerald-900 text-xs font-medium tracking-wide mb-6">About Us</span>
                            <h2 className="text-3xl font-medium tracking-tight text-stone-900 mb-6">Why Choose Hidayah Centre Foundation</h2>
                            <p className="text-stone-600 font-light leading-relaxed mb-8">
                                We are dedicated to providing a supportive and educational environment for everyone interested in Islam.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <span className="iconify text-stone-400 mr-3 mt-1 flex-shrink-0" data-icon="lucide:check"></span>
                                    <span className="text-stone-700 text-sm">Trusted Islamic organisation in Malaysia</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="iconify text-stone-400 mr-3 mt-1 flex-shrink-0" data-icon="lucide:check"></span>
                                    <span className="text-stone-700 text-sm">Free guidance and classes for non-Muslims</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="iconify text-stone-400 mr-3 mt-1 flex-shrink-0" data-icon="lucide:check"></span>
                                    <span className="text-stone-700 text-sm">Experienced and compassionate educators</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="iconify text-stone-400 mr-3 mt-1 flex-shrink-0" data-icon="lucide:check"></span>
                                    <span className="text-stone-700 text-sm">Support before and after syahadah</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white p-10 shadow-sm border border-stone-200 rounded-sm flex flex-col justify-center">
                            <div className="mb-6">
                                <span className="iconify text-stone-800" data-icon="lucide:layers" data-width="32" data-height="32"></span>
                            </div>
                            <h3 className="text-lg font-medium text-stone-900 mb-2">Our Mission - Convey Islam, Empower the Mualaf</h3>
                            <p className="text-stone-500 text-sm font-light leading-relaxed">
                                "To share the message of Islam with wisdom and beautiful preaching, and to empower new Muslims to become exemplary believers."
                            </p>
                        </div>
                    </div>
                </div>
            </section>



            {/* Personal Interests (Services) */}
            <section className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-6">
                    <h2 className="text-sm font-medium uppercase tracking-widest text-stone-400 text-center mb-16">Services & Support</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="group">
                            <div className="w-12 h-12 mx-auto bg-stone-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-stone-100 transition-colors">
                                <span className="iconify text-stone-600" data-icon="lucide:book-open" data-width="20" data-height="20"></span>
                            </div>
                            <h4 className="text-sm font-medium text-stone-800">Free Classes</h4>
                        </div>
                        <div className="group">
                            <div className="w-12 h-12 mx-auto bg-stone-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-stone-100 transition-colors">
                                <span className="iconify text-stone-600" data-icon="lucide:heart-handshake" data-width="20" data-height="20"></span>
                            </div>
                            <h4 className="text-sm font-medium text-stone-800">Revert Support</h4>
                        </div>
                        <div className="group">
                            <div className="w-12 h-12 mx-auto bg-stone-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-stone-100 transition-colors">
                                <span className="iconify text-stone-600" data-icon="lucide:users" data-width="20" data-height="20"></span>
                            </div>
                            <h4 className="text-sm font-medium text-stone-800">Community</h4>
                        </div>
                        <div className="group">
                            <div className="w-12 h-12 mx-auto bg-stone-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-stone-100 transition-colors">
                                <span className="iconify text-stone-600" data-icon="lucide:map-pin" data-width="20" data-height="20"></span>
                            </div>
                            <h4 className="text-sm font-medium text-stone-800">Nationwide Branches</h4>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-32 bg-stone-900 text-stone-300">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-6">Contact Us</h2>
                    <p className="text-stone-400 font-light text-lg mb-10 max-w-lg mx-auto">
                        If you are interested in learning about Islam or reverting to Islam, please contact Hidayah Centre Foundation. Our team will be happy to guide you in a respectful and confidential manner.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center">
                        <Link to="/hidayah-centre-branches" className="group bg-stone-800 hover:bg-stone-700 text-white px-8 py-3 rounded text-sm font-medium transition-all duration-300 border border-stone-700 flex items-center gap-2">
                            <span className="iconify" data-icon="lucide:map-pin"></span>
                            Find a Branch Near You
                        </Link>
                    </div>

                    <div className="mt-24 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center text-xs text-stone-500">
                        <p>© {new Date().getFullYear()} Hidayah Centre Foundation. All rights reserved.</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <span>Malaysia</span>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
