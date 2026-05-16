import { motion } from 'framer-motion'

const features = [
    { id: 1, src: '/CF1.svg', alt: 'Mood-Based Discovery' },
    { id: 2, src: '/CF2.svg', alt: 'Quick Companion Posts' },
    { id: 3, src: '/CF3.svg', alt: 'Real Meetup Requests' },
    { id: 4, src: '/CF4.svg', alt: 'Free/Paid Companionship' },
]

export default function OurCoreFeatures() {
    return (
        <section className="py-16 md:py-24 bg-white relative z-10" id="core-features">
            <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
                {/* Title & Subtitle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14 md:mb-20"
                >
                    <h2
                        className="text-3xl md:text-[42px] font-extrabold text-[#111111] mb-3"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Our Core Features
                    </h2>
                    <p
                        className="text-[14px] md:text-[15px] text-[#3D3D3D]/70 font-medium"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Everything you need for real-life companionship.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-[1300px] mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="flex justify-center w-full"
                        >
                            <img 
                                src={feature.src} 
                                alt={feature.alt}
                                className="w-full max-w-[300px] sm:max-w-[342px] h-auto object-contain hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
