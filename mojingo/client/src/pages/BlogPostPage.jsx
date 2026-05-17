// src/pages/BlogPostPage.jsx
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import api from '@/lib/api'

function formatDate(d) {
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogPostPage() {
    const { slug } = useParams()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get(`/blog/${slug}`)
            .then(r => setPost(r.data))
            .finally(() => setLoading(false))
    }, [slug])

    if (loading) return (
        <div className="max-w-3xl mx-auto px-6 py-20 animate-pulse space-y-4">
            <div className="h-8 bg-gray-100 rounded w-3/4" />
            <div className="h-4 bg-gray-100 rounded w-1/2" />
            <div className="h-64 bg-gray-100 rounded-2xl" />
        </div>
    )

    if (!post) return (
        <div className="text-center py-32 text-gray-400">Post not found.</div>
    )

    return (
        <>
            {/* ── SEO Meta Tags ── */}
            <Helmet>
                <title>{post.metaTitle || post.title} | Mojingo Blog</title>
                <meta name="description" content={post.metaDescription || post.excerpt} />
                <meta property="og:title" content={post.metaTitle || post.title} />
                <meta property="og:description" content={post.metaDescription || post.excerpt} />
                <meta property="og:image" content={post.coverImage} />
                <meta property="og:url" content={`https://mojingo.app/blog/${post.slug}`} />
                <meta property="og:type" content="article" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={post.metaTitle || post.title} />
                <meta name="twitter:description" content={post.metaDescription || post.excerpt} />
                <meta name="twitter:image" content={post.coverImage} />
                <link rel="canonical" href={`https://mojingo.app/blog/${post.slug}`} />
            </Helmet>

            <article className="max-w-3xl mx-auto px-6 py-12">

                {/* Back link */}
                <Link to="/blog" className="flex items-center gap-2 text-pink-500 text-sm font-semibold mb-8 hover:gap-3 transition-all">
                    <ArrowLeft size={16} /> Back to Blog
                </Link>

                {/* Category + Date */}
                <div className="flex items-center gap-3 mb-4">
                    {post.category && (
                        <span className="bg-pink-100 text-pink-600 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest">
                            {post.category}
                        </span>
                    )}
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Calendar size={12} /> {formatDate(post.createdAt)}
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                    {post.title}
                </h1>

                {/* Author */}
                <div className="flex items-center gap-2 mb-8">
                    <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                        <User size={14} className="text-pink-500" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{post.author}</span>
                </div>

                {/* Cover image */}
                {post.coverImage && (
                    <img src={post.coverImage} alt={post.title}
                        className="w-full rounded-2xl object-cover max-h-[480px] mb-10" />
                )}

                {/* Content — rendered as HTML from TipTap */}
                <div
                    className="prose prose-lg max-w-none
            prose-headings:font-extrabold prose-headings:text-gray-900
            prose-a:text-pink-500 prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-xl prose-img:my-6
            prose-table:border-collapse prose-td:border prose-td:p-3
            prose-th:border prose-th:p-3 prose-th:bg-gray-100
            prose-blockquote:border-l-pink-400 prose-blockquote:text-gray-600"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </article>
        </>
    )
}