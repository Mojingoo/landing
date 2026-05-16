import { useState } from 'react'
import { Reorder, useDragControls } from 'framer-motion'
import { Save, Trash2, ChevronDown, ChevronUp, Plus, GripVertical } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import api from '@/lib/api'
import { BlockForm } from './BlockBuilder'
import IconPicker from './IconPicker'
import RichTextEditor from '@/components/ui/RichTextEditor'

const BG_PRESETS = [
    { color: '#FFF5F7', label: 'Pink' },
    { color: '#F0FFF4', label: 'Green' },
    { color: '#EFF6FF', label: 'Blue' },
    { color: '#FEFCE8', label: 'Yellow' },
    { color: '#F5F3FF', label: 'Purple' },
    { color: '#F9FAFB', label: 'Gray' },
    { color: '#FFFFFF', label: 'White' },
]

const ICON_SUGGESTIONS = [
    'Shield', 'Lock', 'Users', 'FileText', 'Eye', 'CheckCircle',
    'AlertTriangle', 'Info', 'Mail', 'Phone', 'Globe', 'Star',
    'Heart', 'Zap', 'UserCheck', 'MessageSquare', 'Bell', 'Key'
]

function BlockCard({ block, onDelete, onSaved }) {
    const [isEditing, setIsEditing] = useState(false)
    const controls = useDragControls()
    const Icon = block.icon ? LucideIcons[block.icon] : null
    const content = block.content || {}

    if (isEditing) {
        return (
            <Reorder.Item value={block} id={block.id} dragListener={false} className="relative z-10 my-2">
                <BlockForm 
                    sectionId={block.sectionId} 
                    initialData={block} 
                    onSaved={(updated) => { onSaved(updated); setIsEditing(false) }} 
                    onCancel={() => setIsEditing(false)} 
                />
            </Reorder.Item>
        )
    }

    return (
        <Reorder.Item value={block} id={block.id} dragListener={false} dragControls={controls} className="flex items-start gap-3 p-3 bg-white rounded-[12px] border border-[rgba(190,190,190,0.2)] relative z-10 shadow-sm hover:border-[#FF4F93]/30 transition-colors group">
            <div className="cursor-grab active:cursor-grabbing mt-0.5 shrink-0 p-1 -ml-1 rounded hover:bg-gray-100" onPointerDown={e => controls.start(e)}>
                <GripVertical size={14} className="text-[#3D3D3D]/30" />
            </div>
            <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setIsEditing(true)}>
                <div className="flex items-center gap-2 mb-1">
                    {Icon && <Icon size={14} color={block.iconColor || '#FF4F93'} />}
                    <span className="text-xs font-bold text-[#3D3D3D] group-hover:text-[#FF4F93] transition-colors">{block.title || '—'}</span>
                    <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full text-[#3D3D3D]/40 uppercase tracking-widest">{block.type}</span>
                </div>
                {block.type === 'paragraph' && (
                    <p className="text-xs text-[#3D3D3D]/50 line-clamp-2">{content.text}</p>
                )}
                {block.type === 'bullets' && (
                    <p className="text-xs text-[#3D3D3D]/50">{(content.items || []).length} bullet{(content.items || []).length !== 1 ? 's' : ''}</p>
                )}
            </div>
            <button onClick={() => onDelete(block.id)}
                className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-50 text-red-400 transition-colors shrink-0">
                <Trash2 size={11} />
            </button>
        </Reorder.Item>
    )
}

function DraggableSubSection({ subSec, categoryId, parentId, onSaved, onDeleted }) {
    const controls = useDragControls()
    
    return (
        <Reorder.Item value={subSec} id={subSec.id} dragListener={false} dragControls={controls} className="relative z-10">
            <div 
                className="absolute top-6 left-[-16px] text-[#3D3D3D]/20 cursor-grab active:cursor-grabbing hidden md:block p-1 hover:text-[#3D3D3D]/50 transition-colors rounded"
                onPointerDown={e => controls.start(e)}
            >
                <GripVertical size={16} />
            </div>
            <SectionEditor
                section={subSec}
                categoryId={categoryId}
                parentId={parentId}
                onSaved={onSaved}
                onDeleted={onDeleted}
            />
        </Reorder.Item>
    )
}

export default function SectionEditor({ section, categoryId, parentId = null, onSaved, onDeleted, onSubSectionSaved, onSubSectionDeleted }) {
    const [expanded, setExpanded] = useState(false)
    const [form, setForm] = useState({
        title: section.title || '',
        intro: section.intro || '',
        icon: section.icon || '',
        iconColor: section.iconColor || '#FF4F93',
        bgColor: section.bgColor || '#FFF5F7',
    })
    const [blocks, setBlocks] = useState(section.blocks || [])
    const [subSections, setSubSections] = useState(section.subSections || [])
    const [saving, setSaving] = useState(false)
    const [saveOk, setSaveOk] = useState(false)
    const [addingBlock, setAddingBlock] = useState(false)
    const [addingSubSection, setAddingSubSection] = useState(false)
    const [error, setError] = useState('')

    const PreviewIcon = form.icon ? LucideIcons[form.icon] : null

    async function handleSave() {
        if (!form.title.trim()) { setError('Title is required'); return }
        setSaving(true); setError('')
        try {
            const res = await api.put(`/legal/sections/${section.id}`, {
                title: form.title.trim(),
                intro: form.intro.trim(),
                icon: form.icon.trim(),
                iconColor: form.iconColor,
                bgColor: form.bgColor,
                categoryId,
                parentId: parentId || null
            })
            onSaved(res.data)
            setSaveOk(true)
            setTimeout(() => setSaveOk(false), 2000)
        } catch {
            setError('Failed to save. Please try again.')
        } finally {
            setSaving(false)
        }
    }

    async function handleDeleteBlock(blockId) {
        try {
            await api.delete(`/legal/blocks/${blockId}`)
            setBlocks(prev => prev.filter(b => b.id !== blockId))
        } catch {}
    }

    function handleBlockSaved(block) {
        setBlocks(prev => {
            const exists = prev.find(b => b.id === block.id);
            if (exists) return prev.map(b => b.id === block.id ? { ...b, ...block } : b);
            return [...prev, block];
        });
        setAddingBlock(false);
    }

    function handleReorderBlocks(newOrder) {
        const updatedOrder = newOrder.map((b, i) => ({ ...b, order: i }));
        setBlocks(updatedOrder);
        const payload = updatedOrder.map(b => ({ id: b.id, order: b.order }));
        api.put('/legal/reorder/blocks', payload).catch(err => {
            setError('Failed to save block order.');
        });
    }

    function handleReorderSubSections(newOrder) {
        const updatedOrder = newOrder.map((s, i) => ({ ...s, order: i }));
        setSubSections(updatedOrder);
        const payload = updatedOrder.map(s => ({ id: s.id, order: s.order }));
        api.put('/legal/reorder/sections', payload).catch(err => {
            setError('Failed to save sub-section order.');
        });
    }

    function handleSubSectionSaved(updated) {
        setSubSections(prev => prev.map(s => s.id === updated.id ? { ...s, ...updated } : s))
        if (onSubSectionSaved) onSubSectionSaved(updated);
    }

    async function handleDeleteSubSection(id) {
        try {
            await api.delete(`/legal/sections/${id}`)
            setSubSections(prev => prev.filter(s => s.id !== id))
            if (onSubSectionDeleted) onSubSectionDeleted(id);
        } catch {}
    }

    async function handleCreateSubSection() {
        setAddingSubSection(true);
        // Create an empty dummy to open the form
        try {
            const res = await api.post('/legal/sections', {
                categoryId,
                parentId: section.id,
                title: 'New Sub-section',
                iconColor: '#FF4F93',
                bgColor: '#FFF5F7',
                order: subSections.length
            })
            setSubSections(prev => [...prev, { ...res.data, blocks: [], subSections: [] }])
            setAddingSubSection(false)
        } catch (err) {
            setError('Failed to add sub-section.')
            setAddingSubSection(false)
        }
    }

    return (
        <div className={`bg-white rounded-[20px] border overflow-hidden shadow-sm ${parentId ? 'border-[rgba(190,190,190,0.4)] ml-8 my-3' : 'border-[rgba(190,190,190,0.2)]'}`}>
            {/* Header row */}
            <div
                className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpanded(e => !e)}
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: form.bgColor }}>
                        {PreviewIcon
                            ? <PreviewIcon size={16} color={form.iconColor} />
                            : <span className="text-[10px] font-bold text-[#3D3D3D]/30">?</span>
                        }
                    </div>
                    <div>
                        <p className="text-sm font-bold text-[#3D3D3D]">{form.title || (parentId ? 'Untitled sub-section' : 'Untitled section')}</p>
                        <p className="text-xs text-[#3D3D3D]/40">{subSections.length > 0 ? `${subSections.length} sub-sections, ` : ''}{blocks.length} block{blocks.length !== 1 ? 's' : ''}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={e => { e.stopPropagation(); onDeleted(section.id) }}
                        className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-red-50 text-red-400 transition-colors">
                        <Trash2 size={13} />
                    </button>
                    {expanded ? <ChevronUp size={16} className="text-[#3D3D3D]/40" /> : <ChevronDown size={16} className="text-[#3D3D3D]/40" />}
                </div>
            </div>

            {/* Expanded editor */}
            {expanded && (
                <div className="border-t border-[rgba(190,190,190,0.15)] p-5 space-y-5">
                    {/* Title */}
                    <div>
                        <label className="text-xs font-semibold uppercase tracking-widest text-[#3D3D3D]/40 block mb-1">Section Title *</label>
                        <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                            placeholder="e.g. Our Pledge to Your Safety"
                            className="w-full px-4 py-3 rounded-[12px] border border-[rgba(190,190,190,0.4)] focus:border-[#FF4F93] text-sm font-semibold text-[#3D3D3D] outline-none transition-colors" />
                    </div>

                    {/* Intro */}
                    <div>
                        <label className="text-xs font-semibold uppercase tracking-widest text-[#3D3D3D]/40 block mb-1">Intro Paragraph</label>
                        <RichTextEditor
                            value={form.intro}
                            onChange={val => setForm(f => ({ ...f, intro: val }))}
                            placeholder="A short intro under the section heading..."
                            minHeight={96}
                        />
                    </div>

                    {/* Icon + Color */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-widest text-[#3D3D3D]/40 block mb-1">Lucide Icon Name</label>
                            <IconPicker 
                                value={form.icon}
                                onChange={val => setForm(f => ({ ...f, icon: val }))}
                                placeholder="Search section icon..."
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-widest text-[#3D3D3D]/40 block mb-1">Icon Color</label>
                            <div className="flex items-center gap-3">
                                <input type="color" value={form.iconColor} onChange={e => setForm(f => ({ ...f, iconColor: e.target.value }))}
                                    className="w-12 h-[46px] rounded-[12px] border border-[rgba(190,190,190,0.4)] cursor-pointer p-1" />
                                <span className="text-sm text-[#3D3D3D]/60 font-mono">{form.iconColor}</span>
                            </div>
                        </div>
                    </div>

                    {/* Background color */}
                    <div>
                        <label className="text-xs font-semibold uppercase tracking-widest text-[#3D3D3D]/40 block mb-2">Card Background Color</label>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {BG_PRESETS.map(p => (
                                <button key={p.color} type="button" onClick={() => setForm(f => ({ ...f, bgColor: p.color }))}
                                    title={p.label}
                                    className={`w-8 h-8 rounded-full border-2 transition-all ${form.bgColor === p.color ? 'border-[#FF4F93] scale-110' : 'border-transparent hover:border-gray-300'}`}
                                    style={{ backgroundColor: p.color }} />
                            ))}
                            <div className="flex items-center gap-2">
                                <input type="color" value={form.bgColor} onChange={e => setForm(f => ({ ...f, bgColor: e.target.value }))}
                                    className="w-8 h-8 rounded-full cursor-pointer border border-[rgba(190,190,190,0.4)] p-0.5" />
                                <span className="text-xs text-[#3D3D3D]/40 font-mono">{form.bgColor}</span>
                            </div>
                        </div>
                        {/* Preview */}
                        <div className="rounded-[14px] p-4 flex items-center gap-3" style={{ backgroundColor: form.bgColor }}>
                            {PreviewIcon && <PreviewIcon size={20} color={form.iconColor} />}
                            <span className="text-sm font-bold text-[#111111]">{form.title || 'Preview'}</span>
                        </div>
                    </div>

                    {/* Save */}
                    {error && <p className="text-xs text-red-500">{error}</p>}
                    <button onClick={handleSave} disabled={saving}
                        className={`flex items-center gap-2 text-sm font-semibold rounded-full px-5 py-2.5 transition-colors disabled:opacity-60
                            ${saveOk ? 'bg-green-500 text-white' : 'bg-[#FF4F93] hover:bg-[#e03f80] text-white'}`}>
                        {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={14} />}
                        {saveOk ? '✓ Saved' : 'Save section'}
                    </button>

                    {/* Blocks */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-xs font-semibold uppercase tracking-widest text-[#3D3D3D]/40">Blocks ({blocks.length})</label>
                            {blocks.length > 1 && <span className="text-[10px] text-[#3D3D3D]/40">Drag to reorder</span>}
                        </div>

                        <Reorder.Group axis="y" values={blocks} onReorder={handleReorderBlocks} className="space-y-2 mb-3">
                            {blocks.map(block => (
                                <BlockCard key={block.id} block={block} onDelete={handleDeleteBlock} onSaved={handleBlockSaved} />
                            ))}
                        </Reorder.Group>

                        {addingBlock
                            ? <BlockForm sectionId={section.id} onSaved={handleBlockSaved} onCancel={() => setAddingBlock(false)} />
                            : (
                                <div className="flex gap-3">
                                    <button onClick={() => setAddingBlock(true)}
                                        className="flex items-center gap-2 flex-1 justify-center py-3 rounded-[12px] border-2 border-dashed border-[rgba(190,190,190,0.3)] text-xs font-semibold text-[#3D3D3D]/40 hover:border-[#FF4F93]/40 hover:text-[#FF4F93] transition-colors">
                                        <Plus size={14} /> Add block
                                    </button>
                                    {!parentId && ( // Only allow 1 level of nesting
                                        <button onClick={handleCreateSubSection} disabled={addingSubSection}
                                            className="flex items-center gap-2 flex-1 justify-center py-3 rounded-[12px] border-2 border-dashed border-[rgba(190,190,190,0.3)] text-xs font-semibold text-[#3D3D3D]/40 hover:border-[#FF4F93]/40 hover:text-[#FF4F93] transition-colors">
                                            {addingSubSection ? <span className="w-4 h-4 border-2 border-[#3D3D3D]/30 border-t-[#3D3D3D]/80 rounded-full animate-spin" /> : <Plus size={14} />} 
                                            Add sub-section
                                        </button>
                                    )}
                                </div>
                            )
                        }

                        {/* Sub-sections */}
                        {!parentId && subSections.length > 0 && (
                            <div className="mt-6 border-t border-[rgba(190,190,190,0.15)] pt-5">
                                <div className="flex items-center justify-between mb-3">
                                    <label className="text-xs font-semibold uppercase tracking-widest text-[#3D3D3D]/40">Sub-sections ({subSections.length})</label>
                                    {subSections.length > 1 && <span className="text-[10px] text-[#3D3D3D]/40">Drag to reorder</span>}
                                </div>
                                <Reorder.Group axis="y" values={subSections} onReorder={handleReorderSubSections} className="space-y-3">
                                    {subSections.map((subSec) => (
                                        <DraggableSubSection 
                                            key={subSec.id} 
                                            subSec={subSec} 
                                            categoryId={categoryId} 
                                            parentId={section.id} 
                                            onSaved={handleSubSectionSaved} 
                                            onDeleted={handleDeleteSubSection} 
                                        />
                                    ))}
                                </Reorder.Group>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
