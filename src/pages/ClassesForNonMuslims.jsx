import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function ClassesForNonMuslims() {
    return (
        <main className="animate-fade-in">
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

            <div className="container" style={{ paddingBottom: '60px' }}>
                <div className="hero" style={{ paddingBottom: '40px' }}>
                    {/* H1 */}
                    <h1>Islam Classes for Non-Muslims in Malaysia</h1>

                    <p>
                        Hidayah Centre Foundation offers structured and welcoming Islam classes
                        specially designed for non-Muslims in Malaysia. These classes provide
                        a clear introduction to Islamic beliefs, values, and practices in a
                        respectful and pressure-free environment.
                    </p>
                </div>

                <div className="section card">
                    {/* Purpose */}
                    <h2>Who Are These Classes For?</h2>

                    <p>
                        Our classes are suitable for non-Muslims who are curious about Islam,
                        considering conversion, or simply wish to understand the religion better.
                        There is no obligation to convert, and all questions are welcomed.
                    </p>

                    <ul>
                        <li>Non-Muslims interested in learning about Islam</li>
                        <li>Those considering converting to Islam</li>
                        <li>Individuals seeking accurate information about Islamic beliefs</li>
                        <li>Friends or family members of Muslims</li>
                    </ul>
                </div>

                <div className="section">
                    {/* What you learn */}
                    <h2>What You Will Learn</h2>

                    <p>
                        The classes introduce Islam in a simple and easy-to-understand way,
                        covering essential topics such as:
                    </p>

                    <ul>
                        <li>Basic beliefs of Islam</li>
                        <li>The concept of God in Islam</li>
                        <li>The role of Prophet Muhammad (peace be upon him)</li>
                        <li>Purpose of life according to Islam</li>
                        <li>Common Islamic practices and values</li>
                    </ul>
                </div>

                <div className="section card">
                    {/* Format */}
                    <h2>Class Format & Language</h2>

                    <p>
                        Classes may be conducted in English or Bahasa Melayu, depending on
                        availability. Sessions are guided by trained educators who understand
                        the needs and concerns of non-Muslims.
                    </p>

                    <p>
                        Classes are available through Hidayah Centre branches across Malaysia
                        and may be conducted in group or one-to-one sessions.
                    </p>
                </div>

                <div className="section">
                    {/* Relationship to conversion */}
                    <h2>Classes for Those Considering Conversion to Islam</h2>

                    <p>
                        Many participants attend these classes as part of their journey towards
                        converting to Islam. If you are considering conversion, you may also
                        refer to our guide on{" "}
                        <Link to="/convert-to-islam-malaysia">
                            how to convert to Islam in Malaysia
                        </Link>.
                    </p>
                </div>

                <div className="section card">
                    {/* Assurance */}
                    <h2>Respectful & Confidential Environment</h2>

                    <p>
                        Hidayah Centre Foundation ensures that all learning sessions are conducted
                        respectfully and confidentially. There is no pressure or obligation to
                        convert, and participants are encouraged to take their time.
                    </p>
                </div>

                <div className="section" style={{ borderTop: '1px solid #e5e5e5', paddingTop: '40px' }}>
                    {/* Malay Section */}
                    <h2>Kelas Islam untuk Bukan Islam di Malaysia</h2>

                    <p>
                        Hidayah Centre Foundation menyediakan kelas pengenalan Islam untuk
                        bukan Islam di Malaysia. Kelas ini bertujuan memberi kefahaman yang
                        jelas tentang asas Islam dalam suasana yang mesra dan tanpa paksaan.
                    </p>
                </div>

                <div className="section hero">
                    {/* CTA */}
                    <h2>Contact Hidayah Centre Foundation</h2>

                    <p>
                        If you are interested in joining Islam classes for non-Muslims or would
                        like more information, please contact{" "}
                        <Link to="/">Hidayah Centre Foundation</Link>.
                        Our team will be happy to assist you.
                    </p>
                    <Link to="/hidayah-centre-branches" className="btn">Find a Branch</Link>
                </div>
            </div>
        </main>
    );
}
