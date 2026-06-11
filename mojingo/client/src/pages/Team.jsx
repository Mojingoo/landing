import { motion } from 'framer-motion'
import { Linkedin } from 'lucide-react'
import { hoverCardScale } from '@/lib/animations'

export default function Team() {
    return (
        <section className="relative z-10 bg-white pt-16 md:pt-24 pb-24 min-h-[60vh] flex flex-col items-center" id="team-page">
            <div className="max-w-[1000px] mx-auto px-6 sm:px-10 w-full">
                
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h1
                        className="text-[32px] sm:text-[40px] md:text-[48px] font-extrabold text-[#3D3D3D] leading-[1.15] mb-4"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        People Behind Mojingo!
                    </h1>
                </motion.div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-[800px] mx-auto">
                    
                    {/* Card 1: Rishi */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={hoverCardScale('#FF4F93')}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-white rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-[#f0f0f0] transition-colors duration-300 flex flex-col group"
                    >
                        {/* Image Container */}
                        <div className="w-full aspect-square relative overflow-hidden bg-[#FFF0F5]">
                            <img 
                                src="/rishi.jpeg" 
                                alt="Rishi Raj Agarwal"
                                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        {/* Content */}
                        <div className="p-6 md:p-8 flex flex-col items-center text-center">
                            <h3 className="text-[20px] md:text-[24px] font-extrabold text-[#111111] mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                Rishi Raj Agarwal
                            </h3>
                            <p className="text-[#FF4F93] font-semibold text-[14px] md:text-[15px] mb-6">
                                Co-founder
                            </p>
                            <a 
                                href="https://www.linkedin.com/in/rishi-raj-agarwal-07aa31136" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FFF0F5] text-[#FF4F93] hover:bg-[#FF4F93] hover:text-white transition-colors duration-300"
                                aria-label="Rishi's LinkedIn"
                            >
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </motion.div>

                    {/* Card 2: Anjan */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={hoverCardScale('#FFB800')}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-[#f0f0f0] transition-colors duration-300 flex flex-col group"
                    >
                        {/* Image Container */}
                        <div className="w-full aspect-square relative overflow-hidden bg-[#FFF9E5]">
                            <img 
                                src="/anjan.jpeg" 
                                alt="Anjan Raj Agarwal"
                                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        {/* Content */}
                        <div className="p-6 md:p-8 flex flex-col items-center text-center">
                            <h3 className="text-[20px] md:text-[24px] font-extrabold text-[#111111] mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                Anjan Raj Agarwal
                            </h3>
                            <p className="text-[#FFB800] font-semibold text-[14px] md:text-[15px] mb-6">
                                Co-founder
                            </p>
                            <a 
                                href="https://www.linkedin.com/in/anjanraj" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FFF9E5] text-[#FFB800] hover:bg-[#FFB800] hover:text-white transition-colors duration-300"
                                aria-label="Anjan's LinkedIn"
                            >
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
