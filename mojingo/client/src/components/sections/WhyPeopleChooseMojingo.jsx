import { motion } from 'framer-motion'
import { CircleCheckBig } from 'lucide-react'

const points = [
    'Not a dating app',
    'No swiping',
    'No fake profiles',
    'Real intent',
    'Real moments',
]

export default function WhyPeopleChooseMojingo() {
    return (
        <section className="relative z-10 bg-white" id="why-people-choose">
            <div
                className="w-full py-16 md:py-24"
                style={{
                    backgroundImage: 'url(/whoisitfor_bg.svg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="max-w-[1100px] mx-auto px-6 sm:px-10">

                    {/* ===== DESKTOP LAYOUT (md+) ===== */}
                    <div className="hidden md:flex flex-row items-center gap-16">
                        {/* Left Side: Title + Points */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="flex-1"
                        >
                            <h2
                                className="text-[42px] font-extrabold text-[#111111] mb-12 leading-[1.15]"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                                Why people<br />choose Mojingo
                            </h2>

                            <div className="flex flex-col gap-8">
                                {points.map((point, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -15 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.35, delay: index * 0.08 }}
                                        className="flex items-center gap-3.5"
                                    >
                                        <CircleCheckBig
                                            size={26}
                                            className="text-[#FF4F93] flex-shrink-0"
                                            strokeWidth={1.5}
                                        />
                                        <span
                                            className="text-[17px] font-normal text-[#111111]"
                                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                        >
                                            {point}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right Side: Graphic */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            className="flex-1 flex justify-center"
                        >
                            <img
                                src="/whypeoplechoosemojingo.svg"
                                alt="Why people choose Mojingo"
                                className="w-full max-w-[550px] h-auto object-contain"
                            />
                        </motion.div>
                    </div>

                    {/* ===== MOBILE LAYOUT (below md) ===== */}
                    <div className="flex md:hidden flex-col items-center">
                        {/* Title */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-[28px] font-extrabold text-[#111111] text-center leading-[1.15] mb-8"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            Why people choose<br />Mojingo
                        </motion.h2>

                        {/* Graphic */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="w-full flex justify-center mb-10"
                        >
                            <img
                                src="/whypeoplechoosemojingo.svg"
                                alt="Why people choose Mojingo"
                                className="w-full max-w-[340px] h-auto object-contain"
                            />
                        </motion.div>

                        {/* Points in 2-column grid */}
                        <div className="grid grid-cols-2 gap-x-4 gap-y-5 w-full max-w-[360px]">
                            {points.map((point, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: index * 0.07 }}
                                    className={`flex items-center gap-2.5 ${index === points.length - 1 ? 'col-span-2 justify-center' : ''}`}
                                >
                                    <CircleCheckBig
                                        size={22}
                                        className="text-[#FF4F93] flex-shrink-0"
                                        strokeWidth={1.5}
                                    />
                                    <span
                                        className="text-[14px] font-normal text-[#111111] whitespace-nowrap"
                                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                    >
                                        {point}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
