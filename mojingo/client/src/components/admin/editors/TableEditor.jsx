const TableEditor = ({ content, onChange }) => {
    const addRow = () => onChange({ ...content, rows: [...content.rows, content.headers.map(() => '')] })
    const addColumn = () => onChange({
        ...content,
        headers: [...content.headers, 'New Column'],
        rows: content.rows.map(r => [...r, ''])
    })
    const updateCell = (ri, ci, val) => {
        const rows = content.rows.map((r, i) => i === ri ? r.map((c, j) => j === ci ? val : c) : r)
        onChange({ ...content, rows })
    }

    return (
        <div className="space-y-4">
            <div className="flex gap-2 items-center">
                <label>Header BG Color:</label>
                <input type="color" value={content.headerBg || '#BFDBFE'}
                    onChange={e => onChange({ ...content, headerBg: e.target.value })} />
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border text-sm">
                    <thead>
                        <tr style={{ backgroundColor: content.headerBg }}>
                            {content.headers.map((h, i) => (
                                <th key={i} className="border p-2">
                                    <input value={h} className="w-full bg-transparent font-semibold"
                                        onChange={e => {
                                            const headers = [...content.headers]
                                            headers[i] = e.target.value
                                            onChange({ ...content, headers })
                                        }} />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {content.rows.map((row, ri) => (
                            <tr key={ri}>
                                {row.map((cell, ci) => (
                                    <td key={ci} className="border p-1">
                                        <input value={cell} className="w-full"
                                            onChange={e => updateCell(ri, ci, e.target.value)} />
                                    </td>
                                ))}
                                <td>
                                    <button onClick={() => onChange({
                                        ...content, rows: content.rows.filter((_, i) => i !== ri)
                                    })}>✕</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex gap-3">
                <button onClick={addRow}>+ Add Row</button>
                <button onClick={addColumn}>+ Add Column</button>
            </div>
        </div>
    )
}