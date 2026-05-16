import { useState } from 'react'
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp, Save } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import api from '@/lib/api'
import IconPicker from './IconPicker'
import RichTextEditor from '@/components/ui/RichTextEditor'

const BLOCK_TYPES = [
    { value: 'paragraph', label: 'Paragraph', icon: 'AlignLeft' },
    { value: 'bullets',   label: 'Bullet List', icon: 'List' },
]

const BULLET_STYLES = [
    { value: 'dot',    label: '• Dot' },
    { value: 'check',  label: '✓ Check' },
    { value: 'number', label: '1. Number' },
    { value: 'icon',   label: '★ Icon' },
]

const DEFAULT_CONTENT = {
    paragraph: { text: '' },
    bullets: { intro: '', bulletStyle: 'check', bulletIcon: 'Check', bulletIconColor: '#22c55e', items: [''], outro: '' },
}

function BulletsEditor({ content, onChange }) {
    const c = content || DEFAULT_CONTENT.bullets

    function updateItem(i, val) {
        const items = [...(c.items || [])]
        items[i] = val
        onChange({ ...c, items })
    }

    function addItem() { onChange({ ...c, items: [...(c.items || []), ''] }) }
    function removeItem(i) { onChange({ ...c, items: (c.items || []).filter((_, j) => j !== i) }) }

    return (
        <div className="space-y-4">
            <RichTextEditor
                value={c.intro || ''}
                onChange={val => onChange({ ...c, intro: val })}
                placeholder="Intro text (optional)..."
                minHeight={72}
            />

            {/* Bullet style */}
            <div>
                <p className="text-xs font-semibold text-[#3D3D3D]/40 uppercase tracking-widest mb-2">Bullet Style</p>
                <div className="flex flex-wrap gap-2">
                    {BULLET_STYLES.map(s => (
                        <button key={s.value} type="button"
                            onClick={() => onChange({ ...c, bulletStyle: s.value })}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all
                                ${c.bulletStyle === s.value
                                    ? 'bg-[#FF4F93] text-white'
                                    : 'bg-gray-100 text-[#3D3D3D]/60 hover:bg-gray-200'}`}>
                            {s.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Icon picker for 'icon' style */}
            {c.bulletStyle === 'icon' && (
                <div className="flex gap-3">
                    <div className="flex-1">
                        <p className="text-xs font-semibold text-[#3D3D3D]/40 uppercase tracking-widest mb-1">Icon Name</p>
                        <IconPicker 
                            value={c.bulletIcon || ''}
                            onChange={val => onChange({ ...c, bulletIcon: val })}
                            placeholder="Search icons..."
                        />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-[#3D3D3D]/40 uppercase tracking-widest mb-1">Color</p>
                        <input type="color" value={c.bulletIconColor || '#FF4F93'}
                            onChange={e => onChange({ ...c, bulletIconColor: e.target.value })}
                            className="w-12 h-[42px] rounded-[10px] border border-[rgba(190,190,190,0.4)] cursor-pointer p-1" />
                    </div>
                </div>
            )}

            {/* Bullet items */}
            <div className="space-y-2">
                <p className="text-xs font-semibold text-[#3D3D3D]/40 uppercase tracking-widest">Items</p>
                {(c.items || []).map((item, i) => (
                    <div key={i} className="flex gap-2">
                        <input
                            value={item}
                            onChange={e => updateItem(i, e.target.value)}
                            placeholder={`Item ${i + 1}...`}
                            className="flex-1 px-3 py-2 text-sm rounded-[10px] border border-[rgba(190,190,190,0.4)] focus:border-[#FF4F93] outline-none"
                        />
                        <button type="button" onClick={() => removeItem(i)}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-red-400 hover:bg-red-50 transition-colors text-sm">
                            ✕
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addItem}
                    className="text-xs text-[#FF4F93] font-semibold hover:underline">
                    + Add item
                </button>
            </div>

            <RichTextEditor
                value={c.outro || ''}
                onChange={val => onChange({ ...c, outro: val })}
                placeholder="Outro text (optional)..."
                minHeight={72}
            />
        </div>
    )
}

function BlockForm({ sectionId, onSaved, onCancel, initialData }) {
    const [type, setType] = useState(initialData?.type || 'paragraph')
    const [title, setTitle] = useState(initialData?.title || '')
    const [icon, setIcon] = useState(initialData?.icon || '')
    const [iconColor, setIconColor] = useState(initialData?.iconColor || '#FF4F93')
    const [content, setContent] = useState(initialData?.content || DEFAULT_CONTENT.paragraph)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')

    function handleTypeChange(t) {
        setType(t)
        setContent(DEFAULT_CONTENT[t] || {})
    }

    async function handleSave() {
        setError('')
        const plainText = (content.text || '').replace(/<[^>]*>/g, '').trim()
        if (type === 'paragraph' && !plainText) { setError('Text is required'); return }
        if (type === 'bullets' && !(content.items || []).some(i => i.trim())) { setError('Add at least one bullet item'); return }

        setSaving(true)
        try {
            let res;
            if (initialData?.id) {
                res = await api.put(`/legal/blocks/${initialData.id}`, {
                    type, title: title.trim(), icon: icon.trim(), iconColor, content
                })
            } else {
                res = await api.post('/legal/blocks', {
                    sectionId, type, title: title.trim(), icon: icon.trim(), iconColor, content, order: 0
                })
            }
            onSaved(res.data)
        } catch {
            setError('Failed to save block. Please try again.')
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="bg-[#FAFAFA] rounded-[16px] border border-[rgba(190,190,190,0.3)] p-5 space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#3D3D3D]/40">{initialData ? 'Edit Block' : 'New Block'}</p>

            {/* Type selector */}
            <div className="flex gap-2">
                {BLOCK_TYPES.map(bt => {
                    const BtIcon = LucideIcons[bt.icon]
                    return (
                        <button key={bt.value} type="button" onClick={() => handleTypeChange(bt.value)}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all
                                ${type === bt.value ? 'bg-[#FF4F93] text-white' : 'bg-gray-100 text-[#3D3D3D]/60 hover:bg-gray-200'}`}>
                            {BtIcon && <BtIcon size={12} />} {bt.label}
                        </button>
                    )
                })}
            </div>

            {/* Title + icon (optional) */}
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <p className="text-xs font-semibold text-[#3D3D3D]/40 uppercase tracking-widest mb-1">Sub-heading (optional)</p>
                    <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Mandatory Verification"
                        className="w-full px-3 py-2.5 text-sm rounded-[10px] border border-[rgba(190,190,190,0.4)] focus:border-[#FF4F93] outline-none" />
                </div>
                <div>
                    <p className="text-xs font-semibold text-[#3D3D3D]/40 uppercase tracking-widest mb-1">Lucide Icon (optional)</p>
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <IconPicker 
                                value={icon}
                                onChange={setIcon}
                                placeholder="Search icons..."
                            />
                        </div>
                        <input type="color" value={iconColor} onChange={e => setIconColor(e.target.value)}
                            className="w-12 h-[46px] rounded-[12px] border border-[rgba(190,190,190,0.4)] cursor-pointer p-1" />
                    </div>
                </div>
            </div>

            {/* Content editor */}
            {type === 'paragraph' && (
                <RichTextEditor
                    value={content.text || ''}
                    onChange={val => setContent({ text: val })}
                    placeholder="Write the paragraph text here..."
                    minHeight={140}
                />
            )}
            {type === 'bullets' && <BulletsEditor content={content} onChange={setContent} />}

            {error && <p className="text-xs text-red-500">{error}</p>}

            <div className="flex gap-2">
                <button type="button" onClick={onCancel}
                    className="px-4 py-2 rounded-full border border-[rgba(190,190,190,0.4)] text-sm font-semibold text-[#3D3D3D] hover:bg-gray-50 transition-colors">
                    Cancel
                </button>
                <button type="button" onClick={handleSave} disabled={saving}
                    className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#FF4F93] hover:bg-[#e03f80] text-white text-sm font-semibold transition-colors disabled:opacity-60">
                    {saving ? <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (initialData ? <Save size={14} /> : <Plus size={14} />)}
                    {initialData ? 'Save block' : 'Add block'}
                </button>
            </div>
        </div>
    )
}

export { BlockForm, BulletsEditor }
export default BlockForm