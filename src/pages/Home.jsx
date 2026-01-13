import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <main className="animate-fade-in">
            <Helmet>
                <title>
                    Convert to Islam in Malaysia | Classes for Non-Muslims & Syahadah – Hidayah Centre Foundation
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

            <div className="container">
                {/* H1 */}
                <div className="hero">
                    <h1>Convert to Islam in Malaysia – Guidance & Classes for Non-Muslims</h1>

                    <p>
                        Hidayah Centre Foundation is a trusted Islamic organisation in Malaysia that
                        provides guidance, education, and support for non-Muslims who wish to learn
                        about Islam or convert to Islam. We offer free introductory classes, personal
                        guidance, and assistance with syahadah (declaration of faith) in a respectful
                        and welcoming environment.
                    </p>
                    <div style={{ marginTop: '24px' }}>
                        <Link to="/convert-to-islam-malaysia" className="btn">Learn How to Convert</Link>
                    </div>
                </div>

                <div className="section card">
                    {/* Classes Section */}
                    <h2>
                        <Link to="/classes-for-non-muslims" style={{ color: 'inherit', textDecoration: 'none' }}>
                            Islam Classes for Non-Muslims in Malaysia
                        </Link>
                    </h2>

                    <p>
                        We provide structured and easy-to-understand Islamic classes specially designed
                        for non-Muslims. These classes introduce the basic beliefs of Islam, the purpose
                        of life, and common questions about Islamic practices.
                    </p>

                    <p>
                        Classes are offered through Hidayah Centre branches across Malaysia and are
                        conducted in English or Bahasa Melayu, depending on availability.
                    </p>
                    <Link to="/classes-for-non-muslims">View Class Schedule →</Link>
                </div>

                <div className="section">
                    {/* Convert Section */}
                    <h2>How to Convert to Islam (Syahadah)</h2>

                    <p>
                        Converting to Islam involves understanding the basic beliefs of Islam and
                        reciting the syahadah in front of authorised witnesses. Hidayah Centre Foundation
                        provides step-by-step guidance to ensure the process is clear, respectful, and
                        meaningful.
                    </p>
                </div>

                <div className="section card">
                    {/* Support Section */}
                    <h2>Support & Guidance for New Muslims (Mualaf)</h2>

                    <p>
                        Becoming a Muslim is a meaningful life change. We continue to support new
                        Muslims through education, counselling, and community connections to help
                        them grow confidently in their new faith.
                    </p>
                </div>

                <div className="section">
                    {/* Why Us */}
                    <h2>Why Choose Hidayah Centre Foundation</h2>

                    <ul>
                        <li>Trusted Islamic organisation in Malaysia</li>
                        <li>Free guidance and classes for non-Muslims</li>
                        <li>Experienced and compassionate educators</li>
                        <li>Support before and after syahadah</li>
                        <li>Services available across Malaysia</li>
                    </ul>
                </div>

                <div className="section card" style={{ background: '#f0f0f2' }}>
                    {/* Malay SEO Section */}
                    <h2>Maklumat Masuk Islam di Malaysia</h2>

                    <p>
                        Hidayah Centre Foundation menyediakan bimbingan dan kelas Islam untuk bukan
                        Islam yang ingin mengenali Islam atau memeluk agama Islam di Malaysia.
                        Panduan syahadah serta sokongan berterusan untuk saudara baru (mualaf)
                        turut disediakan.
                    </p>
                </div>

                <div className="section hero">
                    {/* CTA */}
                    <h2>Contact Hidayah Centre Foundation</h2>

                    <p>
                        If you are interested in learning about Islam or converting to Islam, please
                        contact Hidayah Centre Foundation. Our team will be happy to guide you in a
                        respectful and confidential manner.
                    </p>
                    <Link to="/hidayah-centre-branches" className="btn">Find a Branch Near You</Link>
                </div>
            </div>
        </main>
    );
}
