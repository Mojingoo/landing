const TableBlock = ({ block }) => {
    const { intro, headers, rows, headerBg } = block.content
    const BlockIcon = block.icon ? LucideIcons[block.icon] : null

    return (
        <div className="mt-6">
            {block.title && (
                <div className="flex items-center gap-2 mb-2">
                    {BlockIcon && <BlockIcon size={18} color={block.iconColor} />}
                    <h4 className="font-semibold text-gray-800">{block.title}</h4>
                </div>
            )}
            {intro && <p className="text-sm text-gray-600 mb-4">{intro}</p>}
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-sm">
                    <thead>
                        <tr style={{ backgroundColor: headerBg || '#BFDBFE' }}>
                            {headers.map((h, i) => (
                                <th key={i} className="p-3 text-left font-semibold text-gray-800 border-r last:border-r-0">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, i) => (
                            <tr key={i} className="border-t odd:bg-white even:bg-gray-50">
                                {row.map((cell, j) => (
                                    <td key={j} className="p-3 text-gray-600 border-r last:border-r-0 align-top">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}