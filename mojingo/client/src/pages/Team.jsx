import { motion } from 'framer-motion'

export default function Team() {
    return (
        <section className="relative z-10 bg-white pt-16 md:pt-24 pb-16 min-h-[60vh] flex flex-col items-center justify-center" id="team-page">
            <div className="max-w-[1100px] mx-auto px-6 sm:px-10 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold text-[#111111] leading-[1.15] mb-4"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                    Our Team
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-[13px] md:text-[15px] text-[#3D3D3D]/70 font-normal max-w-[600px] mx-auto"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                    Team sections coming soon!
                </motion.p>
            </div>
        </section>
    )
}
