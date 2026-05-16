// src/components/sections/HowItWorks.jsx
import { motion } from 'framer-motion'

const steps = [
    {
        id: 1,
        number: '01',
        title: 'Set your mood',
        description: 'Choose what you feel like doing right now.',
        cardBg: 'bg-white',
        content: (
            <div className="mt-3 bg-[#FFF9E5] rounded-xl p-3.5">
                <p className="text-[11px] text-[#3D3D3D] font-medium mb-2.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Choose your mood</p>
                <div className="flex flex-wrap gap-2">
                    <span className="px-3.5 py-1.5 rounded-full bg-[#FF4F93] text-white text-[10px] font-medium">Chill</span>
                    <span className="px-3.5 py-1.5 rounded-full bg-white text-[#3D3D3D] text-[10px] font-medium">Playful</span>
                    <span className="px-3.5 py-1.5 rounded-full bg-white text-[#3D3D3D] text-[10px] font-medium">Heavy</span>
                    <span className="px-3.5 py-1.5 rounded-full bg-white text-[#3D3D3D] text-[10px] font-medium">Adventure</span>
                </div>
            </div>
        ),
    },
    {
        id: 2,
        number: '02',
        title: 'Discover Companions',
        description: 'Browse people near you who share your food.',
        cardBg: 'bg-white',
        content: (
            <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between border border-[#f0f0f0] rounded-[20px] p-2 pr-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#FFF0F5] flex items-center justify-center text-[15px] font-normal text-[#FF4F93]">S</div>
                        <div>
                            <p className="text-[12px] font-bold text-black" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Sarah K.</p>
                            <p className="text-[11px] text-[#3D3D3D]/70 font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Coffee ~ 2km</p>
                        </div>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                </div>
                <div className="flex items-center justify-between border border-[#f0f0f0] rounded-[20px] p-2 pr-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#FFF0F5] flex items-center justify-center text-[15px] font-normal text-[#FF4F93]">A</div>
                        <div>
                            <p className="text-[12px] font-bold text-black" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Aarna P.</p>
                            <p className="text-[11px] text-[#3D3D3D]/70 font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Movie ~ 1km</p>
                        </div>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                </div>
            </div>
        ),
    },
    {
        id: 3,
        number: '03',
        title: 'Chat or call',
        description: 'Connect directly with a quick message.',
        cardBg: 'bg-white',
        content: (
            <div className="mt-4 rounded-xl border border-[#eee] p-3 space-y-2">
                <div className="flex justify-end">
                    <div className="bg-[#FF4F93] text-white text-[10px] rounded-xl rounded-br-sm px-3 py-2 w-max font-normal" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Hey! want to grab Coffee?
                    </div>
                </div>
                <div className="flex justify-start">
                    <div className="bg-[#F5F5F5] text-black text-[10px] rounded-xl rounded-bl-sm px-3 py-2 w-max font-normal" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Sure! I'm at the downtown cafe.
                    </div>
                </div>
                <div className="flex justify-end">
                    <div className="bg-[#FF4F93] text-white text-[10px] rounded-xl rounded-br-sm px-3 py-2 w-max font-normal" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        On my way!
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: 4,
        number: '04',
        title: 'Meet safely',
        description: 'Set place, time, and purpose with verified users.',
        cardBg: 'bg-white',
        content: (
            <div className="mt-4 border border-[#f0f0f0] rounded-[20px] p-3 space-y-3">
                <div className="flex items-center justify-between">
                    <p className="text-[12px] font-bold text-black" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Meetup Confirmed</p>
                    <span className="text-[10px] text-[#FF4F93] bg-[#FFF0F5] font-semibold rounded-full px-2.5 py-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Verified</span>
                </div>
                <div className="flex items-center gap-3 bg-[#FFF9E5] border border-[#FFE899]/50 rounded-xl p-2.5">
                    <div className="flex items-center justify-center pl-1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF4F93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-[12px] font-bold text-black" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Downtown Cafe</p>
                        <p className="text-[10px] text-[#3D3D3D]/70 font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Today at 3:00 PM</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 pl-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <p className="text-[11px] text-[#3D3D3D]/70 font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Coffee & Chat</p>
                </div>
            </div>
        ),
    },
]

export default function HowItWorks() {
    return (
        <section className="pt-0 pb-16 bg-white relative z-10" id="how-it-works">
            <div className="max-w-[1250px] mx-auto md:px-6 md:sm:px-10">
                {/* Background Container */}
                <div className="relative w-full md:px-6 lg:px-12 md:py-14 lg:py-20 flex flex-col items-center">
                    {/* Desktop Background SVG */}
                    <img
                        src="/how_it_works_bg.svg"
                        alt=""
                        className="hidden md:block absolute pointer-events-none z-0 max-w-none"
                        style={{
                            width: '105.5%',
                            height: '106%',
                            left: '0',
                            top: '-6%',
                            objectFit: 'fill'
                        }}
                    />

                    {/* Mobile Background SVG */}
                    <img
                        src="/how_it_works_bg_mobile.svg"
                        alt=""
                        className="block md:hidden w-full h-auto px-4"
                    />

                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="hidden md:block text-center mb-10 relative z-10"
                    >
                        <h2
                            className="text-3xl md:text-4xl font-extrabold text-white mb-2"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            How it works
                        </h2>
                        <p
                            className="text-[15px] text-white font-normal"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            from mood to meetup in four simple steps
                        </p>
                    </motion.div>

                    {/* Cards Row with Arrows */}
                    <div className="hidden md:block relative z-10 w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 lg:gap-y-0 lg:gap-x-10 items-stretch">
                            {steps.map((step, index) => (
                                <div key={step.id} className="relative">
                                    {/* Card */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 25 }}
                                        whileInView={{ 
                                            opacity: 1, 
                                            y: 0,
                                            transition: { duration: 0.4, delay: step.id * 0.1 }
                                        }}
                                        animate={{
                                            x: [0, 1, -1, 0.5, -0.5, 0],
                                            y: [0, -1, 1, -0.5, 0.5, 0],
                                        }}
                                        transition={{
                                            x: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: step.id * 0.2 },
                                            y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: step.id * 0.1 },
                                        }}
                                        whileHover={{ 
                                            scale: 0.98,
                                            borderColor: '#FF4F93',
                                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                            transition: { duration: 0.1, ease: 'easeOut' }
                                        }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.2, ease: 'easeOut' }}
                                        className={`${step.cardBg} rounded-2xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-transparent h-full cursor-default transition-all duration-100`}
                                    >
                                        <span
                                            className="text-2xl font-extrabold text-[#FFB800] block mb-1"
                                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                        >
                                            {step.number}
                                        </span>
                                        <h3
                                            className="text-[18px] font-extrabold text-black mb-1 whitespace-nowrap"
                                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                        >
                                            {step.title}
                                        </h3>
                                        <p
                                            className="text-[12px] text-black font-normal leading-relaxed"
                                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                        >
                                            {step.description}
                                        </p>
                                        {step.content}
                                    </motion.div>

                                    {/* Arrows between cards — desktop only */}
                                    {index === 0 && (
                                        <img
                                            src="/arrow_upwards.svg"
                                            alt=""
                                            className="hidden lg:block absolute -right-[60px] xl:-right-[70px] -top-11.5 w-[90px] xl:w-[110px] z-20 pointer-events-none"
                                        />
                                    )}
                                    {index === 1 && (
                                        <img
                                            src="/arrow_downwards.svg"
                                            alt=""
                                            className="hidden lg:block absolute -right-[60px] xl:-right-[70px] -bottom-11.5 w-[90px] xl:w-[110px] z-20 pointer-events-none"
                                        />
                                    )}
                                    {index === 2 && (
                                        <img
                                            src="/arrow_upwards.svg"
                                            alt=""
                                            className="hidden lg:block absolute -right-[60px] xl:-right-[70px] -top-11.5 w-[90px] xl:w-[110px] z-20 pointer-events-none"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
