const ParagraphBlock = ({ block }) => {
    const Icon = block.icon ? LucideIcons[block.icon] : null
    return (
        <div className="mt-6">
            {block.title && (
                <div className="flex items-center gap-2 mb-2">
                    {Icon && <Icon size={18} color={block.iconColor} />}
                    <h4 className="font-semibold text-gray-800">{block.title}</h4>
                </div>
            )}
            <p className="text-sm text-gray-600 leading-relaxed">{block.content.text}</p>
        </div>
    )
}