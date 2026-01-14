import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function ClassesForNonMuslims() {
    return (
        <main className="animate-fade-in bg-stone-50 select-none">
            <Helmet>
                <title>
                    Islam Classes for Non-Muslims in Malaysia | Learn About Islam – Hidayah Centre Foundation
                </title>

                <meta
                    name="description"
                    content="Hidayah Centre Foundation offers free Islam classes for non-Muslims in Malaysia. Learn about Islamic beliefs, practices, and values in a respectful environment."
                />

                <link
                    rel="canonical"
                    href="https://hcfbtr-brocure-resource.web.app/classes-for-non-muslims"
                />
            </Helmet>

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-white border-b border-stone-100">
                <div className="container mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
                    <div className="animate-fade-in order-2 md:order-1 mt-20">
                        <span className="inline-block py-1 px-3 rounded-full bg-emerald-50 text-emerald-800 text-xs font-medium tracking-wide mb-6 border border-emerald-100">
                            Free & For Everyone
                        </span>
                        <h1 className="text-4xl md:text-5xl font-medium tracking-tighter text-stone-900 leading-[1.1] mb-8">
                            Islam Classes for Non-Muslims in Malaysia
                        </h1>
                        <p className="text-stone-600 text-lg md:text-xl font-light leading-relaxed max-w-lg mb-8">
                            Hidayah Centre Foundation offers structured and welcoming Islam classes
                            specially designed for non-Muslims in Malaysia. These classes provide
                            a clear introduction to Islamic beliefs, values, and practices in a
                            respectful and pressure-free environment.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/hidayah-centre-branches" className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-sm font-medium rounded-sm text-white bg-stone-900 hover:bg-stone-800 transition-colors shadow-sm">
                                Find a Branch
                            </Link>
                        </div>
                    </div>
                    {/* Hero Image */}
                    <div className="order-1 md:order-2 animate-fade-in relative">
                        <div className="aspect-[4/3] bg-stone-100 rounded-sm overflow-hidden shadow-xl border border-stone-100 relative">
                            <img
                                src="class_discussion_circle.png"
                                alt="Diverse Malaysians in a discussion circle"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 md:grayscale hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Who is this for Section */}
            <section className="py-24 bg-stone-50">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-2xl font-medium tracking-tight text-stone-900 mb-4">Who Are These Classes For?</h2>
                        <p className="text-stone-600 font-light text-lg">
                            Our classes are suitable for non-Muslims who are curious about Islam,
                            considering reversion, or simply wish to understand the religion better.
                            There is no obligation to convert, and all questions are welcomed.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { text: "Non-Muslims interested in learning about Islam", icon: "lucide:search" },
                            { text: "Those considering reverting to Islam", icon: "lucide:compass" },
                            { text: "Individuals seeking accurate information about Islamic beliefs", icon: "lucide:book-open" },
                            { text: "Friends or family members of Muslims", icon: "lucide:users" }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-sm shadow-sm border border-stone-100 hover:shadow-md transition-shadow group">
                                <div className="w-10 h-10 bg-stone-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-50 transition-colors">
                                    <span className="iconify text-stone-500 group-hover:text-emerald-700" data-icon={item.icon}></span>
                                </div>
                                <p className="text-stone-700 font-light text-sm leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Curriculum Section - Split View */}
            <section className="py-24 bg-white border-y border-stone-100">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="aspect-[3/4] md:aspect-square bg-stone-200 rounded-sm overflow-hidden shadow-lg relative">
                                <img
                                    src="mentor_teaching.png"
                                    alt="Mentorship Session"
                                    className="w-full h-full object-cover md:grayscale hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-stone-900/80 to-transparent text-white">
                                    <p className="font-mono text-xs tracking-widest uppercase mb-2">Personal Guidance</p>
                                    <p className="font-light">One-on-one sessions specifically tailored to your pace.</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-medium tracking-tight text-stone-900 mb-8">What You Will Learn</h2>
                            <p className="text-stone-600 font-light text-lg mb-8">
                                The classes introduce Islam in a simple and easy-to-understand way,
                                covering essential topics such as:
                            </p>
                            <div className="space-y-6">
                                {[
                                    "Basic beliefs of Islam",
                                    "The concept of God in Islam",
                                    "The role of Prophet Muhammad (peace be upon him)",
                                    "Purpose of life according to Islam",
                                    "Common Islamic practices and values"
                                ].map((topic, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full border border-stone-200 flex items-center justify-center text-xs text-stone-400 mt-1 font-mono">
                                            {idx + 1}
                                        </span>
                                        <div>
                                            <p className="text-stone-700 font-light leading-relaxed">{topic}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Light Grid for Format & Privacy */}
            <section className="py-24 bg-stone-50">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="bg-white p-10 rounded-sm shadow-sm border border-stone-100">
                            <h2 className="text-2xl font-medium tracking-tight text-stone-900 mb-6">Class Format & Language</h2>
                            <p className="text-stone-600 font-light leading-relaxed mb-6">
                                Classes may be conducted in English or Bahasa Melayu, depending on availability.
                                Sessions are guided by trained educators who understand the needs and concerns of non-Muslims.
                            </p>
                            <p className="text-stone-600 font-light leading-relaxed">
                                Classes are available through Hidayah Centre branches across Malaysia and may be conducted in group or one-to-one sessions.
                            </p>
                        </div>

                        <div className="bg-white p-10 rounded-sm shadow-sm border border-stone-100">
                            <h2 className="text-2xl font-medium tracking-tight text-stone-900 mb-6">Respectful & Confidential Environment</h2>
                            <p className="text-stone-600 font-light leading-relaxed">
                                Hidayah Centre Foundation ensures that all learning sessions are conducted respectfully and confidentially.
                                There is no pressure or obligation to convert, and participants are encouraged to take their time.
                            </p>
                        </div>
                    </div>

                    {/* Classes for Conversion */}
                    <div className="mt-12 bg-white p-10 rounded-sm shadow-sm border border-stone-100">
                        <h2 className="text-2xl font-medium tracking-tight text-stone-900 mb-6">Classes for Those Considering Reversion to Islam</h2>
                        <p className="text-stone-600 font-light leading-relaxed mb-6">
                            Many participants attend these classes as part of their journey towards reverting to Islam.
                            If you are considering reversion, you may also refer to our guide on how to revert to Islam in Malaysia.
                        </p>
                        <Link to="/convert-to-islam-malaysia" className="inline-flex items-center text-stone-900 border-b border-stone-900 pb-1 hover:text-stone-600 hover:border-stone-400 transition-all duration-300">
                            How to Revert to Islam
                            <span className="iconify ml-2" data-icon="lucide:arrow-right"></span>
                        </Link>
                    </div>
                </div>
            </section>



            {/* Contact CTA */}
            <section className="py-24 bg-stone-900 text-stone-300">
                <div className="container mx-auto px-6 text-center max-w-3xl">
                    <h2 className="text-3xl font-medium tracking-tight text-white mb-6">Contact Hidayah Centre Foundation</h2>
                    <p className="text-stone-400 font-light text-xl leading-relaxed mb-10">
                        If you are interested in joining Islam classes for non-Muslims or would
                        like more information, please contact <Link to="/" className="text-white underline">Hidayah Centre Foundation</Link>.
                        Our team will be happy to assist you.
                    </p>
                    <Link to="/hidayah-centre-branches" className="btn bg-white text-stone-900 hover:bg-stone-200">
                        Find a Branch
                    </Link>
                </div>
            </section>
        </main>
    );
}
