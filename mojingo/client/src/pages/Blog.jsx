import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Calendar, User } from 'lucide-react'
import { fadeUp, stagger } from '@/lib/animations'
import api from '@/lib/api'

function formatDate(str) {
    return new Date(str).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
    })
}

const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'

function resolveImageUrl(coverImage) {
    if (!coverImage) return ''
    if (coverImage.startsWith('http')) return coverImage
    return `${API_BASE}${coverImage}`
}

// ── Single blog card ─────────────────────────────────────────────
function BlogCard({ post, isExpanded, onToggle, index, isHero }) {
    if (isHero) {
        return (
            <motion.article
                variants={fadeUp}
                custom={index}
                layout
                className="group cursor-pointer mb-12"
                onClick={onToggle}
            >
                {/* Cover image container */}
                <div className="relative rounded-[32px] overflow-hidden mb-6 aspect-[16/10]">
                    {post.coverImage ? (
                        <img
                            src={resolveImageUrl(post.coverImage)}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#FF4F93]/10 to-[#FFD93D]/10 flex items-center justify-center">
                            <span className="text-[#FF4F93]/20 text-7xl font-extrabold select-none">
                                {post.title.charAt(0)}
                            </span>
                        </div>
                    )}
                    
                    {/* Pink arrow button overlay */}
                    <div className="absolute bottom-6 right-6 w-12 h-12 bg-[#FF4F93] rounded-2xl flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>

                {/* Text Content */}
                <div className="px-2">
                    <h2 className="text-[22px] md:text-[26px] font-bold text-[#111111] leading-tight mb-3 group-hover:text-[#FF4F93] transition-colors">
                        {post.title}
                    </h2>
                    
                    <p className="text-[#3D3D3D]/60 text-[15px] md:text-[16px] leading-relaxed mb-4 line-clamp-2">
                        {post.excerpt || post.content.substring(0, 160) + '...'}
                    </p>

                    <div className="flex items-center gap-2 text-[#3D3D3D]/40 text-[13px] font-medium">
                        <div className="w-5 h-5 bg-[#FFD93D]/10 rounded-md flex items-center justify-center">
                            <Calendar size={12} className="text-[#FFB800]" />
                        </div>
                        <span>{formatDate(post.createdAt)}</span>
                    </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden mt-6"
                        >
                            <div className="p-8 bg-[#F9F9F9] rounded-[24px] text-[15px] text-[#3D3D3D]/80 leading-relaxed rich-content">
                                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.article>
        )
    }

    // Horizontal List Layout (Older posts)
    return (
        <motion.article
            variants={fadeUp}
            custom={index}
            layout
            className="group cursor-pointer flex flex-col md:flex-row items-center gap-6 md:gap-10"
            onClick={onToggle}
        >
            {/* Image (Left side) */}
            <div className="relative w-full md:w-[320px] shrink-0 rounded-[24px] overflow-hidden aspect-[16/10] md:h-[200px]">
                {post.coverImage ? (
                    <img
                        src={resolveImageUrl(post.coverImage)}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#FF4F93]/10 to-[#FFD93D]/10 flex items-center justify-center">
                        <span className="text-[#FF4F93]/20 text-5xl font-extrabold select-none">
                            {post.title.charAt(0)}
                        </span>
                    </div>
                )}
                
                {/* Smaller Pink arrow button overlay */}
                <div className="absolute bottom-4 right-4 w-10 h-10 bg-[#FF4F93] rounded-xl flex items-center justify-center shadow-md transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>

            {/* Text Content (Right side) */}
            <div className="flex-1 py-4">
                <h2 className="text-[18px] md:text-[22px] font-bold text-[#111111] leading-tight mb-2 group-hover:text-[#FF4F93] transition-colors">
                    {post.title}
                </h2>
                
                <p className="text-[#3D3D3D]/60 text-[14px] leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt || post.content.substring(0, 140) + '...'}
                </p>

                <div className="flex items-center gap-2 text-[#3D3D3D]/40 text-[12px] font-medium">
                    <div className="w-5 h-5 bg-[#FFD93D]/10 rounded-md flex items-center justify-center">
                        <Calendar size={12} className="text-[#FFB800]" />
                    </div>
                    <span>{formatDate(post.createdAt)}</span>
                </div>
            </div>

            {/* Expanded Content for List Item */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mt-6 w-full"
                    >
                        <div className="p-8 bg-[#F9F9F9] rounded-[24px] text-[15px] text-[#3D3D3D]/80 leading-relaxed rich-content">
                            <div dangerouslySetInnerHTML={{ __html: post.content }} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.article>
    )
}

// ── Main Blog page ───────────────────────────────────────────────
export default function Blog() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [expandedId, setExpandedId] = useState(null)

    useEffect(() => {
        api.get('/blog')
            .then(res => setPosts(res.data))
            .catch(() => setError('Failed to load posts. Please try again.'))
            .finally(() => setLoading(false))
    }, [])

    function handleToggle(id) {
        setExpandedId(prev => prev === id ? null : id)
    }

    return (
        <div className="min-h-screen bg-white">

            {/* Hero */}
            <div className="relative pt-24 pb-16 overflow-hidden">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                    className="max-w-[1000px] mx-auto px-6 text-center relative z-10"
                >
                    <motion.h1 
                        variants={fadeUp} 
                        className="text-[36px] md:text-[52px] font-extrabold text-[#111111] leading-[1.1] mb-6"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Stories, Tips & Real Moments
                    </motion.h1>
                    <motion.p 
                        variants={fadeUp} 
                        className="text-[#3D3D3D]/70 text-[16px] md:text-[18px] leading-relaxed max-w-[700px] mx-auto"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Explore how people use Mojingo to vibe, connect, and create real-life moments — anytime, anywhere.
                    </motion.p>
                </motion.div>
            </div>

            {/* Posts list */}
            <div className="max-w-[1000px] mx-auto px-6 pb-24">

                {/* Loading skeleton */}
                {loading && (
                    <div className="grid md:grid-cols-2 gap-10">
                        {[1, 2].map(i => (
                            <div key={i} className="space-y-6">
                                <div className="aspect-[16/10] bg-gray-100 rounded-[32px] animate-pulse" />
                                <div className="px-2 space-y-3">
                                    <div className="h-8 bg-gray-100 rounded-full w-3/4" />
                                    <div className="h-4 bg-gray-100 rounded-full w-full" />
                                    <div className="h-4 bg-gray-100 rounded-full w-1/4" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="text-center py-20">
                        <p className="text-sm text-[#3D3D3D]/50">{error}</p>
                    </div>
                )}

                {/* Empty */}
                {!loading && !error && posts.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20 flex flex-col items-center justify-center"
                    >
                        <img 
                            src="/logo_mobile.svg" 
                            alt="No blogs found" 
                            className="w-24 h-auto opacity-30 mb-6"
                        />
                        <h3 className="text-xl font-bold text-[#3D3D3D] mb-2">No posts yet</h3>
                        <p className="text-[15px] text-[#3D3D3D]/50 max-w-sm mx-auto">
                            Our team is brewing up some fresh content. Check back soon for new insights and updates!
                        </p>
                    </motion.div>
                )}

                {/* Posts — newest first (server already sorted) */}
                {!loading && !error && posts.length > 0 && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={stagger}
                        className="flex flex-col"
                    >
                        {posts.map((post, index) => (
                            <div key={post.id}>
                                <BlogCard
                                    post={post}
                                    index={index}
                                    isHero={index === 0}
                                    isExpanded={expandedId === post.id}
                                    onToggle={() => handleToggle(post.id)}
                                />
                                {/* Divider line after each post except the last one */}
                                {index < posts.length - 1 && (
                                    <div className="w-full h-px bg-[rgba(190,190,190,0.2)] my-8" />
                                )}
                            </div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    )
}