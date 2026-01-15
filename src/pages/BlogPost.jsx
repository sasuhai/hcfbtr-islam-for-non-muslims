import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getAllDocuments } from '../firebase/firestoreService';
import { useOrganization } from '../context/OrganizationContext';
import './BlogPost.css';

const getPostImage = (post) => {
    if (post.image && (post.image.startsWith('http') || post.image.startsWith('/'))) return post.image;
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
                navigate('/blog');
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
            navigate('/blog');
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
        <div className="blog-post-page bg-stone-50 min-h-screen pb-20">
            <Helmet>
                <title>{post.title} | {orgData?.shortName} Chronicles</title>
                <meta name="description" content={post.excerpt} />
            </Helmet>

            {/* Hero Section */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                <img
                    src={getPostImage(post)}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 max-w-5xl mx-auto">
                    <div className="flex gap-2 mb-4">
                        {post.tags?.map((tag, i) => (
                            <span key={i} className="bg-emerald-600 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-lg">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-md">
                        {post.title}
                    </h1>
                    <div className="flex items-center gap-4 text-stone-200 text-sm md:text-base border-t border-white/20 pt-6">
                        <div className="flex items-center gap-2">
                            <span className="iconify" data-icon="lucide:user" data-width="16"></span>
                            <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="iconify" data-icon="lucide:calendar" data-width="16"></span>
                            <span>{new Date(post.date).toLocaleDateString('en-MY', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <div className="max-w-4xl mx-auto px-6 -mt-10 md:-mt-20 relative z-10">
                <div className="bg-white p-8 md:p-16 rounded-xl shadow-2xl border border-stone-100">
                    <div className="prose prose-stone lg:prose-xl max-w-none">
                        {post.subtitle && (
                            <p className="text-xl md:text-2xl font-serif italic text-stone-600 mb-10 border-l-4 border-stone-300 pl-6">
                                {post.subtitle}
                            </p>
                        )}
                        <div
                            className="blog-content leading-relaxed text-stone-800 break-words space-y-6"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>

                    {/* Share Section */}
                    <div className="mt-16 pt-8 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-stone-500 font-medium">Share this story:</div>
                        <div className="flex gap-4">
                            <button className="w-10 h-10 flex items-center justify-center rounded-full border border-stone-200 hover:bg-stone-50 transition-colors text-stone-600">
                                <span className="iconify" data-icon="lucide:facebook" data-width="20"></span>
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-full border border-stone-200 hover:bg-stone-50 transition-colors text-stone-600">
                                <span className="iconify" data-icon="lucide:twitter" data-width="20"></span>
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-full border border-stone-200 hover:bg-stone-50 transition-colors text-stone-600">
                                <span className="iconify" data-icon="lucide:link" data-width="20"></span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div className="mt-20">
                        <h3 className="text-2xl font-serif font-bold text-stone-900 mb-8 border-b-2 border-stone-200 pb-2 flex items-center gap-3">
                            <span className="w-8 h-8 bg-stone-900 text-white rounded-lg flex items-center justify-center text-sm">R</span>
                            Continue Reading
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedPosts.map(rp => (
                                <Link key={rp.id} to={`/blog/${rp.slug}`} className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100">
                                    <div className="aspect-video overflow-hidden">
                                        <img src={getPostImage(rp)} alt={rp.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="p-4">
                                        <h4 className="font-bold text-stone-900 line-clamp-2 group-hover:text-emerald-700 transition-colors">{rp.title}</h4>
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
