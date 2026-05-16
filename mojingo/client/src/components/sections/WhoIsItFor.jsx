import { motion } from 'framer-motion'
import { Briefcase, Coffee, Gamepad2, Plane, MapPin, PartyPopper } from 'lucide-react'

const targets = [
    {
        id: 1,
        title: 'Working Professionals',
        subtitle: 'Networking over coffee or working sessions',
        Icon: Briefcase,
        color: '#FFB800',
        bg: '#FFF9E5'
    },
    {
        id: 2,
        title: 'Coffee or Lunch Companions',
        subtitle: 'Never eat alone again',
        Icon: Coffee,
        color: '#FF4F93',
        bg: '#FFF0F5'
    },
    {
        id: 3,
        title: 'Gamers & Hobbyists',
        subtitle: 'Squad up for games or hobby meetups',
        Icon: Gamepad2,
        color: '#FF4F93',
        bg: '#FFF0F5'
    },
    {
        id: 4,
        title: 'Solo Travelers',
        subtitle: 'Explore new places with a companion',
        Icon: Plane,
        color: '#FFB800',
        bg: '#FFF9E5'
    },
    {
        id: 5,
        title: 'People new to city',
        subtitle: 'Find your first local friends instantly',
        Icon: MapPin,
        color: '#FFB800',
        bg: '#FFF9E5'
    },
    {
        id: 6,
        title: 'Event or Activity Partners',
        subtitle: 'Concerts, hikes, workshops - together',
        Icon: PartyPopper,
        color: '#FF4F93',
        bg: '#FFF0F5'
    }
]

export default function WhoIsItFor() {
    return (
        <section className="relative z-10 bg-white" id="who-it-is-for">
            {/* Background Image Container */}
            <div 
                className="w-full py-16 md:py-24"
                style={{ 
                    backgroundImage: 'url(/whoisitfor_bg.svg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className="max-w-[1100px] mx-auto px-6 sm:px-10">
                    {/* Title & Subtitle */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-14 md:mb-16"
                    >
                        <h2
                            className="text-3xl md:text-[42px] font-extrabold text-[#111111] mb-3"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            Who it's for
                        </h2>
                        <p
                            className="text-[14px] md:text-[15px] text-[#3D3D3D]/70 font-normal"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            Mojingo is for everyone who values real-time connections.
                        </p>
                    </motion.div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-y-14 gap-x-8 md:gap-x-12 max-w-[850px] mx-auto">
                        {targets.map((item, index) => (
                            <motion.div 
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="flex items-center gap-4 md:gap-6"
                            >
                                <div 
                                    className="w-[44px] h-[44px] md:w-[56px] md:h-[56px] rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: item.bg }}
                                >
                                    <item.Icon size={24} className="scale-75 md:scale-100" style={{ color: item.color }} strokeWidth={1.75} />
                                </div>
                                <div className="flex flex-col gap-0.5 md:gap-1">
                                    <h3 
                                        className="text-[14px] md:text-[17px] font-bold text-[#111111] whitespace-nowrap"
                                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                    >
                                        {item.title}
                                    </h3>
                                    <p 
                                        className="text-[11px] sm:text-[12px] md:text-[14px] text-[#3D3D3D]/60 font-medium whitespace-nowrap"
                                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                    >
                                        {item.subtitle}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
