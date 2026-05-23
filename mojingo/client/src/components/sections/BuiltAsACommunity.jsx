import { motion } from 'framer-motion'
import { UserPlus, Heart, RefreshCw } from 'lucide-react'
import { hoverCardScale, hoverWobble } from '@/lib/animations'

export default function BuiltAsACommunity() {
    return (
        <section className="pt-8 lg:pt-12 pb-16 bg-white overflow-hidden relative z-10" id="community">
            <div className="max-w-[1250px] mx-auto px-6 sm:px-10">
                {/* Title & Subtitle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12 lg:mb-16"
                >
                    <h2
                        className="text-4xl md:text-[42px] font-extrabold text-[#3D3D3D] mb-4 leading-[1.2]"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Built as a community,<br className="hidden md:block" />
                        not a one-time match.
                    </h2>
                    <p
                        className="text-[14px] md:text-[15px] text-[#3D3D3D]/70 font-normal max-w-2xl mx-auto leading-relaxed"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Mojingo is designed for long-term social connection, It's not about one date -<br className="hidden md:block" />
                        it's about building real relationships over shared moments.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-16 items-center">
                    {/* Left Column - Pills */}
                    <div className="flex flex-col gap-5 md:gap-6 w-full lg:col-span-7 xl:col-span-6 mx-auto lg:ml-0">
                        {/* Pill 1 */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            whileHover={hoverCardScale('#FFB800')}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="bg-white rounded-3xl md:rounded-full px-5 py-4 md:px-6 md:py-4 flex items-center gap-4 md:gap-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#f0f0f0] cursor-default transition-colors duration-100"
                        >
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#FFF9E5] flex items-center justify-center flex-shrink-0">
                                <UserPlus size={24} className="text-[#FFB800]" />
                            </div>
                            <p className="text-[13.5px] md:text-[15px] font-medium text-[#3D3D3D] whitespace-normal lg:whitespace-nowrap leading-snug md:leading-normal" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                Add companions you trust.
                            </p>
                        </motion.div>

                        {/* Pill 2 */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            whileHover={hoverCardScale('#FF4F93')}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                            className="bg-white rounded-3xl md:rounded-full px-5 py-4 md:px-6 md:py-4 flex items-center gap-4 md:gap-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#f0f0f0] cursor-default transition-colors duration-100"
                        >
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#FFF0F5] flex items-center justify-center flex-shrink-0">
                                <Heart size={24} className="text-[#FF4F93]" />
                            </div>
                            <p className="text-[13.5px] md:text-[15px] font-medium text-[#3D3D3D] whitespace-normal lg:whitespace-nowrap leading-snug md:leading-normal" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                Build your personal social circle.
                            </p>
                        </motion.div>

                        {/* Pill 3 */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            whileHover={hoverCardScale('#FFB800')}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                            className="bg-white rounded-3xl md:rounded-full px-5 py-4 md:px-6 md:py-4 flex items-center gap-4 md:gap-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#f0f0f0] cursor-default transition-colors duration-100"
                        >
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#FFF9E5] flex items-center justify-center flex-shrink-0">
                                <RefreshCw size={24} className="text-[#FFB800]" />
                            </div>
                            <p className="text-[13.5px] md:text-[15px] font-medium text-[#3D3D3D] whitespace-normal lg:whitespace-nowrap leading-snug md:leading-normal" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                Reconnect anytime based on mood and availability.
                            </p>
                        </motion.div>
                    </div>

                    {/* Right Column - Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative w-full lg:col-span-5 xl:col-span-6 flex justify-center lg:justify-end lg:translate-x-8 xl:translate-x-12"
                    >
                        <motion.img 
                            src="/built_as_community.svg" 
                            alt="Built as a community"
                            className="w-full max-w-[550px] lg:max-w-none lg:w-[130%] xl:w-[120%] h-auto"
                            style={{ objectFit: 'contain' }}
                            whileHover={hoverWobble}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
