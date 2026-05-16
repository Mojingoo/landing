import * as LucideIcons from 'lucide-react'

function BlockRenderer({ block }) {
    const Icon = block.icon ? LucideIcons[block.icon] : null
    const content = block.content || {}

    if (block.type === 'paragraph') {
        return (
            <div className="mb-5">
                {block.title && (
                    <div className="flex items-center gap-2.5 mb-2">
                        {Icon && <Icon size={18} color={block.iconColor || '#FF4F93'} />}
                        <h4 className="text-[15px] font-bold text-[#111111]">{block.title}</h4>
                    </div>
                )}
                <div
                    className="text-[14px] text-[#3D3D3D]/70 leading-relaxed rich-content"
                    dangerouslySetInnerHTML={{ __html: content.text || '' }}
                />
            </div>
        )
    }

    if (block.type === 'bullets') {
        const {
            intro, bulletStyle = 'dot', bulletIcon = 'Check',
            bulletIconColor = '#22c55e', items = [], outro
        } = content

        const BulletIconComp = LucideIcons[bulletIcon] || LucideIcons.Check

        return (
            <div className="mb-5">
                {block.title && (
                    <div className="flex items-center gap-2.5 mb-2">
                        {Icon && <Icon size={18} color={block.iconColor || '#FF4F93'} />}
                        <h4 className="text-[15px] font-bold text-[#111111]">{block.title}</h4>
                    </div>
                )}
                {intro && (
                    <div
                        className="text-[14px] text-[#3D3D3D]/70 leading-relaxed mb-3 rich-content"
                        dangerouslySetInnerHTML={{ __html: intro }}
                    />
                )}

                <ul className="space-y-2.5">
                    {items.filter(i => i.trim()).map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                            {bulletStyle === 'number' ? (
                                <span className="text-[13px] font-bold text-[#FF4F93] mt-0.5 min-w-[20px]">{i + 1}.</span>
                            ) : bulletStyle === 'icon' ? (
                                <BulletIconComp size={16} color={bulletIconColor} className="mt-0.5 shrink-0" />
                            ) : bulletStyle === 'check' ? (
                                <LucideIcons.Check size={16} className="text-[#22c55e] mt-0.5 shrink-0" />
                            ) : (
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4F93] mt-2 shrink-0" />
                            )}
                            <span className="text-[14px] text-[#3D3D3D]/70 leading-relaxed">{item}</span>
                        </li>
                    ))}
                </ul>

                {outro && (
                    <div
                        className="text-[14px] text-[#3D3D3D]/70 leading-relaxed mt-3 rich-content"
                        dangerouslySetInnerHTML={{ __html: outro }}
                    />
                )}
            </div>
        )
    }

    return null
}

export default function LegalSectionCard({ section }) {
    const Icon = section.icon ? LucideIcons[section.icon] : null
    const blocks = (section.blocks || [])
        .filter(b => b.isActive)
        .sort((a, b) => a.order - b.order)

    return (
        <div
            className="rounded-[24px] p-8 mb-10"
            style={{ backgroundColor: section.bgColor || '#FFF5F7' }}
        >
            {/* Section header */}
            <div className="flex items-center gap-4 mb-5">
                <div 
                    className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0"
                    style={{ 
                        backgroundColor: section.iconColor ? section.iconColor + '15' : 'rgba(0,0,0,0.05)',
                        border: `1px solid ${section.iconColor ? section.iconColor + '20' : 'rgba(0,0,0,0.1)'}`
                    }}
                >
                    {Icon && <Icon size={20} color={section.iconColor || '#FF4F93'} />}
                </div>
                <h3
                    className="text-[20px] font-extrabold text-[#111111] leading-tight"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                    {section.title}
                </h3>
            </div>

            {/* Intro paragraph */}
            {section.intro && (
                <div
                    className="text-[14px] text-[#3D3D3D]/70 leading-relaxed mb-5 rich-content"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    dangerouslySetInnerHTML={{ __html: section.intro }}
                />
            )}

            {/* Blocks */}
            {blocks.map(block => (
                <BlockRenderer key={block.id} block={block} />
            ))}

            {/* Sub-sections */}
            {section.subSections && section.subSections.length > 0 && (
                <div className="mt-8 space-y-4">
                    {section.subSections
                        .filter(s => s.isActive)
                        .sort((a, b) => a.order - b.order)
                        .map(subSec => (
                            <div key={subSec.id}>
                                <div className="flex items-center gap-3 mb-3">
                                    {subSec.icon && LucideIcons[subSec.icon] && (
                                        <div className="w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0"
                                            style={{ backgroundColor: subSec.iconColor ? subSec.iconColor + '15' : 'rgba(0,0,0,0.05)' }}>
                                            {(() => {
                                                const SubIcon = LucideIcons[subSec.icon]
                                                return <SubIcon size={16} color={subSec.iconColor || '#FF4F93'} />
                                            })()}
                                        </div>
                                    )}
                                    <h4 className="text-[17px] font-bold text-[#111111]">{subSec.title}</h4>
                                </div>
                                {subSec.intro && (
                                    <div
                                        className="text-[14px] text-[#3D3D3D]/70 leading-relaxed mb-4 rich-content"
                                        dangerouslySetInnerHTML={{ __html: subSec.intro }}
                                    />
                                )}
                                {(subSec.blocks || []).filter(b => b.isActive).sort((a, b) => a.order - b.order).map(block => (
                                    <BlockRenderer key={block.id} block={block} />
                                ))}
                            </div>
                        ))}
                </div>
            )}
        </div>
    )
}