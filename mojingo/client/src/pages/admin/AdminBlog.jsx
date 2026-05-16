import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, Eye, EyeOff, RefreshCw } from 'lucide-react'
import api from '@/lib/api'

function formatDate(str) {
    return new Date(str).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric',
    })
}

function DeleteModal({ post, onConfirm, onCancel }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm px-4"
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-[24px] p-8 max-w-sm w-full shadow-2xl"
            >
                <h3 className="text-lg font-bold text-[#3D3D3D] mb-2">Delete post?</h3>
                <p className="text-sm text-[#3D3D3D]/60 mb-1">
                    <span className="font-semibold">"{post?.title}"</span>
                </p>
                <p className="text-sm text-[#3D3D3D]/60 mb-6">This action cannot be undone.</p>
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-3 rounded-full border border-[rgba(190,190,190,0.4)] text-sm font-semibold text-[#3D3D3D] hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default function AdminBlog() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [deleteTarget, setDeleteTarget] = useState(null)
    const navigate = useNavigate()

    async function fetchPosts() {
        setLoading(true)
        try {
            const res = await api.get('/blog/admin/all')
            setPosts(res.data)
        } catch {
            // handle silently
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchPosts() }, [])

    async function handleTogglePublish(post) {
        try {
            const res = await api.put(`/blog/${post.id}`, { published: !post.published })
            setPosts(prev => prev.map(p => p.id === post.id ? res.data : p))
        } catch {
            // handle silently
        }
    }

    async function handleDelete(id) {
        try {
            await api.delete(`/blog/${id}`)
            setPosts(prev => prev.filter(p => p.id !== id))
            setDeleteTarget(null)
        } catch {
            setDeleteTarget(null)
        }
    }

    const published = posts.filter(p => p.published).length
    const drafts = posts.filter(p => !p.published).length

    return (
        <div className="p-8 max-w-6xl mx-auto">

            {/* Header */}
            <div className="flex items-start justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-extrabold text-[#3D3D3D]">Blog Posts</h1>
                    <p className="text-sm text-[#3D3D3D]/50 mt-1">
                        {published} published · {drafts} draft{drafts !== 1 ? 's' : ''}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchPosts}
                        className="flex items-center gap-2 text-sm text-[#3D3D3D]/50 hover:text-[#FF4F93] transition-colors"
                    >
                        <RefreshCw size={15} />
                        Refresh
                    </button>
                    <button
                        onClick={() => navigate('/admin/blog/new')}
                        className="flex items-center gap-2 bg-[#FF4F93] hover:bg-[#e03f80] text-white text-sm font-semibold rounded-full px-5 py-2.5 transition-colors"
                    >
                        <Plus size={16} />
                        New Post
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[24px] border border-[rgba(190,190,190,0.2)] overflow-hidden shadow-sm">

                {/* Table header */}
                <div className="grid grid-cols-[3fr_1.5fr_1fr_1fr_auto] gap-4 px-6 py-4 bg-gray-50 border-b border-[rgba(190,190,190,0.2)]">
                    {['Title', 'Category', 'Status', 'Date', 'Actions'].map(h => (
                        <p key={h} className="text-xs font-semibold uppercase tracking-widest text-[#3D3D3D]/40">{h}</p>
                    ))}
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex flex-col divide-y divide-[rgba(190,190,190,0.1)]">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="grid grid-cols-[3fr_1.5fr_1fr_1fr_auto] gap-4 px-6 py-4 animate-pulse">
                                <div className="h-4 bg-gray-100 rounded-full w-3/4" />
                                <div className="h-4 bg-gray-100 rounded-full w-full" />
                                <div className="h-4 bg-gray-100 rounded-full w-2/3" />
                                <div className="h-4 bg-gray-100 rounded-full w-full" />
                                <div className="h-4 bg-gray-100 rounded-full w-8" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty */}
                {!loading && posts.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <p className="text-sm text-[#3D3D3D]/40">No posts yet</p>
                        <button
                            onClick={() => navigate('/admin/blog/new')}
                            className="flex items-center gap-2 bg-[#FF4F93] text-white text-sm font-semibold rounded-full px-5 py-2.5"
                        >
                            <Plus size={16} /> Create your first post
                        </button>
                    </div>
                )}

                {/* Rows */}
                {!loading && posts.length > 0 && (
                    <div className="flex flex-col divide-y divide-[rgba(190,190,190,0.1)]">
                        {posts.map(post => (
                            <div
                                key={post.id}
                                className="grid grid-cols-[3fr_1.5fr_1fr_1fr_auto] gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors"
                            >
                                {/* Title */}
                                <p className="text-sm font-semibold text-[#3D3D3D] truncate">{post.title}</p>

                                {/* Category */}
                                <p className="text-sm text-[#3D3D3D]/60 truncate">{post.category}</p>

                                {/* Status badge */}
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold w-fit
                  ${post.published
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-100 text-gray-500'
                                    }`}
                                >
                                    {post.published ? 'Published' : 'Draft'}
                                </span>

                                {/* Date */}
                                <p className="text-xs text-[#3D3D3D]/40">{formatDate(post.createdAt)}</p>

                                {/* Actions */}
                                <div className="flex items-center gap-1">
                                    {/* Toggle publish */}
                                    <button
                                        title={post.published ? 'Unpublish' : 'Publish'}
                                        onClick={() => handleTogglePublish(post)}
                                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors
                      ${post.published
                                                ? 'hover:bg-yellow-50 text-yellow-500'
                                                : 'hover:bg-green-50 text-green-500'
                                            }`}
                                    >
                                        {post.published ? <EyeOff size={15} /> : <Eye size={15} />}
                                    </button>

                                    {/* Edit */}
                                    <button
                                        title="Edit"
                                        onClick={() => navigate(`/admin/blog/edit/${post.id}`)}
                                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#FF4F93]/10 text-[#FF4F93] transition-colors"
                                    >
                                        <Pencil size={15} />
                                    </button>

                                    {/* Delete */}
                                    <button
                                        title="Delete"
                                        onClick={() => setDeleteTarget(post)}
                                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-50 text-red-400 transition-colors"
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <AnimatePresence>
                {deleteTarget && (
                    <DeleteModal
                        post={deleteTarget}
                        onConfirm={() => handleDelete(deleteTarget.id)}
                        onCancel={() => setDeleteTarget(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}