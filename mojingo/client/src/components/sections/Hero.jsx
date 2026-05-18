// src/components/sections/Hero.jsx
import { motion } from 'framer-motion'
import { ShieldCheck, Shield, Users } from 'lucide-react'
import { fadeUp, stagger } from '@/lib/animations'

const badges = [
    { icon: ShieldCheck, label: 'Verified Profiles', color: '#FF4F93' },
    { icon: Shield, label: 'Safety-first', color: '#FF4F93' },
    { icon: Users, label: 'No swiping', color: '#FF4F93' },
]

export default function Hero() {
    return (
        <section
            id="home"
            className="relative min-h-[calc(100vh-72px)] pt-12 lg:pt-16 pb-8 flex items-center bg-white overflow-hidden"
        >
            <div className="max-w-[1200px] mx-auto px-6 sm:px-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">

                {/* LEFT — Copy */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col gap-7"
                >
                    {/* Yellow badge */}
                    <motion.div variants={fadeUp}>
                        <span className="inline-flex items-center gap-2 bg-[#FFF9E5] text-[#3D3D3D] text-[13px] font-medium px-3.5 py-1.5 rounded-full border border-[#FFE899]">
                            <span className="text-[#FF4F93] text-[10px]">●</span>
                            A companionship platform
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        variants={fadeUp}
                        className="text-[36px] sm:text-[42px] lg:text-[48px] font-extrabold leading-[1.15] tracking-tight text-[#3D3D3D]"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        YOUR MOOD.{' '}
                        <span className="text-[#FF9D42]">YOUR</span>
                        <br />
                        <motion.span
                            animate={{ backgroundPosition: ['0% center', '200% center'] }}
                            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                            className="bg-[linear-gradient(to_right,#FF4F93,#FF8E76,#FF4F93)] bg-[length:200%_auto] bg-clip-text text-transparent"
                        >
                            MOMENT.
                        </motion.span>{' '}
                        YOUR PEOPLE
                    </motion.h1>

                    {/* Subtext */}
                    <motion.p
                        variants={fadeUp}
                        className="text-[15px] sm:text-[16px] text-[#3D3D3D]/80 max-w-[440px] leading-relaxed"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Find companions for the moment you're living right now. Real
                        people, real meetups, real connection.
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div variants={fadeUp}>
                        <a
                            href="#open-mojingo"
                            className="inline-flex items-center justify-center bg-[#FF4F93] hover:bg-[#e84384] active:scale-[0.97] text-white text-[15px] font-medium rounded-full px-8 py-3.5 shadow-[0_4px_20px_rgba(255,79,147,0.35)] hover:shadow-[0_6px_28px_rgba(255,79,147,0.45)] transition-all duration-200"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            id="hero-cta-open-mojingo"
                        >
                            Open Mojingo
                        </a>
                    </motion.div>

                    {/* Trust badges */}
                    <motion.div
                        variants={fadeUp}
                        className="flex flex-wrap items-center gap-6 sm:gap-8 pt-4"
                    >
                        {badges.map(({ icon: Icon, label }) => (
                            <div
                                key={label}
                                className="flex items-center gap-2"
                            >
                                <div className="flex items-center justify-center">
                                    <Icon size={18} className="text-[#FF4F93]" strokeWidth={2.5} />
                                </div>
                                <span
                                    className="text-sm font-medium text-[#3D3D3D]"
                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                >
                                    {label}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* RIGHT — Graphics */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="flex items-center justify-center relative w-full h-full mt-8 lg:mt-0 min-h-[500px] lg:min-h-[600px]"
                >
                    
                    <div className="relative w-full max-w-[280px] xl:max-w-[320px] aspect-[1/2] flex items-center justify-center z-10">
                        {/* Base Phone Mockup */}
                        <motion.img
                            src="/Rectangle.svg"
                            alt="Mojingo App Mockup"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(255,79,147,0.15)]"
                        />

                        {/* Top Left Floating Element */}
                        <motion.img
                            src="/top_left.svg"
                            alt="Companion Post"
                            animate={{ y: [0, -12, 0] }}
                            transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" }, default: { type: 'spring', stiffness: 200, damping: 20 } }}
                            whileHover={{ scale: 1.05, x: -15, y: -15 }}
                            className="absolute -left-20 top-16 w-48 drop-shadow-lg cursor-pointer"
                        />

                        {/* Top Right Floating Element */}
                        <motion.img
                            src="/top_right.svg"
                            alt="Let's Meet"
                            animate={{ y: [0, -15, 0] }}
                            transition={{ y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }, default: { type: 'spring', stiffness: 200, damping: 20 } }}
                            whileHover={{ scale: 1.05, x: 15, y: -15 }}
                            className="absolute -right-6 top-1/3 w-28 drop-shadow-lg cursor-pointer z-10"
                        />

                        {/* Bottom Left Floating Element */}
                        <motion.img
                            src="/bottom_left.svg"
                            alt="Upcoming Meetups"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }, default: { type: 'spring', stiffness: 200, damping: 20 } }}
                            whileHover={{ scale: 1.05, x: -15, y: 15 }}
                            className="absolute -left-20 bottom-48 w-44 drop-shadow-lg cursor-pointer z-10"
                        />

                        {/* Bottom Right Floating Element */}
                        <motion.img
                            src="/bottom_right.svg"
                            alt="Profile Badge"
                            animate={{ y: [0, -14, 0] }}
                            transition={{ y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }, default: { type: 'spring', stiffness: 200, damping: 20 } }}
                            whileHover={{ scale: 1.05, x: 15, y: 15 }}
                            className="absolute -right-12 bottom-8 w-40 drop-shadow-lg cursor-pointer z-10"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}