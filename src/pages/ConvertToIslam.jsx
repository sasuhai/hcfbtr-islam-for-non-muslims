import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function ConvertToIslam() {
    return (
        <main className="animate-fade-in">
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

            <div className="container" style={{ paddingBottom: '60px' }}>
                <div className="hero" style={{ paddingBottom: '40px' }}>
                    {/* H1 */}
                    <h1>Convert to Islam in Malaysia</h1>

                    <p>
                        Converting to Islam is a personal and meaningful decision. In Malaysia, the
                        process involves learning the basic beliefs of Islam and performing the
                        syahadah (declaration of faith) with proper guidance. Hidayah Centre Foundation
                        provides trusted, compassionate, and confidential support for non-Muslims.
                    </p>
                </div>

                <div className="section card">
                    {/* Meaning */}
                    <h2>What Does It Mean to Convert to Islam?</h2>

                    <p>
                        Converting to Islam means believing in the Oneness of Allah and accepting
                        Prophet Muhammad (peace be upon him) as the final messenger of God. This
                        belief is declared through the syahadah.
                    </p>

                    <p>
                        Islam encourages understanding and sincerity. Individuals are encouraged to
                        learn and ask questions before making this important decision.
                    </p>
                </div>

                <div className="section">
                    {/* Steps */}
                    <h2>How to Convert to Islam in Malaysia</h2>

                    <ol style={{ lineHeight: '2', paddingLeft: '20px' }}>
                        <li>
                            <strong>Learn About Islam</strong><br />
                            Attend classes or one-to-one sessions to understand the basic beliefs and
                            practices of Islam.
                        </li>
                        <li>
                            <strong>Seek Guidance</strong><br />
                            Meet with qualified educators or counsellors from Hidayah Centre Foundation.
                        </li>
                        <li>
                            <strong>Recite the Syahadah</strong><br />
                            Declare the syahadah in front of authorised witnesses when you are ready.
                        </li>
                        <li>
                            <strong>Official Registration</strong><br />
                            Assistance is provided according to Malaysian procedures.
                        </li>
                        <li>
                            <strong>Ongoing Support</strong><br />
                            Continue learning and receive community support after conversion.
                        </li>
                    </ol>
                </div>

                <div className="section card">
                    {/* Syahadah */}
                    <h2>What Is Syahadah?</h2>

                    <p>
                        Syahadah is the declaration of faith in Islam. By sincerely reciting the
                        syahadah, a person becomes a Muslim. Hidayah Centre Foundation ensures that
                        individuals understand its meaning before proceeding.
                    </p>
                    <div style={{ background: '#f5f5f7', padding: '20px', borderRadius: '12px', marginTop: '20px', fontFamily: 'serif', fontStyle: 'italic', textAlign: 'center' }}>
                        "Ash-hadu an la ilaha illa Allah, wa ash-hadu anna Muhammadan Rasulullah."
                        <br />
                        (I bear witness that there is no god but Allah, and I bear witness that Muhammad is the Messenger of Allah.)
                    </div>
                </div>

                <div className="section">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div>
                            {/* Classes */}
                            <h3>
                                <Link to="/classes-for-non-muslims" style={{ color: 'inherit', textDecoration: 'none' }}>
                                    Classes for Non-Muslims
                                </Link>
                            </h3>

                            <p>
                                We offer free classes designed for non-Muslims who are interested in learning
                                about Islam or preparing to convert. These classes are conducted in a respectful
                                and welcoming environment.
                            </p>
                            <Link to="/classes-for-non-muslims">More about classes →</Link>
                        </div>
                        <div>
                            {/* Support */}
                            <h3>Support for New Muslims</h3>

                            <p>
                                After converting to Islam, new Muslims may face various challenges. Our team
                                continues to provide education, counselling, and community support to ensure
                                a smooth transition.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="section card">
                    {/* Why Us */}
                    <h2>Why Choose Hidayah Centre Foundation?</h2>

                    <ul>
                        <li>Trusted Islamic organisation in Malaysia</li>
                        <li>Experienced and compassionate educators</li>
                        <li>Free guidance and learning resources</li>
                        <li>Confidential and respectful approach</li>
                        <li>Support before and after conversion</li>
                    </ul>
                </div>

                <div className="section" style={{ borderTop: '1px solid #e5e5e5', paddingTop: '40px' }}>
                    {/* Malay Section */}
                    <h2>Maklumat Masuk Islam di Malaysia</h2>

                    <p>
                        Proses masuk Islam di Malaysia melibatkan pembelajaran asas Islam dan
                        melafazkan syahadah dengan bimbingan yang betul. Hidayah Centre Foundation
                        menyediakan kelas Islam dan sokongan berterusan kepada saudara baru
                        (mualaf).
                    </p>
                </div>

                <div className="section card">
                    <h2>Frequently Asked Questions About Converting to Islam in Malaysia</h2>

                    <div className="faq-item">
                        <h3>Is it free to convert to Islam in Malaysia?</h3>
                        <p>
                            Yes. Converting to Islam in Malaysia is free. Hidayah Centre Foundation
                            provides guidance, classes, and syahadah assistance at no cost.
                        </p>
                    </div>

                    <div className="faq-item">
                        <h3>Do I need to attend classes before converting to Islam?</h3>
                        <p>
                            Attending classes is not compulsory, but it is highly encouraged.
                            Classes help non-Muslims understand the basic beliefs and practices
                            of Islam before performing the syahadah.
                        </p>
                    </div>

                    <div className="faq-item">
                        <h3>What is syahadah?</h3>
                        <p>
                            Syahadah is the declaration of faith in Islam. By sincerely reciting
                            the syahadah and believing in its meaning, a person becomes a Muslim.
                        </p>
                    </div>

                    <div className="faq-item">
                        <h3>Can non-Muslims learn about Islam without converting?</h3>
                        <p>
                            Yes. Hidayah Centre Foundation welcomes non-Muslims who simply want
                            to learn about Islam without any pressure to convert.
                        </p>
                    </div>

                    <div className="faq-item">
                        <h3>Is my decision to convert kept confidential?</h3>
                        <p>
                            Yes. All enquiries and guidance sessions are handled respectfully
                            and confidentially by Hidayah Centre Foundation.
                        </p>
                    </div>

                    <div className="faq-item">
                        <h3>What support is available after converting to Islam?</h3>
                        <p>
                            New Muslims receive continued support including education, counselling,
                            and community assistance to help them adjust and grow in their faith.
                        </p>
                    </div>

                    <div className="faq-item">
                        <h3>Do I need to change my name?</h3>
                        <p>
                            Not necessarily. If your original name carries a good meaning, it can be retained.
                        </p>
                    </div>

                    <div className="faq-item">
                        <h3>What about my relationship with my family?</h3>
                        <p>
                            Islam enjoins us to treat parents and family members with kindness and respect,
                            even if they are of a different faith.
                        </p>
                    </div>
                </div>

                <div className="section hero">
                    {/* CTA */}
                    <h2>Contact Hidayah Centre Foundation</h2>

                    <p>
                        If you are considering converting to Islam or would like to learn more, please
                        contact Hidayah Centre Foundation. Our team is ready to assist you with
                        guidance and support.
                    </p>
                    <Link to="/hidayah-centre-branches" className="btn">Contact Us</Link>
                </div>
            </div>
        </main>
    );
}
