import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllDocuments } from '../firebase/firestoreService';
import './Blog.css';

const getPostImage = (post) => {
    // If it looks like a URL, use it
    if (post.image && (post.image.startsWith('http') || post.image.startsWith('/'))) return post.image;

    // Otherwise rotate through our generated assets
    const images = [
        '/images/blog-student-reading.png',
        '/images/blog-community-volunteers.png',
        '/images/blog-teacher-mentoring.png',
        '/images/blog-youth-group.png',
        '/images/blog-quran-rehal.png',
        '/images/blog-mosque-arch.png',
        '/images/blog-kampung-surau.png',
        '/images/community_gathering.png',
        '/images/students_classroom_learning.png',
        '/images/about-students.png',
        '/images/blog-featured.png',
        '/images/hero-volunteer.png'
    ];

    // Create a hash from the title to ensure consistent but distributed image selection
    let hash = 0;
    const str = post.title || '';
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }

    const index = Math.abs(hash) % images.length;
    return images[index];
};

function Blog() {
    const [blogPosts, setBlogPosts] = useState([]);
    const [selectedTag, setSelectedTag] = useState('semua');

    // Derive tags from posts
    const allTags = ['semua', ...new Set(blogPosts.flatMap(post => post.tags || []))].sort();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch blog posts from Firestore
    useEffect(() => {
        loadBlogPosts();
    }, []);

    const loadBlogPosts = async () => {
        try {
            setLoading(true);
            const posts = await getAllDocuments('blog-posts');

            // Sort posts by date (newest first)
            const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
            setBlogPosts(sortedPosts);
            setError(null);
        } catch (err) {
            console.error('Error loading blog posts:', err);
            setError('Gagal memuatkan artikel. Sila cuba sebentar lagi.');
        } finally {
            setLoading(false);
        }
    };

    const filteredPosts = selectedTag === 'semua'
        ? blogPosts
        : blogPosts.filter(post => post.tags && post.tags.includes(selectedTag));

    const featuredPost = blogPosts.find(post => post.featured);

    return (
        <div className="blog-page">
            {/* Header */}
            <section className="blog-header section-sm">
                <div className="container">
                    <div className="page-header text-center">
                        <h1 className="page-title">Stories & Updates</h1>
                        <p className="page-subtitle">Cerita & Berita</p>
                        <p className="page-description">
                            Ikuti perjalanan kami, baca kisah inspiratif, dan kekal terkini dengan
                            aktiviti dan pencapaian terbaru HCFBTR
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            {featuredPost && (
                <section className="featured-section section-sm">
                    <div className="container">
                        <Link to={`/blog/${featuredPost.slug}`} className="featured-post card">
                            <div className="featured-badge">Featured</div>
                            <div className="featured-content">
                                <div className="featured-image">
                                    <img src="/images/blog-featured.png" alt={featuredPost.title} />
                                </div>
                                <div className="featured-text">
                                    <div className="post-meta">
                                        <span className="post-date">{new Date(featuredPost.date).toLocaleDateString('ms-MY', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                        <span className="post-author">oleh {featuredPost.author}</span>
                                    </div>
                                    <h2 className="featured-title">{featuredPost.title}</h2>
                                    <p className="featured-excerpt">{featuredPost.excerpt}</p>
                                    <div className="post-tags">
                                        {featuredPost.tags.map((tag, index) => (
                                            <span key={index} className="badge">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </section>
            )}

            {/* Tag Filter */}
            <section className="filter-section">
                <div className="container">
                    <div className="tag-filter">
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className={`tag-button ${selectedTag === tag ? 'active' : ''}`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="posts-section section">
                <div className="container">
                    {/* Loading State */}
                    {loading && (
                        <div className="text-center" style={{ padding: '3rem' }}>
                            <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)' }}>
                                📚 Memuatkan artikel... | Loading posts...
                            </p>
                        </div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <div className="text-center" style={{ padding: '3rem' }}>
                            <p style={{ color: 'var(--color-error)', marginBottom: '1rem' }}>
                                {error}
                            </p>
                            <button onClick={loadBlogPosts} className="btn btn-primary">
                                Cuba Lagi | Try Again
                            </button>
                        </div>
                    )}

                    {/* No Posts */}
                    {!loading && !error && blogPosts.length === 0 && (
                        <div className="text-center" style={{ padding: '3rem' }}>
                            <p style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
                                📝 Belum ada artikel yang diterbitkan.
                            </p>
                            <p style={{ color: 'var(--color-text-secondary)' }}>
                                No blog posts have been published yet.
                            </p>
                        </div>
                    )}

                    {/* Posts Grid */}
                    {!loading && !error && blogPosts.length > 0 && (
                        <>
                            <div className="posts-grid">
                                {filteredPosts.map((post) => (
                                    <Link key={post.id} to={`/blog/${post.slug}`} className="post-card card">
                                        <div className="post-image" style={{ backgroundImage: `url(${getPostImage(post)})` }}>
                                        </div>
                                        <div className="post-content">
                                            <div className="post-meta">
                                                <span className="post-date">{new Date(post.date).toLocaleDateString('ms-MY', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                            </div>
                                            <h3 className="post-title">{post.title}</h3>
                                            <p className="post-excerpt">{post.excerpt}</p>
                                            <div className="post-tags">
                                                {post.tags && post.tags.slice(0, 2).map((tag, index) => (
                                                    <span key={index} className="badge">{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {filteredPosts.length === 0 && (
                                <div className="no-posts text-center">
                                    <p>Tiada artikel untuk tag ini buat masa sekarang.</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Blog;
