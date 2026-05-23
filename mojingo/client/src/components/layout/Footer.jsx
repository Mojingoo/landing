import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShieldCheck, Shield, Users } from 'lucide-react'

const badges = [
    { icon: ShieldCheck, label: 'Verified Profiles' },
    { icon: Shield, label: 'Safety-first' },
    { icon: Users, label: 'No swiping' },
]

const footerLinks = [
    { label: 'About', to: '/#about' },
    { label: 'Blog', to: '/blog' },
    { label: 'Legal', to: '/legal' },
    { label: 'Contact', to: '/contact' },
]
const socials = [
    { name: 'Facebook', url: 'https://www.facebook.com/people/Mojingo/61578901409829/' },
    { name: 'Instagram', url: 'https://www.instagram.com/mojingoapp' },
    { name: 'Linkedin', url: '#' },
    { name: 'X', url: 'https://x.com/Mojingoapp' }
]

export default function Footer() {
    return (
        <footer className="relative w-full overflow-hidden bg-[#FFF0F5]" id="footer">

            {/* ===== TOP SECTION — Light pink CTA area ===== */}
            <div className="pt-16 md:pt-24 pb-8 md:pb-12 relative z-10">
                <div className="max-w-[900px] mx-auto px-6 sm:px-10 text-center">

                    {/* Heading */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-[28px] sm:text-[36px] md:text-[44px] font-extrabold text-[#111111] leading-[1.15] mb-4"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Let your mood find your moment.
                    </motion.h2>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-[13px] md:text-[15px] text-[#3D3D3D]/70 font-normal mb-8"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Join a growing community built around presence, trust, and real-life connection.
                    </motion.p>

                    {/* Open Mojingo Button (same as Navbar) */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="mb-8"
                    >
                        <a
                            href="https://app.mojingo.co"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center bg-[#FF4F93] hover:bg-[#e84384] active:scale-[0.97] text-white text-[14px] font-medium rounded-full px-7 py-2.5 shadow-[0_4px_16px_rgba(255,79,147,0.3)] hover:shadow-[0_6px_24px_rgba(255,79,147,0.4)] transition-all duration-200"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            id="footer-cta-open-mojingo"
                        >
                            Open Mojingo
                        </a>
                    </motion.div>

                    {/* Trust badges (same as Hero) */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 pb-4"
                    >
                        {badges.map(({ icon: Icon, label }) => (
                            <div key={label} className="flex items-center gap-2">
                                <Icon size={18} className="text-[#FF4F93]" strokeWidth={2.5} />
                                <span
                                    className="text-sm font-medium text-[#3D3D3D]"
                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                >
                                    {label}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </div>

            </div>

            {/* ===== DESKTOP FOOTER BOTTOM (md+) ===== */}
            <div className="relative w-full hidden md:block">
                {/* Desktop Footer SVG */}
                <img
                    src="/FOOTER.svg"
                    alt=""
                    className="absolute top-0 left-0 w-full h-auto z-0 pointer-events-none"
                />

                {/* Content */}
                <div className="relative z-20 pt-[18vw] pb-10">
                    <div className="max-w-[1100px] mx-auto px-6 sm:px-10">

                        {/* Contact + Links row */}
                        <div className="flex flex-row justify-between items-center gap-6 mb-24">
                            <div>
                                <p
                                    className="text-[12px] text-white/40 mb-1"
                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                >
                                    Contact us at:
                                </p>
                                <a
                                    href="mailto:team@mojingo.co"
                                    className="text-[16px] font-medium text-white hover:text-[#FF4F93] transition-colors"
                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                >
                                    team@mojingo.co
                                </a>
                            </div>
                            <div className="flex items-center gap-8 text-white">
                                {footerLinks.map((link) => {
                                    if (link.to.startsWith('/#')) {
                                        return (
                                            <a
                                                key={link.label}
                                                href={link.to}
                                                className="text-[15px] font-medium text-white/80 hover:text-[#FF4F93] transition-colors"
                                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                            >
                                                {link.label}
                                            </a>
                                        )
                                    }
                                    return (
                                        <Link
                                            key={link.label}
                                            to={link.to}
                                            className="text-[15px] font-medium text-white/80 hover:text-[#FF4F93] transition-colors"
                                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                        >
                                            {link.label}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Large MOJINGO text */}
                        <div className="text-center mb-10 mt-10">
                            <h3
                                className="text-[150px] lg:text-[200px] font-normal tracking-[0.04em] leading-[0.85] text-white"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                                MOJINGO
                            </h3>
                        </div>

                        {/* Bottom bar */}
                        <div className="flex flex-row justify-between items-center pt-4">
                            <p
                                className="text-[12px] text-white"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                                © 2026 Mojingo Private Limited. All rights reserved.
                            </p>
                            <img
                                src="/logo_mobile.svg"
                                alt="Mojingo Logo"
                                className="h-12 w-auto"
                            />
                            <div className="flex items-center gap-5">
                                {socials.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target={social.url !== '#' ? "_blank" : undefined}
                                        rel={social.url !== '#' ? "noopener noreferrer" : undefined}
                                        className="text-[12px] text-white/60 hover:text-white transition-colors"
                                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                    >
                                        {social.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== MOBILE FOOTER BOTTOM (below md) ===== */}
            <div className="relative w-full md:hidden" style={{ minHeight: '250vw' }}>
                {/* Mobile Footer SVG */}
                <img
                    src="/FOOTER_MOBILE.svg"
                    alt=""
                    className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none object-cover object-top"
                />

                {/* Content — flex to push to bottom */}
                <div className="relative z-20 flex flex-col justify-end h-full px-6 pb-8" style={{ minHeight: '250vw' }}>

                    {/* Contact */}
                    <div className="mb-8">
                        <p
                            className="text-[12px] text-white/40 mb-1"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            Contact us at:
                        </p>
                        <a
                            href="mailto:team@mojingo.co"
                            className="text-[16px] font-medium text-white hover:text-[#FF4F93] transition-colors"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            team@mojingo.co
                        </a>
                    </div>

                    {/* Links stacked */}
                    <div className="flex flex-col gap-4 mb-12">
                        {footerLinks.map((link) => {
                            if (link.to.startsWith('/#')) {
                                return (
                                    <a
                                        key={link.label}
                                        href={link.to}
                                        className="text-[16px] font-medium text-white/80 hover:text-[#FF4F93] transition-colors"
                                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                    >
                                        {link.label}
                                    </a>
                                )
                            }
                            return (
                                <Link
                                    key={link.label}
                                    to={link.to}
                                    className="text-[16px] font-medium text-white/80 hover:text-[#FF4F93] transition-colors"
                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                >
                                    {link.label}
                                </Link>
                            )
                        })}
                    </div>

                    {/* MOJINGO text */}
                    <div className="mb-5">
                        <h3
                            className="text-[56px] font-normal tracking-[0.04em] leading-[0.85] text-white"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            MOJINGO
                        </h3>
                    </div>

                    {/* Logo */}
                    <div className="mb-8">
                        <img
                            src="/logo_mobile.svg"
                            alt="Mojingo Logo"
                            className="h-10 w-auto"
                        />
                    </div>

                    {/* Socials stacked */}
                    <div className="flex flex-col gap-4 mb-10">
                        {socials.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target={social.url !== '#' ? "_blank" : undefined}
                                rel={social.url !== '#' ? "noopener noreferrer" : undefined}
                                className="text-[14px] text-white/60 hover:text-white transition-colors"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                                {social.name}
                            </a>
                        ))}
                    </div>

                    {/* Copyright */}
                    <p
                        className="text-[12px] text-white"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        © 2026 Mojingo Private Limited. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}