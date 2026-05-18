// src/components/sections/WhatIsMojingo.jsx
import { motion } from 'framer-motion'
import { Zap, Smile, Sparkles } from 'lucide-react'
import { hoverWobble, hoverCardScale } from '@/lib/animations'

const features = [
    {
        id: 1,
        icon: Zap,
        iconColor: '#FFB800',
        iconBg: '#FFF9E5',
        title: 'Real-time discovery',
        description: 'You want company, not romance, just pure connection.',
    },
    {
        id: 2,
        icon: Smile,
        iconColor: '#FF4F93',
        iconBg: '#FFF0F5',
        title: 'Mood-based connection',
        description: 'Match with people based on what you feel like doing, not algorithms.',
    },
    {
        id: 3,
        icon: Sparkles,
        iconColor: '#FFB800',
        iconBg: '#FFF9E5',
        title: 'Real-life companionship',
        description: 'Move beyond the screen. Meet people for real moments in real places.',
    },
]

export default function WhatIsMojingo() {
    return (
        <section className="pt-8 lg:pt-12 pb-8 bg-white overflow-hidden relative z-10" id="what-is-mojingo">
            <div className="max-w-[1250px] mx-auto px-6 sm:px-10">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-2 lg:mb-4"
                >
                    <h2
                        className="text-4xl md:text-[42px] font-extrabold text-[#3D3D3D] mb-4"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        What is Mojingo?
                    </h2>
                    <p
                        className="text-[15px] md:text-base text-[#3D3D3D]/70 font-medium max-w-[600px] mx-auto leading-relaxed"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Mojingo is a mood-based companion platform that connects you with real people
                        who want to do the same thing as you – right now, near you.
                    </p>
                </motion.div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-12 items-center">
                    {/* LEFT — Graphic */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center justify-start lg:-ml-12"
                    >
                        <motion.img
                            src="/What_is_Mojingo.svg"
                            alt="What is Mojingo"
                            className="w-full max-w-[650px]"
                            whileHover={hoverWobble}
                        />
                    </motion.div>

                    {/* RIGHT — Feature Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="flex flex-col gap-5"
                    >
                        {features.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={feature.id}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: feature.id * 0.12 }}
                                    whileHover={hoverCardScale(feature.iconColor)}
                                    className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-[#FFE8EF] shadow-[0_4px_20px_rgba(0,0,0,0.03)] cursor-pointer"
                                >
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                                        style={{ backgroundColor: feature.iconBg }}
                                    >
                                        <Icon size={18} color={feature.iconColor} strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <h3
                                            className="text-[17px] font-bold text-[#3D3D3D] mb-1"
                                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                        >
                                            {feature.title}
                                        </h3>
                                        <p
                                            className="text-[14px] text-[#3D3D3D]/65 font-medium leading-relaxed"
                                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                        >
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
