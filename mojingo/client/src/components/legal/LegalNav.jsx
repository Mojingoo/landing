const TABS = [
    { slug: 'security', label: 'Security Policy & Safety Statement' },
    { slug: 'terms', label: 'Terms of Service' },
    { slug: 'privacy', label: 'Privacy Policy' },
    { slug: 'cookies', label: 'Cookies Policy' }
]

const LegalNav = ({ active, onChange }) => (
    <nav className="bg-white border-b border-[rgba(190,190,190,0.3)] flex gap-2 px-6 py-4 overflow-x-auto">
        {TABS.map(tab => (
            <button
                key={tab.slug}
                onClick={() => onChange(tab.slug)}
                className={`
          whitespace-nowrap px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all
          ${active === tab.slug
                        ? 'bg-[#FF4F93] text-white shadow-sm'
                        : 'bg-[#F5F5F5] text-[#3D3D3D]/60 hover:bg-[#FFE8F0] hover:text-[#FF4F93]'}
        `}
            >
                {tab.label}
            </button>
        ))}
    </nav>
)

export default LegalNav