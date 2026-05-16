import { useRef, useEffect, useCallback, useState } from 'react'
import { Bold, Italic, List, Type, ChevronDown } from 'lucide-react'

const FONTS = [
    { label: 'Default', value: 'inherit' },
    { label: 'Inter', value: 'Inter, sans-serif' },
    { label: 'Plus Jakarta Sans', value: "'Plus Jakarta Sans', sans-serif" },
    { label: 'Georgia', value: 'Georgia, serif' },
    { label: 'Courier New', value: "'Courier New', monospace" },
    { label: 'Trebuchet MS', value: "'Trebuchet MS', sans-serif" },
]

/**
 * RichTextEditor
 *
 * Props:
 *   value       {string}   – HTML string (stored in state above)
 *   onChange    {fn}       – called with new HTML string on every keystroke/format
 *   placeholder {string}   – placeholder text
 *   minHeight   {number}   – min height in px (default 120)
 *   className   {string}   – extra classes for the outer wrapper
 *   label       {string}   – optional label rendered above the toolbar
 *   error       {boolean}  – red border when true
 */
export default function RichTextEditor({
    value,
    onChange,
    placeholder = 'Start typing...',
    minHeight = 120,
    className = '',
    error = false,
}) {
    const editorRef = useRef(null)
    const isComposing = useRef(false)
    const [fontOpen, setFontOpen] = useState(false)
    const [activeFont, setActiveFont] = useState(FONTS[0])
    const [isBold, setIsBold] = useState(false)
    const [isItalic, setIsItalic] = useState(false)
    const fontDropRef = useRef(null)

    // Sync value → editor DOM only on mount / when value is externally changed
    // (avoid cursor-jump on every keystroke by only syncing when needed)
    useEffect(() => {
        const el = editorRef.current
        if (!el) return
        // Only update if content actually differs (e.g. on initial load / edit load)
        if (el.innerHTML !== value) {
            el.innerHTML = value || ''
        }
    }, [value])

    // Close font dropdown on outside click
    useEffect(() => {
        function handler(e) {
            if (fontDropRef.current && !fontDropRef.current.contains(e.target)) {
                setFontOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const emitChange = useCallback(() => {
        const el = editorRef.current
        if (!el) return
        onChange?.(el.innerHTML)
    }, [onChange])

    function updateToolbarState() {
        setIsBold(document.queryCommandState('bold'))
        setIsItalic(document.queryCommandState('italic'))
    }

    function execCmd(cmd, value = null) {
        editorRef.current?.focus()
        document.execCommand(cmd, false, value)
        emitChange()
        updateToolbarState()
    }

    function handleBold(e) {
        e.preventDefault()
        execCmd('bold')
    }

    function handleItalic(e) {
        e.preventDefault()
        execCmd('italic')
    }

    function handleBullets(e) {
        e.preventDefault()
        execCmd('insertUnorderedList')
    }

    function handleFont(font, e) {
        e.preventDefault()
        setActiveFont(font)
        setFontOpen(false)
        editorRef.current?.focus()
        if (font.value === 'inherit') {
            // Remove font-family by applying default
            document.execCommand('fontName', false, 'inherit')
        } else {
            document.execCommand('fontName', false, font.value)
        }
        // execCommand fontName wraps in <font face="…">, we patch to inline style
        // This is handled by the CSS below — use the font-family on the editor wrapper
        emitChange()
    }

    function handleKeyDown(e) {
        // Allow Tab to insert indent rather than leaving the field
        if (e.key === 'Tab') {
            e.preventDefault()
            document.execCommand('insertHTML', false, '&nbsp;&nbsp;&nbsp;&nbsp;')
            emitChange()
        }
    }

    function handleInput() {
        if (!isComposing.current) emitChange()
    }

    const borderColor = error
        ? 'border-red-400'
        : 'border-[rgba(190,190,190,0.4)]'

    return (
        <div className={`flex flex-col rounded-[14px] border overflow-hidden transition-colors focus-within:border-[#FF4F93] ${borderColor} bg-white ${className}`}>
            {/* ── Toolbar ─────────────────────────────────────────── */}
            <div className="flex items-center gap-1 px-3 py-2 border-b border-[rgba(190,190,190,0.25)] bg-[#FAFAFA]">

                {/* Bold */}
                <ToolbarBtn
                    onMouseDown={handleBold}
                    active={isBold}
                    title="Bold (Ctrl+B)"
                >
                    <Bold size={13} />
                </ToolbarBtn>

                {/* Italic */}
                <ToolbarBtn
                    onMouseDown={handleItalic}
                    active={isItalic}
                    title="Italic (Ctrl+I)"
                >
                    <Italic size={13} />
                </ToolbarBtn>

                {/* Bullet list */}
                <ToolbarBtn
                    onMouseDown={handleBullets}
                    title="Bullet List"
                >
                    <List size={13} />
                </ToolbarBtn>

                {/* Separator */}
                <div className="w-px h-4 bg-[rgba(190,190,190,0.4)] mx-1" />

                {/* Font picker */}
                <div className="relative" ref={fontDropRef}>
                    <button
                        type="button"
                        onMouseDown={(e) => { e.preventDefault(); setFontOpen(o => !o) }}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-[#3D3D3D]/60 hover:bg-gray-100 transition-colors select-none"
                        title="Font"
                    >
                        <Type size={11} />
                        <span className="max-w-[80px] truncate">{activeFont.label}</span>
                        <ChevronDown size={10} className={`transition-transform ${fontOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {fontOpen && (
                        <div className="absolute top-full left-0 mt-1 z-50 bg-white border border-[rgba(190,190,190,0.3)] rounded-[12px] shadow-xl py-1 min-w-[160px]">
                            {FONTS.map(font => (
                                <button
                                    key={font.value}
                                    type="button"
                                    onMouseDown={(e) => handleFont(font, e)}
                                    className={`w-full text-left px-4 py-2.5 text-[12px] transition-colors hover:bg-[#FF4F93]/5
                                        ${activeFont.value === font.value ? 'text-[#FF4F93] font-bold' : 'text-[#3D3D3D]/70 font-medium'}`}
                                    style={{ fontFamily: font.value === 'inherit' ? 'inherit' : font.value }}
                                >
                                    {font.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Editable area ───────────────────────────────────── */}
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                onKeyUp={updateToolbarState}
                onMouseUp={updateToolbarState}
                onCompositionStart={() => { isComposing.current = true }}
                onCompositionEnd={() => { isComposing.current = false; emitChange() }}
                data-placeholder={placeholder}
                style={{ minHeight, fontFamily: activeFont.value === 'inherit' ? undefined : activeFont.value }}
                className="rich-editor-body px-5 py-3.5 text-sm text-[#3D3D3D] outline-none leading-relaxed"
            />
        </div>
    )
}

function ToolbarBtn({ children, onMouseDown, active = false, title }) {
    return (
        <button
            type="button"
            onMouseDown={onMouseDown}
            title={title}
            className={`w-7 h-7 flex items-center justify-center rounded-lg transition-colors text-sm font-bold
                ${active
                    ? 'bg-[#FF4F93] text-white'
                    : 'text-[#3D3D3D]/60 hover:bg-gray-100 hover:text-[#3D3D3D]'
                }`}
        >
            {children}
        </button>
    )
}
