const BulletsEditor = ({ content, onChange }) => {
    return (
        <div className="space-y-4">
            <textarea placeholder="Intro text (optional)"
                value={content.intro} onChange={e => onChange({ ...content, intro: e.target.value })} />

            {/* Bullet style picker */}
            <div className="flex gap-3">
                {['dot', 'number', 'icon'].map(style => (
                    <label key={style} className="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="bulletStyle" value={style}
                            checked={content.bulletStyle === style}
                            onChange={() => onChange({ ...content, bulletStyle: style })} />
                        {style.charAt(0).toUpperCase() + style.slice(1)}
                    </label>
                ))}
            </div>

            {/* Icon picker (only when bulletStyle = 'icon') */}
            {content.bulletStyle === 'icon' && (
                <div className="flex gap-2">
                    <input placeholder="Lucide icon name e.g. Shield"
                        value={content.bulletIcon}
                        onChange={e => onChange({ ...content, bulletIcon: e.target.value })} />
                    <input type="color" value={content.bulletIconColor}
                        onChange={e => onChange({ ...content, bulletIconColor: e.target.value })} />
                </div>
            )}

            {/* Bullet items */}
            {content.items.map((item, i) => (
                <div key={i} className="flex gap-2">
                    <input value={item}
                        onChange={e => {
                            const items = [...content.items]
                            items[i] = e.target.value
                            onChange({ ...content, items })
                        }} />
                    <button onClick={() => onChange({
                        ...content,
                        items: content.items.filter((_, j) => j !== i)
                    })}>✕</button>
                </div>
            ))}
            <button onClick={() => onChange({ ...content, items: [...content.items, ''] })}>
                + Add Bullet
            </button>

            <textarea placeholder="Outro text (optional)"
                value={content.outro} onChange={e => onChange({ ...content, outro: e.target.value })} />
        </div>
    )
}