// src/components/sections/CtaBanner.jsx
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CtaBanner() {
    return (
        <section className="py-24 px-10">
            <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-[1600px] mx-auto bg-[#FF4F93] rounded-[60px] px-16 py-20 flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden"
            >
                {/* Decorative dot grid overlay */}
                <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                    }}
                />

                {/* Left copy */}
                <div className="relative z-10 max-w-xl">
                    <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
                        Ready to take your growth to the next level?
                    </h2>
                    <p className="text-white/70 text-lg leading-relaxed">
                        Join over 10,000 creators and marketers already using Mojingo.
                    </p>
                </div>

                {/* Right buttons */}
                <div className="relative z-10 flex gap-4 flex-wrap">
                    <Button className="bg-white text-[#FF4F93] hover:bg-white/90 rounded-full px-8 py-4 text-base font-bold h-auto shadow-md">
                        Get started free <ArrowRight size={16} className="ml-2" />
                    </Button>
                    <Button
                        variant="outline"
                        className="border-white text-white hover:bg-white/10 rounded-full px-8 py-4 text-base font-bold h-auto"
                    >
                        Book a demo
                    </Button>
                </div>
            </motion.div>
        </section>
    )
}