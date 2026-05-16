import { motion } from 'framer-motion'
import { ShieldCheck, MapPin, Radio, Clock, Eye } from 'lucide-react'

const safetyFeatures = [
    {
        id: 1,
        title: 'OTP verified Profiles',
        Icon: ShieldCheck,
    },
    {
        id: 2,
        title: 'Live location sharing',
        Icon: MapPin,
    },
    {
        id: 3,
        title: 'Real - time tracking',
        Icon: Radio,
    },
    {
        id: 4,
        title: 'Emergency SOS Button',
        Icon: null, // custom SOS badge
    },
    {
        id: 5,
        title: 'No private meetups after 10 PM',
        Icon: Clock,
    },
    {
        id: 6,
        title: '24/7 moderation provided',
        Icon: Eye,
    },
]

export default function SafetyComesFirst() {
    return (
        <section className="relative z-10 overflow-hidden" id="safety">
            {/* Desktop background */}
            <div
                className="w-full py-20 md:py-28 relative"
                style={{
                    backgroundImage: 'url(/safety_comes_first_bg.svg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: '#0D0D2B',
                }}
            >
                {/* Mobile background overlay */}
                <img
                    src="/safety_comes_first_bg_mobile.svg"
                    alt=""
                    className="md:hidden absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
                />

                <div className="relative z-10 max-w-[1100px] mx-auto px-6 sm:px-10">
                    {/* Title & Subtitle */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12 md:mb-16"
                    >
                        <h2
                            className="text-3xl md:text-[42px] font-extrabold text-white mb-3 leading-[1.2]"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            Safety comes first. Always.
                        </h2>
                        <p
                            className="text-[13px] md:text-[15px] text-white/60 font-normal"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            Every feature in Mojingo is designed with your safety in mind.
                        </p>
                    </motion.div>

                    {/* Feature Pills Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-[900px] mx-auto">
                        {safetyFeatures.map((feature, index) => (
                            <motion.div
                                key={feature.id}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ 
                                    y: -8, 
                                    scale: 1.02,
                                    borderColor: 'rgba(255, 215, 0, 0.4)',
                                    backgroundColor: 'rgba(26, 26, 68, 0.9)',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                                    transition: { duration: 0.1, ease: 'easeOut' }
                                }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="flex items-center gap-4 px-5 py-4 rounded-2xl border border-[#2A2A50] bg-[#12123A]/60 backdrop-blur-sm cursor-default transition-colors duration-100"
                            >
                                {/* Icon */}
                                <div className="w-10 h-10 rounded-full border-2 border-[#FFD700]/40 flex items-center justify-center flex-shrink-0">
                                    {feature.Icon ? (
                                        <feature.Icon size={18} className="text-[#FFD700]" strokeWidth={2} />
                                    ) : (
                                        <span
                                            className="text-[10px] font-extrabold text-[#0D0D2B] bg-[#FFD700] rounded px-1.5 py-0.5 leading-none"
                                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                        >
                                            SOS
                                        </span>
                                    )}
                                </div>
                                <span
                                    className="text-[13px] md:text-[14px] font-medium text-white whitespace-nowrap"
                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                >
                                    {feature.title}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
