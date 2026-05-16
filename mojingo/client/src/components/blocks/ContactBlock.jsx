const ContactBlock = ({ block }) => {
    const { label, value, icon, iconBg } = block.content
    const ContactIcon = icon ? LucideIcons[icon] : null
    const BlockIcon = block.icon ? LucideIcons[block.icon] : null

    return (
        <div className="mt-6">
            {block.title && (
                <div className="flex items-center gap-2 mb-3">
                    {BlockIcon && <BlockIcon size={18} color={block.iconColor} />}
                    <h4 className="font-semibold text-gray-800">{block.title}</h4>
                </div>
            )}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                {ContactIcon && (
                    <div className="p-2 rounded-full" style={{ backgroundColor: iconBg || '#FCD34D' }}>
                        <ContactIcon size={20} className="text-white" />
                    </div>
                )}
                <div>
                    <p className="text-xs text-gray-500">{label}</p>
                    <p className="text-sm font-medium text-gray-800">{value}</p>
                </div>
            </div>
        </div>
    )
}