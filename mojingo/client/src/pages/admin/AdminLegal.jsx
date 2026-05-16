import { useState, useEffect } from 'react'
import { motion, AnimatePresence, Reorder, useDragControls } from 'framer-motion'
import { Plus, Trash2, GripVertical } from 'lucide-react'
import api from '@/lib/api'
import SectionEditor from '@/components/admin/SectionEditor'
import IconPicker from '@/components/admin/IconPicker'
import RichTextEditor from '@/components/ui/RichTextEditor'

const CATEGORIES = [
    { slug: 'security',      label: 'Security Policy & Safety Statement' },
    { slug: 'terms',         label: 'Terms of Service' },
    { slug: 'privacy',       label: 'Privacy Policy' },
    { slug: 'child-safety',  label: 'Child Safety Policy' },
    { slug: 'cookies',       label: 'Cookies Policy' },
]

const BG_PRESETS = [
    '#FFF5F7', '#F0FFF4', '#EFF6FF', '#FEFCE8', '#F5F3FF', '#F9FAFB',
]

function DeleteModal({ onConfirm, onCancel }) {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm px-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
                className="bg-white rounded-[24px] p-8 max-w-sm w-full shadow-2xl">
                <h3 className="text-lg font-bold text-[#3D3D3D] mb-2">Delete this section?</h3>
                <p className="text-sm text-[#3D3D3D]/60 mb-6">All blocks inside it will also be deleted. This cannot be undone.</p>
                <div className="flex gap-3">
                    <button onClick={onCancel} className="flex-1 py-3 rounded-full border border-[rgba(190,190,190,0.4)] text-sm font-semibold text-[#3D3D3D] hover:bg-gray-50 transition-colors">Cancel</button>
                    <button onClick={onConfirm} className="flex-1 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors">Delete</button>
                </div>
            </motion.div>
        </motion.div>
    )
}

function AddSectionForm({ categoryId, onSaved, onCancel }) {
    const [title, setTitle] = useState('')
    const [intro, setIntro] = useState('')
    const [icon, setIcon] = useState('')
    const [iconColor, setIconColor] = useState('#FF4F93')
    const [bgColor, setBgColor] = useState('#FFF5F7')
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')

    async function handleSave() {
        if (!title.trim()) { setError('Title is required'); return }
        setSaving(true); setError('')
        try {
            const res = await api.post('/legal/sections', {
                categoryId, title: title.trim(), intro: intro.trim(),
                icon: icon.trim(), iconColor, bgColor, order: 0
            })
            onSaved(res.data)
        } catch {
            setError('Failed to create section. Please try again.')
        } finally {
            setSaving(false)
        }
    }

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[20px] border-2 border-dashed border-[#FF4F93]/30 p-6 space-y-4">
            <p className="text-sm font-bold text-[#3D3D3D]">New Section</p>

            <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-[#3D3D3D]/40 block mb-1">Title *</label>
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Our Pledge to Your Safety"
                    className="w-full px-4 py-3 rounded-[12px] border border-[rgba(190,190,190,0.4)] focus:border-[#FF4F93] text-sm font-semibold text-[#3D3D3D] outline-none transition-colors" />
            </div>

            <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-[#3D3D3D]/40 block mb-1">Intro Paragraph</label>
                <RichTextEditor
                    value={intro}
                    onChange={setIntro}
                    placeholder="Short intro under the heading..."
                    minHeight={80}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-[#3D3D3D]/40 block mb-1">Lucide Icon</label>
                    <IconPicker 
                        value={icon}
                        onChange={setIcon}
                        placeholder="Search icon..."
                    />
                </div>
                <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-[#3D3D3D]/40 block mb-1">Icon Color</label>
                    <div className="flex items-center gap-2">
                        <input type="color" value={iconColor} onChange={e => setIconColor(e.target.value)}
                            className="w-12 h-[46px] rounded-[12px] border border-[rgba(190,190,190,0.4)] cursor-pointer p-1" />
                        <span className="text-xs text-[#3D3D3D]/40 font-mono">{iconColor}</span>
                    </div>
                </div>
            </div>

            <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-[#3D3D3D]/40 block mb-2">Background Color</label>
                <div className="flex flex-wrap gap-2 items-center">
                    {BG_PRESETS.map(c => (
                        <button key={c} type="button" onClick={() => setBgColor(c)}
                            className={`w-7 h-7 rounded-full border-2 transition-all ${bgColor === c ? 'border-[#FF4F93] scale-110' : 'border-transparent hover:border-gray-300'}`}
                            style={{ backgroundColor: c }} />
                    ))}
                    <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)}
                        className="w-7 h-7 rounded-full cursor-pointer border border-[rgba(190,190,190,0.4)] p-0.5" />
                </div>
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}
            <div className="flex gap-3">
                <button onClick={onCancel} className="px-5 py-2.5 rounded-full border border-[rgba(190,190,190,0.4)] text-sm font-semibold text-[#3D3D3D] hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={handleSave} disabled={saving}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF4F93] hover:bg-[#e03f80] text-white text-sm font-semibold transition-colors disabled:opacity-60">
                    {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Plus size={14} />}
                    Create section
                </button>
            </div>
        </motion.div>
    )
}

function DraggableSection({ section, i, categoryId, handleSectionSaved, setDeleteId }) {
    const controls = useDragControls()
    
    return (
        <Reorder.Item value={section} dragListener={false} dragControls={controls}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: i * 0.05 }}
            className="relative z-10"
        >
            <div 
                className="absolute top-6 left-[-16px] text-[#3D3D3D]/20 cursor-grab active:cursor-grabbing hidden md:block p-1 hover:text-[#3D3D3D]/50 transition-colors rounded"
                onPointerDown={e => controls.start(e)}
            >
                <GripVertical size={16} />
            </div>
            <SectionEditor
                section={section}
                categoryId={categoryId}
                onSaved={handleSectionSaved}
                onDeleted={(id) => setDeleteId(id)}
            />
        </Reorder.Item>
    )
}

export default function AdminLegal() {
    const [activeSlug, setActiveSlug] = useState('security')
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [addingSection, setAddingSection] = useState(false)
    const [deleteId, setDeleteId] = useState(null)

    useEffect(() => {
        fetchAll()
    }, [])

    async function fetchAll() {
        setLoading(true)
        try {
            const res = await api.get('/legal')
            setCategories(res.data)
        } catch {}
        finally { setLoading(false) }
    }

    const activeCategory = categories.find(c => c.slug === activeSlug)
    const sections = (activeCategory?.sections || []).sort((a, b) => a.order - b.order)
    const categoryId = activeCategory?.id

    function handleSectionSaved(updated) {
        setCategories(prev => prev.map(cat =>
            cat.slug === activeSlug
                ? { ...cat, sections: cat.sections.map(s => s.id === updated.id ? { ...s, ...updated } : s) }
                : cat
        ))
    }

    function handleSectionCreated(newSection) {
        setCategories(prev => prev.map(cat =>
            cat.slug === activeSlug
                ? { ...cat, sections: [...(cat.sections || []), { ...newSection, blocks: [] }] }
                : cat
        ))
        setAddingSection(false)
    }

    function handleReorderSections(newOrder) {
        const updatedOrder = newOrder.map((s, i) => ({ ...s, order: i }));
        setCategories(prev => prev.map(cat => 
            cat.slug === activeSlug ? { ...cat, sections: updatedOrder } : cat
        ));
        
        const payload = updatedOrder.map(s => ({ id: s.id, order: s.order }));
        api.put('/legal/reorder/sections', payload).catch(err => {
            console.error('Failed to save section order');
        });
    }

    async function handleDeleteSection(id) {
        try {
            await api.delete(`/legal/sections/${id}`)
            setCategories(prev => prev.map(cat =>
                cat.slug === activeSlug
                    ? { ...cat, sections: cat.sections.filter(s => s.id !== id) }
                    : cat
            ))
            setDeleteId(null)
        } catch { setDeleteId(null) }
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-extrabold text-[#3D3D3D]">Legal Pages</h1>
                <p className="text-sm text-[#3D3D3D]/50 mt-1">
                    Manage sections and content for each legal policy page.
                </p>
            </div>

            {/* Category tabs */}
            <div className="flex gap-2 mb-8 border-b border-[rgba(190,190,190,0.2)] pb-0">
                {CATEGORIES.map(cat => (
                    <button key={cat.slug} onClick={() => { setActiveSlug(cat.slug); setAddingSection(false) }}
                        className={`px-5 py-3 text-sm font-semibold transition-colors border-b-2 -mb-px
                            ${activeSlug === cat.slug
                                ? 'border-[#FF4F93] text-[#FF4F93]'
                                : 'border-transparent text-[#3D3D3D]/50 hover:text-[#3D3D3D]'}`}>
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Loading */}
            {loading && (
                <div className="flex flex-col gap-4 animate-pulse">
                    {[1, 2].map(i => (
                        <div key={i} className="bg-white rounded-[20px] border border-[rgba(190,190,190,0.2)] p-5 h-20" />
                    ))}
                </div>
            )}

            {/* Sections list */}
            {!loading && (
                <div className="flex flex-col gap-4">
                    {sections.length === 0 && !addingSection && (
                        <div className="text-center py-12 bg-white rounded-[20px] border border-[rgba(190,190,190,0.2)]">
                            <p className="text-sm text-[#3D3D3D]/40 mb-2">No sections yet for this page.</p>
                            <p className="text-xs text-[#3D3D3D]/30">Click "Add section" below to get started.</p>
                        </div>
                    )}

                    <Reorder.Group axis="y" values={sections} onReorder={handleReorderSections} className="flex flex-col gap-4">
                        <AnimatePresence>
                            {sections.map((section, i) => (
                                <DraggableSection
                                    key={section.id}
                                    section={section}
                                    i={i}
                                    categoryId={categoryId}
                                    handleSectionSaved={handleSectionSaved}
                                    setDeleteId={setDeleteId}
                                />
                            ))}
                        </AnimatePresence>
                    </Reorder.Group>

                    {/* Add section form */}
                    {addingSection && categoryId && (
                        <AddSectionForm
                            categoryId={categoryId}
                            onSaved={handleSectionCreated}
                            onCancel={() => setAddingSection(false)}
                        />
                    )}

                    {/* Add section button */}
                    {!addingSection && (
                        <button onClick={() => setAddingSection(true)}
                            className="flex items-center justify-center gap-2 w-full py-4 rounded-[20px] border-2 border-dashed border-[rgba(190,190,190,0.3)] text-sm font-semibold text-[#3D3D3D]/40 hover:border-[#FF4F93]/40 hover:text-[#FF4F93] transition-colors">
                            <Plus size={16} /> Add section
                        </button>
                    )}
                </div>
            )}

            <AnimatePresence>
                {deleteId && (
                    <DeleteModal
                        onConfirm={() => handleDeleteSection(deleteId)}
                        onCancel={() => setDeleteId(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}