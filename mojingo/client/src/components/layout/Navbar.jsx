// src/components/layout/Navbar.jsx
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Blog', to: '/blog' },
    { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const location = useLocation()

    const isActive = (to) => {
        if (to === '/') return location.pathname === '/'
        if (to.startsWith('#')) return false
        return location.pathname === to
    }

    const renderLink = (link, children, className) => {
        if (link.to.startsWith('#')) {
            return (
                <a href={link.to} className={className}>
                    {children}
                </a>
            )
        }
        return (
            <Link to={link.to} className={className}>
                {children}
            </Link>
        )
    }

    return (
        <motion.nav
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-[rgba(190,190,190,0.15)]"
            id="navbar"
        >
            <div className="max-w-[1200px] mx-auto px-6 sm:px-10 h-[72px] flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="Mojingo Home">
                    <img
                        src="/logo.svg"
                        alt="Mojingo Logo"
                        className="hidden md:block h-8 w-auto"
                    />
                    <img
                        src="/logo_mobile.svg"
                        alt="Mojingo Logo"
                        className="block md:hidden h-8 w-auto"
                    />
                </Link>

                {/* Desktop nav links — centered */}
                <ul className="hidden md:flex items-center gap-10 text-[15px] font-semibold">
                    {navLinks.map((link) => (
                        <li key={link.label}>
                            {renderLink(
                                link,
                                <>
                                    {link.label}
                                </>,
                                `relative py-1 transition-colors duration-200 ${isActive(link.to)
                                    ? 'text-[#FF4F93]'
                                    : 'text-[#3D3D3D] hover:text-[#FF4F93]'
                                }`
                            )}
                        </li>
                    ))}
                </ul>

                {/* Desktop CTA — single rounded button */}
                <div className="hidden md:flex items-center">
                    <a
                        href="https://www.mojingo.app/phone"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-[#FF4F93] hover:bg-[#e84384] active:scale-[0.97] text-white text-[14px] font-regular rounded-full px-7 py-2.5 shadow-[0_4px_16px_rgba(255,79,147,0.3)] hover:shadow-[0_6px_24px_rgba(255,79,147,0.4)] transition-all duration-200"
                        id="cta-open-mojingo"
                    >
                        Open Mojingo
                    </a>
                </div>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden relative z-10 p-2 -mr-2 text-[#3D3D3D] hover:text-[#FF4F93] transition-colors"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                    id="mobile-menu-toggle"
                >
                    {open ? <X size={24} /> : <img src="/jam_menu.svg" alt="Menu" className="w-6 h-6 opacity-80 hover:opacity-100 transition-opacity" style={{ filter: 'brightness(0) saturate(100%) invert(26%) sepia(0%) saturate(222%) hue-rotate(185deg) brightness(85%) contrast(85%)' }} />}
                </button>
            </div>

            {/* Mobile dropdown */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="md:hidden overflow-hidden bg-white/95 backdrop-blur-md border-t border-[rgba(190,190,190,0.15)]"
                        id="mobile-menu"
                    >
                        <div className="px-6 sm:px-10 py-6 flex flex-col gap-1">
                            {navLinks.map((link) => {
                                const active = isActive(link.to)
                                const cls = `py-3 text-[15px] font-semibold transition-colors duration-200 rounded-lg px-3 ${active
                                    ? 'text-[#FF4F93] bg-[#FFF0F5]'
                                    : 'text-[#3D3D3D] hover:text-[#FF4F93] hover:bg-[#FFF0F5]'
                                }`
                                if (link.to.startsWith('#')) {
                                    return (
                                        <a
                                            key={link.label}
                                            href={link.to}
                                            onClick={() => setOpen(false)}
                                            className={cls}
                                        >
                                            {link.label}
                                        </a>
                                    )
                                }
                                return (
                                    <Link
                                        key={link.label}
                                        to={link.to}
                                        onClick={() => setOpen(false)}
                                        className={cls}
                                    >
                                        {link.label}
                                    </Link>
                                )
                            })}
                            <a
                                href="https://www.mojingo.app/phone"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setOpen(false)}
                                className="mt-4 inline-flex items-center justify-center bg-[#FF4F93] hover:bg-[#e84384] text-white text-[15px] font-semibold rounded-full py-3 shadow-[0_4px_16px_rgba(255,79,147,0.3)] transition-all duration-200"
                                id="mobile-cta-open-mojingo"
                            >
                                Open Mojingo
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}