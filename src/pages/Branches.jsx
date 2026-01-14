import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function Branches() {
    // Optional: List of city branches (can be dynamic later)
    const cities = [
        { name: "Kuala Lumpur", slug: "kuala-lumpur" },
        { name: "Selangor", slug: "selangor" },
        { name: "Johor", slug: "johor" },
        { name: "Penang", slug: "penang" },
        { name: "Terengganu", slug: "terengganu" },
        { name: "Sabah", slug: "sabah" },
        { name: "Sarawak", slug: "sarawak" },
    ];

    return (
        <main className="animate-fade-in">
            {/* Meta Tags */}
            <Helmet>
                <title>
                    Hidayah Centre Branches in Malaysia | Convert to Islam & Islam Classes
                </title>

                <meta
                    name="description"
                    content="Find Hidayah Centre branches across Malaysia. Attend Islam classes, receive guidance, and convert to Islam with support from our trusted centres."
                />

                <link
                    rel="canonical"
                    href="https://hcfbtr-convert.web.app/branches"
                />
            </Helmet>

            <div className="container" style={{ paddingBottom: '60px' }}>
                <div className="hero" style={{ paddingBottom: '40px' }}>
                    {/* Page Heading */}
                    <h1>Hidayah Centre Branches in Malaysia</h1>

                    <p>
                        Hidayah Centre Foundation has branches across Malaysia to provide guidance,
                        Islam classes for non-Muslims, and support for those considering conversion
                        to Islam (syahadah). Find the nearest branch in your city below.
                    </p>
                </div>

                <div className="section card">
                    {/* List of Branches */}
                    <h2>Our City Branches</h2>
                    <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
                        {cities.map((city) => (
                            <li key={city.slug} style={{ listStyle: 'none', margin: 0 }}>
                                <Link to={`/branches/${city.slug}`} className="btn" style={{ display: 'block', textAlign: 'center', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                                    {city.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="section">
                    {/* Example Branch Section */}
                    <h2>What to Expect at Our Branches</h2>
                    <p>
                        Each branch provides:
                    </p>
                    <ul>
                        <li>Free Islam classes for non-Muslims</li>
                        <li>Step-by-step guidance for conversion (syahadah)</li>
                        <li>Friendly and confidential support</li>
                        <li>Community and post-conversion guidance for new Muslims (mualaf)</li>
                    </ul>
                </div>

                <div className="section card">
                    {/* Internal Links */}
                    <h2>Other Pages You May Find Useful</h2>
                    <ul>
                        <li>
                            <Link to="/">Homepage</Link>
                        </li>
                        <li>
                            <Link to="/convert-to-islam-malaysia">
                                Convert to Islam in Malaysia
                            </Link>
                        </li>
                        <li>
                            <Link to="/classes-for-non-muslims">
                                Islam Classes for Non-Muslims
                            </Link>
                        </li>
                        <li>
                            <Link to="/shahadah-guidance">
                                Shahadah Guidance
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="section" style={{ borderTop: '1px solid var(--border-light)', paddingTop: '40px' }}>
                    {/* Malay SEO Section */}
                    <h2>Cawangan Hidayah Centre di Malaysia</h2>
                    <p>
                        Hidayah Centre Foundation mempunyai cawangan di seluruh Malaysia untuk
                        menyediakan bimbingan, kelas Islam untuk bukan Islam, dan sokongan bagi
                        mereka yang ingin memeluk Islam (syahadah). Cari cawangan terdekat di
                        bandar anda di bawah.
                    </p>
                </div>
            </div>
        </main>
    );
}
