import { useState, useMemo, useRef, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { ChevronDown, Search } from 'lucide-react';

const allIconNames = Object.keys(LucideIcons)
    .filter(name => typeof LucideIcons[name] === 'function' || typeof LucideIcons[name] === 'object')
    .filter(name => /^[A-Z]/.test(name)); // Only uppercase exports are icons

export default function IconPicker({ value, onChange, placeholder = 'Select an icon...' }) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [displayCount, setDisplayCount] = useState(100);
    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
                setSearch('');
                setDisplayCount(100);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        setDisplayCount(100);
    }, [search]);

    const filteredIcons = useMemo(() => {
        if (!search) return allIconNames;
        const lowerSearch = search.toLowerCase();
        return allIconNames.filter(name => name.toLowerCase().includes(lowerSearch));
    }, [search]);

    const visibleIcons = filteredIcons.slice(0, displayCount);

    function handleScroll(e) {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (scrollHeight - scrollTop <= clientHeight + 100) {
            setDisplayCount(prev => Math.min(prev + 100, filteredIcons.length));
        }
    }

    const CurrentIcon = value && LucideIcons[value] ? LucideIcons[value] : null;

    return (
        <div ref={wrapperRef} className="relative w-full">
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 w-full px-4 py-3 rounded-[12px] border bg-white transition-colors text-left
                    ${isOpen ? 'border-[#FF4F93] ring-1 ring-[#FF4F93]' : 'border-[rgba(190,190,190,0.4)] hover:border-gray-400'}`}
            >
                {CurrentIcon ? <CurrentIcon size={18} className="text-[#FF4F93]" /> : <Search size={18} className="text-[#3D3D3D]/40" />}
                <span className={`flex-1 text-sm truncate ${!value ? 'text-[#3D3D3D]/40' : 'text-[#3D3D3D] font-medium'}`}>
                    {value || placeholder}
                </span>
                <ChevronDown size={16} className={`text-[#3D3D3D]/40 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white border border-[rgba(190,190,190,0.2)] rounded-[16px] shadow-xl flex flex-col overflow-hidden">
                    
                    {/* Dedicated Search Input */}
                    <div className="p-3 border-b border-[rgba(190,190,190,0.1)] flex items-center gap-2 bg-gray-50/50">
                        <Search size={16} className="text-[#3D3D3D]/40" />
                        <input 
                            type="text"
                            autoFocus
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Type a keyword to find icons..."
                            className="flex-1 bg-transparent outline-none text-sm text-[#3D3D3D] placeholder-[#3D3D3D]/40"
                        />
                    </div>

                    {/* Icons Grid */}
                    <div 
                        onScroll={handleScroll}
                        className="max-h-64 overflow-y-auto p-3"
                    >
                    {visibleIcons.length === 0 ? (
                        <p className="text-sm text-center py-6 text-[#3D3D3D]/50">No icons found matching "{search}"</p>
                    ) : (
                        <div className="grid grid-cols-5 gap-2">
                            {visibleIcons.map(name => {
                                const Icon = LucideIcons[name];
                                return (
                                    <button
                                        key={name}
                                        type="button"
                                        title={name}
                                        onClick={() => {
                                            onChange(name);
                                            setSearch('');
                                            setIsOpen(false);
                                            setDisplayCount(100);
                                        }}
                                        className={`flex flex-col items-center justify-center p-2 h-16 rounded-[10px] transition-all
                                            ${value === name 
                                                ? 'bg-[#FF4F93]/10 text-[#FF4F93] ring-2 ring-[#FF4F93]' 
                                                : 'text-[#3D3D3D]/70 hover:bg-gray-100 hover:text-[#3D3D3D]'}`}
                                    >
                                        <Icon size={22} className="mb-1" />
                                        <span className="text-[9px] truncate w-full text-center">{name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                    </div>
                </div>
            )}
        </div>
    );
}
