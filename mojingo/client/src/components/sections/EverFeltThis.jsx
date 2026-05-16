// src/components/sections/EverFeltThis.jsx
import { motion } from 'framer-motion'
import { Heart, Copy, Users, Frown } from 'lucide-react'

const cards = [
    {
        id: 1,
        icon: Heart,
        iconColor: '#FF4F93',
        iconBg: '#FFF0F5',
        borderColor: 'border-[#FFE8EF]',
        text: "You want company, not romance. just pure connection.",
        gridClass: "order-1 md:order-none md:col-span-7 md:w-max md:-rotate-[2deg]",
    },
    {
        id: 2,
        icon: Copy,
        iconColor: '#FFB800',
        iconBg: '#FFF9E5',
        borderColor: 'border-[#FFE899]',
        text: "Your want to step out, not scroll endlessly.",
        gridClass: "order-2 md:order-none md:col-span-5 md:mt-6 lg:mt-10",
    },
    {
        id: 3,
        icon: Users,
        iconColor: '#FFB800',
        iconBg: '#FFF9E5',
        borderColor: 'border-[#FFE899]',
        text: "You want to talk, play, chill, or attend something with someone.",
        gridClass: "order-4 md:order-none md:col-span-5 lg:-mt-4",
    },
    {
        id: 4,
        icon: Frown,
        iconColor: '#FF4F93',
        iconBg: '#FFF0F5',
        borderColor: 'border-[#FFE8EF]',
        text: "Your just don't want to be alone right now.",
        gridClass: "order-3 md:order-none md:col-span-7 md:mt-4 md:rotate-[2.5deg]",
    }
]

export default function EverFeltThis() {
    return (
        <section className="pt-4 pb-8 lg:pb-12 relative z-10 bg-white" id="ever-felt-this">
            <div className="max-w-[1000px] mx-auto px-6 sm:px-10">
                {/* Section Title */}
                <h2
                    className="text-center text-4xl font-extrabold text-[#3D3D3D] mb-16"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                    Ever felt this?
                </h2>

                {/* Floating Cards Container */}
                <div className="w-full max-w-[820px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 lg:gap-8">
                    {cards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <motion.div
                                key={card.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ 
                                    opacity: 1, 
                                    y: 0,
                                    transition: { duration: 0.5, delay: card.id * 0.1 }
                                }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                                className={`
                                    bg-white rounded-2xl p-4 sm:p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)]
                                    border ${card.borderColor} 
                                    w-full
                                    ${card.gridClass}
                                    cursor-default transition-all duration-100
                                `}
                                whileHover={{ scale: 0.98, rotate: 0, zIndex: 30, transition: { duration: 0.1, ease: 'easeOut' } }}
                            >
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center mb-4"
                                    style={{ backgroundColor: card.iconBg }}
                                >
                                    <Icon size={16} color={card.iconColor} strokeWidth={2.5} />
                                </div>
                                <p
                                    className="text-[15px] font-semibold text-[#3D3D3D] leading-snug"
                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                >
                                    {card.text}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom text & banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-16 md:mt-12 text-center"
                >
                    <p
                        className="text-[17px] text-[#3D3D3D]/80 font-medium mb-6"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Most platforms are built for attention.
                    </p>

                    <div
                        className="mx-auto w-full max-w-[800px] rounded-2xl px-6 py-5"
                        style={{
                            background: 'linear-gradient(90deg, #FFF9E5 0%, #FFF0F5 50%, #FFE8EF 100%)'
                        }}
                    >
                        <motion.h3
                            animate={{
                                backgroundPosition: ['0% center', '200% center']
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent"
                            style={{
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                backgroundImage: 'linear-gradient(90deg, #FF4F93, #FF9D42, #FF4F93)',
                                backgroundSize: '200% auto',
                            }}
                        >
                            Mojingo helps you find real people for real moments.
                        </motion.h3>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
