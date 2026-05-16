import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save, EyeOff } from 'lucide-react'
import api from '@/lib/api'
import RichTextEditor from '@/components/ui/RichTextEditor'

function generateSlug(title) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
}

// Character counter for SEO fields
function CharCount({ value, max }) {
    const len = value?.length || 0
    return (
        <span className={`text-xs ml-auto tabular-nums ${len > max ? 'text-red-500' : 'text-[#3D3D3D]/40'}`}>
            {len}/{max}
        </span>
    )
}

const CATEGORIES = ['General', 'Product', 'Growth', 'Design', 'Engineering', 'News']

export default function AdminBlogEditor() {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEditing = Boolean(id)

    const [form, setForm] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        coverImage: '',
        category: 'General',
        author: 'Mojingo Team',
        metaTitle: '',           // NEW — SEO
        metaDescription: '',     // NEW — SEO
        published: false,
    })
    const [imageFile, setImageFile] = useState(null)
    const [imagePreview, setImagePreview] = useState('')
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [fetchLoading, setFetchLoading] = useState(isEditing)
    const [serverError, setServerError] = useState('')
    const [slugManual, setSlugManual] = useState(false)

    // If editing — fetch existing post data
    useEffect(() => {
        if (!isEditing) return

        api.get('/blog/admin/all')
            .then(res => {
                const post = res.data.find(p => p.id === id)
                if (!post) { navigate('/admin/blog'); return }
                setForm({
                    title: post.title || '',
                    slug: post.slug || '',
                    excerpt: post.excerpt || '',
                    content: post.content || '',
                    coverImage: post.coverImage || '',
                    category: post.category || 'General',
                    author: post.author || 'Mojingo Team',
                    metaTitle: post.metaTitle || '',   // NEW
                    metaDescription: post.metaDescription || '',   // NEW
                    published: post.published || false,
                })
                if (post.coverImage) {
                    const baseUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'
                    setImagePreview(
                        post.coverImage.startsWith('http')
                            ? post.coverImage
                            : `${baseUrl}${post.coverImage}`
                    )
                }
                setSlugManual(true)
            })
            .catch(() => navigate('/admin/blog'))
            .finally(() => setFetchLoading(false))
    }, [id, isEditing, navigate])

    function handleChange(e) {
        const { name, value, type, checked } = e.target
        const newValue = type === 'checkbox' ? checked : value

        setForm(prev => {
            const updated = { ...prev, [name]: newValue }
            if (name === 'title' && !slugManual) {
                updated.slug = generateSlug(value)
                // Also auto-populate metaTitle from title (only on new posts)
                if (!isEditing) {
                    updated.metaTitle = value.slice(0, 60)
                }
            }
            return updated
        })

        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    }

    function handleFileChange(e) {
        const file = e.target.files[0]
        if (!file) return
        setImageFile(file)
        setImagePreview(URL.createObjectURL(file))
        if (errors.coverImage) setErrors(prev => ({ ...prev, coverImage: '' }))
    }

    function handleSlugChange(e) {
        setSlugManual(true)
        setForm(prev => ({ ...prev, slug: e.target.value }))
        if (errors.slug) setErrors(prev => ({ ...prev, slug: '' }))
    }

    function validate() {
        const e = {}
        if (!form.title.trim()) e.title = 'Title is required'
        if (!form.slug.trim()) e.slug = 'Slug is required'
        const plainContent = form.content.replace(/<[^>]*>/g, '').trim()
        if (!plainContent) e.content = 'Content is required'
        return e
    }

    async function handleSave(e) {
        e.preventDefault()
        setServerError('')
        const errs = validate()
        if (Object.keys(errs).length) { setErrors(errs); return }

        setLoading(true)

        const formData = new FormData()
        formData.append('title', form.title)
        formData.append('slug', form.slug)
        formData.append('excerpt', form.excerpt)
        formData.append('content', form.content)
        formData.append('category', form.category)
        formData.append('author', form.author)
        formData.append('published', form.published)
        formData.append('metaTitle', form.metaTitle)       // NEW
        formData.append('metaDescription', form.metaDescription) // NEW

        if (imageFile) {
            formData.append('coverImage', imageFile)
        } else if (form.coverImage) {
            formData.append('coverImage', form.coverImage)
        }

        try {
            if (isEditing) {
                await api.put(`/blog/${id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
            } else {
                await api.post('/blog', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
            }
            navigate('/admin/blog')
        } catch (err) {
            setServerError(err.response?.data?.message || 'Failed to save. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    // Shared input class — unchanged from original
    const inputClass = (hasError) => `w-full px-5 py-3.5 rounded-[14px] border text-sm text-[#3D3D3D] outline-none transition-colors bg-white ${hasError
        ? 'border-red-400'
        : 'border-[rgba(190,190,190,0.4)] focus:border-[#FF4F93]'
        }`

    if (fetchLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="w-6 h-6 border-2 border-[#FF4F93]/30 border-t-[#FF4F93] rounded-full animate-spin" />
            </div>
        )
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">

            {/* ── Header ─────────────────────────────── */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate('/admin/blog')}
                    className="w-9 h-9 rounded-full flex items-center justify-center border border-[rgba(190,190,190,0.4)] hover:border-[#FF4F93] hover:text-[#FF4F93] transition-colors"
                >
                    <ArrowLeft size={16} />
                </button>
                <div>
                    <h1 className="text-2xl font-extrabold text-[#3D3D3D]">
                        {isEditing ? 'Edit Post' : 'New Post'}
                    </h1>
                    <p className="text-sm text-[#3D3D3D]/50 mt-0.5">
                        {isEditing ? `Editing: ${form.title}` : 'Create a new blog post'}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSave} className="flex flex-col gap-6" noValidate>

                {/* ── Title ──────────────────────────── */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#3D3D3D]">Title *</label>
                    <input
                        name="title"
                        type="text"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Enter post title..."
                        className={inputClass(errors.title)}
                    />
                    {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
                </div>

                {/* ── Slug ───────────────────────────── */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#3D3D3D]">
                        Slug *
                        <span className="ml-2 text-xs text-[#3D3D3D]/40 font-normal">(auto-generated from title)</span>
                    </label>
                    <div className={`flex items-center rounded-[14px] border transition-colors overflow-hidden bg-white focus-within:border-[#FF4F93] ${errors.slug ? 'border-red-400' : 'border-[rgba(190,190,190,0.4)]'
                        }`}>
                        <span className="px-4 py-3.5 text-sm text-[#3D3D3D]/40 bg-gray-50 border-r border-[rgba(190,190,190,0.2)] whitespace-nowrap select-none">
                            /blog/
                        </span>
                        <input
                            name="slug"
                            type="text"
                            value={form.slug}
                            onChange={handleSlugChange}
                            placeholder="post-url-slug"
                            className="flex-1 px-4 py-3.5 text-sm text-[#3D3D3D] outline-none bg-transparent"
                        />
                    </div>
                    {errors.slug && <p className="text-xs text-red-500">{errors.slug}</p>}
                </div>

                {/* ── Category + Author ──────────────── */}
                <div className="grid sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-[#3D3D3D]">Category</label>
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className={inputClass(false)}
                        >
                            {CATEGORIES.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-[#3D3D3D]">Author</label>
                        <input
                            name="author"
                            type="text"
                            value={form.author}
                            onChange={handleChange}
                            placeholder="Author name"
                            className={inputClass(false)}
                        />
                    </div>
                </div>

                {/* ── Cover Image ────────────────────── */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#3D3D3D]">Cover Image</label>
                    <div className="flex flex-col gap-3">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            id="cover-image-upload"
                        />
                        <label
                            htmlFor="cover-image-upload"
                            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-[14px] border border-dashed border-[rgba(190,190,190,0.6)] hover:border-[#FF4F93] hover:bg-[#FF4F93]/5 text-sm text-[#3D3D3D]/60 cursor-pointer transition-all"
                        >
                            {imageFile ? 'Change Image' : 'Upload Cover Image'}
                        </label>

                        {imagePreview && (
                            <div className="relative rounded-[14px] overflow-hidden h-48 bg-gray-100 border border-[rgba(190,190,190,0.2)]">
                                <img
                                    src={imagePreview}
                                    alt="Cover preview"
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setImageFile(null)
                                        setImagePreview('')
                                        setForm(prev => ({ ...prev, coverImage: '' }))
                                    }}
                                    className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-colors"
                                >
                                    <EyeOff size={14} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Excerpt ────────────────────────── */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#3D3D3D]">
                        Excerpt
                        <span className="ml-2 text-xs text-[#3D3D3D]/40 font-normal">(shown on blog list, 1–2 sentences)</span>
                    </label>
                    <RichTextEditor
                        value={form.excerpt}
                        onChange={html => setForm(prev => ({ ...prev, excerpt: html }))}
                        placeholder="A short description of the post..."
                        minHeight={72}
                    />
                </div>

                {/* ── Content ────────────────────────── */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#3D3D3D]">
                        Content *
                        <span className="ml-2 text-xs text-[#3D3D3D]/40 font-normal">(supports bold, italic, bullet lists, tables and inline images)</span>
                    </label>
                    <RichTextEditor
                        value={form.content}
                        onChange={html => {
                            setForm(prev => ({ ...prev, content: html }))
                            if (errors.content) setErrors(prev => ({ ...prev, content: '' }))
                        }}
                        placeholder="Write your full blog post here..."
                        minHeight={360}
                        error={!!errors.content}
                    />
                    {errors.content && <p className="text-xs text-red-500">{errors.content}</p>}
                </div>

                {/* ── SEO Section (NEW) ──────────────── */}
                <div className="flex flex-col gap-5 pt-2 border-t border-[rgba(190,190,190,0.3)]">
                    <div>
                        <p className="text-xs font-bold text-[#3D3D3D]/40 uppercase tracking-widest mt-4 mb-1">
                            SEO / Meta Tags
                        </p>
                        <p className="text-xs text-[#3D3D3D]/40">
                            Controls how this post appears in Google results and social media link previews.
                        </p>
                    </div>

                    {/* Meta Title */}
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center">
                            <label className="text-sm font-semibold text-[#3D3D3D]">Meta Title</label>
                            <CharCount value={form.metaTitle} max={60} />
                        </div>
                        <input
                            name="metaTitle"
                            type="text"
                            value={form.metaTitle}
                            onChange={handleChange}
                            placeholder="Defaults to post title if left empty"
                            className={inputClass(false)}
                        />
                    </div>

                    {/* Meta Description */}
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center">
                            <label className="text-sm font-semibold text-[#3D3D3D]">Meta Description</label>
                            <CharCount value={form.metaDescription} max={160} />
                        </div>
                        <textarea
                            name="metaDescription"
                            rows={3}
                            value={form.metaDescription}
                            onChange={handleChange}
                            placeholder="Short description shown under the title in Google results (max 160 chars)"
                            className={`${inputClass(false)} resize-none`}
                        />
                    </div>

                    {/* Google Preview */}
                    {(form.metaTitle || form.title) && (
                        <div className="rounded-[14px] border border-[rgba(190,190,190,0.4)] p-4 bg-gray-50/60">
                            <p className="text-xs font-semibold text-[#3D3D3D]/40 uppercase tracking-widest mb-3">
                                Google Preview
                            </p>
                            <p className="text-blue-600 text-base font-medium leading-tight truncate">
                                {form.metaTitle || form.title} | Mojingo Blog
                            </p>
                            <p className="text-green-700 text-xs mt-0.5">
                                mojingo.app › blog › {form.slug || 'your-slug'}
                            </p>
                            <p className="text-[#3D3D3D]/60 text-sm mt-1 leading-snug line-clamp-2">
                                {form.metaDescription
                                    || (form.excerpt
                                        ? form.excerpt.replace(/<[^>]*>/g, '')  // strip HTML from excerpt
                                        : 'No description set yet.'
                                    )
                                }
                            </p>
                        </div>
                    )}
                </div>

                {/* ── Published Toggle ───────────────── */}
                <label className="flex items-center gap-4 cursor-pointer select-none pt-2">
                    <div className="relative">
                        <input
                            type="checkbox"
                            name="published"
                            checked={form.published}
                            onChange={handleChange}
                            className="sr-only"
                        />
                        <div className={`w-11 h-6 rounded-full transition-colors ${form.published ? 'bg-[#FF4F93]' : 'bg-gray-200'}`} />
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${form.published ? 'translate-x-5' : ''}`} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-[#3D3D3D]">
                            {form.published ? 'Published' : 'Draft'}
                        </p>
                        <p className="text-xs text-[#3D3D3D]/40">
                            {form.published ? 'Visible on the public blog' : 'Not visible to the public'}
                        </p>
                    </div>
                </label>

                {/* ── Server Error ───────────────────── */}
                {serverError && (
                    <p className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-[12px]">{serverError}</p>
                )}

                {/* ── Actions ────────────────────────── */}
                <div className="flex items-center gap-3 pt-2">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/blog')}
                        className="px-6 py-3 rounded-full border border-[rgba(190,190,190,0.4)] text-sm font-semibold text-[#3D3D3D] hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-[#FF4F93] hover:bg-[#e03f80] text-white font-semibold rounded-full px-8 py-3 text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <><Save size={16} /> {isEditing ? 'Save changes' : 'Create post'}</>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}