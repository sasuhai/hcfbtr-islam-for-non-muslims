import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";

export default function BranchDetail() {
    const { city } = useParams();

    // Helper to capitalize city name found in slug
    const formatCityName = (slug) => {
        return slug
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const cityName = city ? formatCityName(city) : "Malaysia";

    return (
        <main className="animate-fade-in bg-stone-50 text-stone-700 dark:bg-black dark:text-stone-300 min-h-screen">
            {/* Meta Tags */}
            <Helmet>
                <title>
                    Hidayah Centre {cityName} | Convert to Islam & Islam Classes
                </title>

                <meta
                    name="description"
                    content={`Find Hidayah Centre branch in ${cityName}. Attend Islam classes, receive guidance, and convert to Islam with support from our trusted centre.`}
                />

                <link
                    rel="canonical"
                    href={`https://hcfbtr-convert.web.app/branches/${city}`}
                />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LocalBusiness",
                        "name": `Hidayah Centre ${cityName}`,
                        "image": "https://hcfbtr-convert.web.app/logo.png",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "123 Jalan Example",
                            "addressLocality": cityName,
                            "postalCode": "50000",
                            "addressCountry": "MY"
                        },
                        "telephone": "+60 12-345 6789",
                        "url": `https://hcfbtr-convert.web.app/branches/${city}`
                    })}
                </script>
            </Helmet>

            <div className="container" style={{ paddingBottom: '60px' }}>
                <div className="hero" style={{ paddingBottom: '40px' }}>
                    {/* Page Heading */}
                    <h1 className="text-stone-900 dark:text-white">Hidayah Centre {cityName}</h1>

                    <p>
                        Welcome to Hidayah Centre {cityName}. We are dedicated to providing
                        guidance, free Islam classes, and support for the local community.
                    </p>
                </div>

                <div className="section card bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-8 rounded-sm shadow-sm">
                    <h2>Services at {cityName} Branch</h2>
                    <ul>
                        <li>Free Islam classes for non-Muslims in {cityName}</li>
                        <li>Guidance for converting to Islam (Syahadah)</li>
                        <li>Support for new Muslims (Mualaf)</li>
                        <li>Community activities and events</li>
                    </ul>
                </div>

                <div className="section">
                    <h2 className="text-stone-900 dark:text-white">Contact & Location</h2>
                    <p className="text-stone-600 dark:text-stone-400">
                        To visit or contact our {cityName} branch, please refer to the general
                        contact information or visit our main office for referral.
                    </p>
                    <p className="text-stone-500 dark:text-stone-500 italic">
                        <em>(Specific address and contact details for {cityName} would be listed here)</em>
                    </p>
                    <Link to="/hidayah-centre-branches" className="btn btn-primary inline-block transition-all">Back to All Branches</Link>
                </div>

                <div className="section card bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-8 rounded-sm shadow-sm">
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
                    </ul>
                </div>
            </div>
        </main>
    );
}
