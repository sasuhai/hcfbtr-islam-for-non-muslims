import { Helmet } from "react-helmet-async";

export default function Shahadah() {
    return (
        <main className="animate-fade-in">
            <Helmet>
                <title>Shahadah Guidance | Hidayah Centre Foundation</title>
                <meta name="description" content="Guidance for reciting the Syahadah and converting to Islam in Malaysia." />
            </Helmet>

            <div className="container" style={{ padding: '80px 0' }}>
                <div className="hero">
                    <h1>Shahadah Guidance</h1>
                    <p>We are here to guide you through your declaration of faith.</p>
                </div>

                <div className="card">
                    <h2>The Process</h2>
                    <p>Our officers will guide you through the understanding and recitation of the Syahadah.</p>
                </div>
            </div>
        </main>
    );
}
