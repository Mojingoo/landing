const BulletsBlock = ({ block }) => {
    const { intro, bulletStyle, bulletIcon, bulletIconColor, items, outro } = block.content
    const BulletIcon = bulletIcon ? LucideIcons[bulletIcon] : null
    const BlockIcon = block.icon ? LucideIcons[block.icon] : null

    return (
        <div className="mt-6">
            {block.title && (
                <div className="flex items-center gap-2 mb-2">
                    {BlockIcon && <BlockIcon size={18} color={block.iconColor} />}
                    <h4 className="font-semibold text-gray-800">{block.title}</h4>
                </div>
            )}
            {intro && <p className="text-sm text-gray-600 mb-3">{intro}</p>}
            <ul className="space-y-2">
                {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        {bulletStyle === 'dot' && (
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-400 shrink-0" />
                        )}
                        {bulletStyle === 'number' && (
                            <span className="shrink-0 font-medium text-gray-500 min-w-[1.2rem]">{i + 1}.</span>
                        )}
                        {bulletStyle === 'icon' && BulletIcon && (
                            <BulletIcon size={16} color={bulletIconColor} className="mt-0.5 shrink-0" />
                        )}
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
            {outro && <p className="text-sm text-gray-600 mt-3">{outro}</p>}
        </div>
    )
}