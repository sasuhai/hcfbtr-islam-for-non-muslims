import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function ConvertToIslam() {
    return (
        <main className="animate-fade-in bg-stone-50 select-none">
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
                <script type="application/ld+json">
                    {`
                {
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "Is it free to convert to Islam in Malaysia?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. Converting to Islam in Malaysia is free. Hidayah Centre Foundation provides guidance, classes, and syahadah assistance at no cost."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Do I need to attend classes before converting to Islam?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Attending classes is not compulsory, but it is highly encouraged. Classes help non-Muslims understand the basic beliefs and practices of Islam before performing the syahadah."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What is syahadah?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Syahadah is the declaration of faith in Islam. By sincerely reciting the syahadah and believing in its meaning, a person becomes a Muslim."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Can non-Muslims learn about Islam without converting?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. Hidayah Centre Foundation welcomes non-Muslims who simply want to learn about Islam without any pressure to convert."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Is my decision to convert kept confidential?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. All enquiries and guidance sessions are handled respectfully and confidentially by Hidayah Centre Foundation."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What support is available after converting to Islam?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "New Muslims receive continued support including education, counselling, and community assistance to help them adjust and grow in their faith."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Do I need to change my name?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Not necessarily. If your original name carries a good meaning, it can be retained."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What about my relationship with my family?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Islam enjoins us to treat parents and family members with kindness and respect, even if they are of a different faith."
                      }
                    }
                  ]
                }
                `}
                </script>
            </Helmet>

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-white border-b border-stone-100">
                <div className="container mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
                    <div className="animate-fade-in order-2 md:order-1 mt-20">
                        <span className="inline-block py-1 px-3 rounded-full bg-emerald-50 text-emerald-800 text-xs font-medium tracking-wide mb-6 border border-emerald-100">
                            Your Journey Home
                        </span>
                        <h1 className="text-4xl md:text-6xl font-medium tracking-tighter text-stone-900 leading-[1.1] mb-8">
                            Revert to Islam <br /> in Malaysia
                        </h1>
                        <p className="text-stone-600 text-lg md:text-xl font-light leading-relaxed max-w-lg mb-8">
                            Reverting or converting to Islam is a personal and meaningful decision. In Malaysia, the
                            process involves learning the basic beliefs of Islam and performing the
                            syahadah (declaration of faith) with proper guidance. Hidayah Centre Foundation
                            provides trusted, compassionate, and confidential support for non-Muslims.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/hidayah-centre-branches" className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-sm font-medium rounded-sm text-white bg-stone-900 hover:bg-stone-800 transition-colors shadow-sm">
                                Contact Us for Guidance
                            </Link>
                        </div>
                    </div>
                    {/* Hero Image */}
                    <div className="order-1 md:order-2 animate-fade-in relative">
                        <div className="aspect-[4/3] bg-stone-100 rounded-sm overflow-hidden shadow-xl border border-stone-100 relative">
                            <img
                                src="syahadah_ceremony.jpg"
                                alt="Syahadah Ceremony in Malaysia"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 md:grayscale hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* What Does It Mean Section */}
            <section className="py-24 bg-stone-50">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-medium tracking-tight text-stone-900 mb-8">What Does It Mean to Revert to Islam?</h2>
                        <div className="bg-white p-10 rounded-sm shadow-sm border border-stone-100 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                            <p className="text-stone-600 font-light text-xl leading-relaxed mb-6">
                                Reverting to Islam means believing in the Oneness of Allah and accepting
                                Prophet Muhammad (peace be upon him) as the final messenger of God. This
                                belief is declared through the syahadah.
                            </p>
                            <p className="text-stone-500 font-light text-lg">
                                Islam encourages understanding and sincerity. Individuals are encouraged to
                                learn and ask questions before making this important decision.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How to Convert Steps (Timeline style) */}
            <section className="py-24 bg-white border-y border-stone-100">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-medium tracking-tight text-stone-900">How to Revert to Islam in Malaysia</h2>
                    </div>

                    <div className="grid md:grid-cols-5 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-stone-100 -z-10"></div>

                        {[
                            { title: "Learn About Islam", desc: "Attend classes or one-to-one sessions to understand the basic beliefs and practices of Islam." },
                            { title: "Seek Guidance", desc: "Meet with qualified educators or counsellors from Hidayah Centre Foundation." },
                            { title: "Recite the Syahadah", desc: "Declare the syahadah in front of authorised witnesses when you are ready." },
                            { title: "Official Registration", desc: "Assistance is provided according to Malaysian procedures." },
                            { title: "Ongoing Support", desc: "Continue learning and receive community support after conversion." }
                        ].map((step, idx) => (
                            <div key={idx} className="bg-white group">
                                <div className="w-16 h-16 mx-auto bg-stone-50 rounded-full border border-stone-200 flex items-center justify-center text-xl font-serif text-stone-400 mb-6 group-hover:bg-emerald-50 group-hover:text-emerald-600 group-hover:border-emerald-200 transition-colors z-10 relative">
                                    {idx + 1}
                                </div>
                                <h3 className="text-lg font-medium text-stone-900 text-center mb-4">{step.title}</h3>
                                <p className="text-stone-500 font-light text-sm text-center leading-relaxed">{step.desc}</p>
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
                    <h2 className="text-3xl font-medium text-white mb-8">What Is Syahadah?</h2>
                    <p className="text-stone-400 font-light text-xl leading-relaxed mb-12">
                        Syahadah is the declaration of faith in Islam. By sincerely reciting the
                        syahadah, a person becomes a Muslim. Hidayah Centre Foundation ensures that
                        individuals understand its meaning before proceeding.
                    </p>

                    <div className="bg-stone-800/50 backdrop-blur-sm p-8 md:p-12 rounded-sm border border-stone-700">
                        <p className="font-serif italic text-2xl md:text-3xl text-emerald-100/90 leading-relaxed mb-6">
                            "Ash-hadu an la ilaha illa Allah, <br /> wa ash-hadu anna Muhammadan Rasulullah."
                        </p>
                        <p className="text-stone-400 font-light text-sm tracking-wide uppercase">
                            (I bear witness that there is no god but Allah, and I bear witness that Muhammad is the Messenger of Allah.)
                        </p>
                    </div>
                </div>
            </section>

            {/* Support & Classes Grid */}
            <section className="py-24 bg-stone-50">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="bg-white p-10 rounded-sm shadow-lg shadow-stone-200/50 border border-stone-100 flex flex-col items-start justify-between group h-full hover:-translate-y-1 transition-transform duration-300">
                            <div>
                                <div className="w-12 h-12 bg-stone-100 rounded-sm flex items-center justify-center mb-6">
                                    <span className="iconify text-stone-600" data-icon="lucide:book-open"></span>
                                </div>
                                <h3 className="text-2xl font-medium text-stone-900 mb-4">Classes for Non-Muslims</h3>
                                <p className="text-stone-600 font-light leading-relaxed mb-8">
                                    We offer free classes designed for non-Muslims who are interested in learning
                                    about Islam or preparing to convert. These classes are conducted in a respectful
                                    and welcoming environment.
                                </p>
                            </div>
                            <Link to="/classes-for-non-muslims" className="text-stone-900 border-b border-stone-300 hover:border-stone-900 pb-1 transition-colors">
                                More about classes →
                            </Link>
                        </div>
                        <div className="bg-white p-10 rounded-sm shadow-lg shadow-stone-200/50 border border-stone-100 flex flex-col items-start justify-between group h-full hover:-translate-y-1 transition-transform duration-300">
                            <div>
                                <div className="w-12 h-12 bg-stone-100 rounded-sm flex items-center justify-center mb-6">
                                    <span className="iconify text-stone-600" data-icon="lucide:heart-handshake"></span>
                                </div>
                                <h3 className="text-2xl font-medium text-stone-900 mb-4">Support for New Muslims (Mualaf)</h3>
                                <p className="text-stone-600 font-light leading-relaxed mb-8">
                                    After reverting to Islam, Mualaf may face various challenges. Our team
                                    continues to provide education, counselling, and community support to ensure
                                    a smooth transition.
                                </p>
                            </div>
                            <div className="text-stone-400 text-sm">Always here for you</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 bg-white border-y border-stone-100">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="text-3xl font-medium tracking-tight text-stone-900 mb-16">Why Choose Hidayah Centre Foundation?</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        {[
                            "Trusted Islamic organisation in Malaysia",
                            "Experienced and compassionate educators",
                            "Free guidance and learning resources",
                            "Confidential and respectful approach",
                            "Support before and after conversion"
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-start">
                                <span className="iconify text-emerald-600 mr-4 mt-1 flex-shrink-0" data-icon="lucide:check-circle"></span>
                                <span className="text-stone-700 font-light">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-stone-50">
                <div className="container mx-auto px-6 max-w-3xl">
                    <h2 className="text-3xl font-medium tracking-tight text-stone-900 mb-12 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {[
                            { q: "Is it free to revert to Islam in Malaysia?", a: "Yes. Reverting to Islam in Malaysia is free. Hidayah Centre Foundation provides guidance, classes, and syahadah assistance at no cost." },
                            { q: "Do I need to attend classes before reverting to Islam?", a: "Attending classes is not compulsory, but it is highly encouraged. Classes help non-Muslims understand the basic beliefs and practices of Islam before performing the syahadah." },
                            { q: "What is syahadah?", a: "Syahadah is the declaration of faith in Islam. By sincerely reciting the syahadah and believing in its meaning, a person becomes a Muslim." },
                            { q: "Can non-Muslims learn about Islam without reverting?", a: "Yes. Hidayah Centre Foundation welcomes non-Muslims who simply want to learn about Islam without any pressure to convert." },
                            { q: "Is my decision to revert kept confidential?", a: "Yes. All enquiries and guidance sessions are handled respectfully and confidentially by Hidayah Centre Foundation." },
                            { q: "What support is available after reverting to Islam?", a: "New Muslims receive continued support including education, counselling, and community assistance to help them adjust and grow in their faith." },
                            { q: "Do I need to change my name?", a: "Not necessarily. If your original name carries a good meaning, it can be retained." },
                            { q: "What about my relationship with my family?", a: "Islam enjoins us to treat parents and family members with kindness and respect, even if they are of a different faith." }
                        ].map((faq, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-sm border border-stone-200">
                                <h3 className="font-medium text-stone-900 mb-2">{faq.q}</h3>
                                <p className="text-stone-600 font-light text-sm">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* Contact CTA */}
            <section className="py-24 bg-stone-900 text-stone-300">
                <div className="container mx-auto px-6 text-center max-w-3xl">
                    <h2 className="text-3xl font-medium tracking-tight text-white mb-6">Contact Hidayah Centre Foundation</h2>
                    <p className="text-stone-400 font-light text-xl leading-relaxed mb-10">
                        If you are considering reverting to Islam or would like to learn more, please
                        contact Hidayah Centre Foundation. Our team is ready to assist you with
                        guidance and support.
                    </p>
                    <Link to="/hidayah-centre-branches" className="btn bg-white text-stone-900 hover:bg-stone-200">
                        Contact Us
                    </Link>
                </div>
            </section>
        </main>
    );
}
