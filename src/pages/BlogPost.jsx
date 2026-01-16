import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getAllDocuments } from '../firebase/firestoreService';
import { useOrganization } from '../context/OrganizationContext';
import './BlogPost.css';

const getPostImage = (post) => {
    // Return uploaded image if it's a URL, path, or base64 data URL
    if (post.image && (post.image.startsWith('http') || post.image.startsWith('/') || post.image.startsWith('data:'))) {
        return post.image;
    }

    // Fallback to default images based on title hash
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
    let hash = 0;
    const str = post.title || '';
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    const index = Math.abs(hash) % images.length;
    return images[index];
};

function BlogPost() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { orgData } = useOrganization();
    const [post, setPost] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        loadPostData();
    }, [slug]);

    const loadPostData = async () => {
        try {
            setLoading(true);
            const allPosts = await getAllDocuments('blog-posts');
            const foundPost = allPosts.find(p => p.slug === slug);

            if (!foundPost) {
                navigate('/journey');
                return;
            }

            setPost(foundPost);

            // Get related posts (excluding current)
            const related = allPosts
                .filter(p => p.id !== foundPost.id && p.published !== false)
                .slice(0, 3);
            setRelatedPosts(related);
        } catch (error) {
            console.error("Error loading post:", error);
            navigate('/journey');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-xl font-medium animate-pulse text-stone-400">Loading Story...</div>
            </div>
        );
    }

    if (!post) return null;

    return (
        <div className="blog-post-page bg-stone-50 dark:bg-stone-950 min-h-screen pb-20">
            <Helmet>
                <title>{post.title} | {orgData?.shortName} Chronicles</title>
                <meta name="description" content={post.excerpt} />
            </Helmet>

            {/* Redesigned Hero Section */}
            <div className="relative w-full bg-black">
                {/* Hero Image Container */}
                <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] max-h-[600px] overflow-hidden">
                    <img
                        src={getPostImage(post)}
                        alt={post.title}
                        className="w-full h-full object-cover object-center"
                        style={{ objectPosition: 'center' }}
                    />
                    {/* Gradient overlay for better text visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                </div>

                {/* Hero Content - Positioned over gradient */}
                <div className="absolute inset-0 flex flex-col justify-end">
                    <div className="max-w-5xl mx-auto w-full px-6 md:px-12 pb-8 md:pb-12">
                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {post.tags.map((tag, i) => (
                                    <span key={i} className="bg-emerald-600 text-white text-[10px] md:text-xs uppercase font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-white mb-4 md:mb-6 leading-tight drop-shadow-2xl">
                            {post.title}
                        </h1>

                        {/* Subtitle if exists */}
                        {post.subtitle && (
                            <p className="text-lg md:text-xl lg:text-2xl text-stone-200 font-serif italic mb-4 md:mb-6 drop-shadow-lg max-w-3xl">
                                {post.subtitle}
                            </p>
                        )}

                        {/* Author and Date - Clear separation with background */}
                        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-stone-100 text-sm md:text-base pt-4 border-t border-white/30">
                            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg">
                                <span className="iconify text-emerald-400" data-icon="lucide:user" data-width="18"></span>
                                <span className="font-medium">{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg">
                                <span className="iconify text-emerald-400" data-icon="lucide:calendar" data-width="18"></span>
                                <span>{new Date(post.date).toLocaleDateString('en-MY', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Article Content - No negative margin overlap */}
            <div className="max-w-4xl mx-auto px-6 pt-12 md:pt-16 relative z-10">
                <div className="bg-white dark:bg-stone-900 p-8 md:p-12 lg:p-16 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800">
                    <div className="prose prose-stone lg:prose-xl max-w-none dark:prose-invert">
                        <div
                            className="blog-content leading-relaxed text-stone-800 dark:text-stone-200 break-words space-y-6"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>

                    {/* Share Section */}
                    <div className="mt-16 pt-8 border-t border-stone-100 dark:border-stone-800 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-stone-500 dark:text-stone-400 font-medium">Share this story:</div>
                        <div className="flex gap-4">
                            <button className="w-10 h-10 flex items-center justify-center rounded-full border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors text-stone-600 dark:text-stone-400">
                                <span className="iconify" data-icon="lucide:facebook" data-width="20"></span>
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-full border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors text-stone-600 dark:text-stone-400">
                                <span className="iconify" data-icon="lucide:twitter" data-width="20"></span>
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-full border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors text-stone-600 dark:text-stone-400">
                                <span className="iconify" data-icon="lucide:link" data-width="20"></span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div className="mt-20">
                        <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-white mb-8 border-b-2 border-stone-200 dark:border-stone-800 pb-2 flex items-center gap-3">
                            <span className="w-8 h-8 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-lg flex items-center justify-center text-sm">R</span>
                            Continue Reading
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedPosts.map(rp => (
                                <Link key={rp.id} to={`/blog/${rp.slug}`} className="group bg-white dark:bg-stone-900 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 dark:border-stone-800">
                                    <div className="aspect-video overflow-hidden">
                                        <img src={getPostImage(rp)} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                    </div>
                                    <div className="p-4">
                                        <h4 className="font-bold text-stone-900 dark:text-white line-clamp-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">{rp.title}</h4>
                                        <div className="mt-2 text-[10px] text-stone-400 font-bold uppercase tracking-widest">
                                            {new Date(rp.date).toLocaleDateString()}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BlogPost;
