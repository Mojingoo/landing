import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import api from '@/lib/api'
import LegalSectionCard from '../components/legal/LegalSectionCard'

export default function Legal() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get('/legal')
            .then(res => setCategories(res.data))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="min-h-screen bg-white pt-16">
            <main className="max-w-4xl mx-auto px-6 pb-24">

                {/* Loading skeletons */}
                {loading && (
                    <div className="space-y-12 animate-pulse">
                        {[1, 2, 3].map(i => (
                            <div key={i}>
                                <div className="h-8 bg-gray-100 rounded-full w-64 mb-8 mx-auto" />
                                <div className="space-y-4">
                                    <div className="h-40 bg-gray-100 rounded-[24px]" />
                                    <div className="h-32 bg-gray-100 rounded-[24px]" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* All categories rendered vertically — no tabs */}
                {!loading && (
                    <div className="space-y-16">
                        {categories
                            .sort((a, b) => a.order - b.order)
                            .map((category, ci) => {
                                const activeSections = (category.sections || [])
                                    .filter(s => s.isActive)
                                    .sort((a, b) => a.order - b.order)

                                if (activeSections.length === 0) return null

                                return (
                                    <motion.div
                                        key={category.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: ci * 0.1 }}
                                    >
                                        {/* Category heading */}
                                        <h2
                                            className={`text-[24px] md:text-[30px] font-extrabold text-[#111111] ${ci === 0 ? 'mb-8' : category.slug === 'cookies' ? 'mb-3 uppercase' : 'mb-8 uppercase'} text-center`}
                                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                        >
                                            {category.title}
                                        </h2>
                                        {category.slug === 'cookies' && (
                                            <p className="text-center text-[#3D3D3D]/80 text-[15px] mb-8 font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                                Date of Last Revision: 28th July 2025
                                            </p>
                                        )}

                                        {/* Sections */}
                                        <div className="space-y-0">
                                            {activeSections.map(section => (
                                                <LegalSectionCard key={section.id} section={section} />
                                            ))}
                                            
                                            {/* Hardcoded Privacy Policy Contact Card */}
                                            {category.slug === 'privacy' && (
                                                <div className="mt-8 bg-[#FFF5F7] border border-[#FFE1EB] rounded-[24px] p-8 md:p-10">
                                                    <div className="flex items-center gap-4 mb-6">
                                                        <div className="w-12 h-12 rounded-[14px] bg-[#FFE1EB]/60 flex items-center justify-center shrink-0">
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF4F93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                                                <circle cx="9" cy="7" r="4" />
                                                                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                                            </svg>
                                                        </div>
                                                        <h3 
                                                            className="text-[22px] md:text-[26px] font-extrabold text-[#111111]"
                                                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                                        >
                                                            Contact Us
                                                        </h3>
                                                    </div>
                                                    
                                                    <p 
                                                        className="text-[15px] text-[#3D3D3D]/80 leading-relaxed mb-10 max-w-4xl"
                                                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                                    >
                                                        If you have any questions about this Privacy Policy or wish to exercise your rights, please contact our Data Protection Officer at:
                                                    </p>

                                                    <div className="flex flex-col md:flex-row gap-8 md:gap-24">
                                                        {/* Email */}
                                                        <div className="flex items-start gap-4">
                                                            <div className="w-12 h-12 rounded-full bg-[#FFE1EB]/60 flex items-center justify-center shrink-0 mt-1">
                                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF4F93" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                                    <rect width="20" height="16" x="2" y="4" rx="2" />
                                                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                                                </svg>
                                                            </div>
                                                            <div>
                                                                <p className="text-[14px] font-semibold text-[#3D3D3D]/60 mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Email Us</p>
                                                                <p className="text-[16px] font-bold text-[#3D3D3D]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>info@mojingo.app</p>
                                                            </div>
                                                        </div>

                                                        {/* Location */}
                                                        <div className="flex items-start gap-4">
                                                            <div className="w-12 h-12 rounded-full bg-[#FFE1EB]/60 flex items-center justify-center shrink-0 mt-1">
                                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF4F93" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                                                    <circle cx="12" cy="10" r="3" />
                                                                </svg>
                                                            </div>
                                                            <div>
                                                                <p className="text-[14px] font-semibold text-[#3D3D3D]/60 mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Location</p>
                                                                <p className="text-[16px] font-bold text-[#3D3D3D]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>101C Ashesh Enclave, Lalpur, Ranchi</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )
                            })}

                        {/* Empty state */}
                        {categories.every(c => (c.sections || []).filter(s => s.isActive).length === 0) && (
                            <div className="text-center py-20">
                                <img src="/logo_mobile.svg" alt="" className="w-16 h-auto opacity-20 mx-auto mb-4" />
                                <p className="text-[#3D3D3D]/40 text-sm">No legal content published yet.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Policy Updates and Contact */}
                {!loading && (
                    <div className="mt-16 bg-[#FFFCF8] border border-[#F3EAD8] rounded-[24px] p-8 md:p-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-[14px] bg-[#FFF5E5] flex items-center justify-center shrink-0">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DEAA3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <path d="M12 18v-6" />
                                    <path d="M9 15h6" />
                                </svg>
                            </div>
                            <h2 
                                className="text-[24px] md:text-[28px] font-extrabold text-[#111111]"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                                Policy Updates and Contact
                            </h2>
                        </div>
                        
                        <p 
                            className="text-[15px] text-[#3D3D3D]/80 leading-relaxed mb-10 max-w-4xl"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            We may update this Cookies Policy from time to time to reflect changes in technology or legislation. Any changes will be posted on this page. If you have any questions about our use of cookies, please contact us at:
                        </p>

                        <div className="flex flex-col md:flex-row gap-8 md:gap-24">
                            {/* Email */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#FFF5E5] flex items-center justify-center shrink-0 mt-1">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DEAA3D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="20" height="16" x="2" y="4" rx="2" />
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-[14px] font-semibold text-[#3D3D3D]/60 mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Email Us</p>
                                    <p className="text-[16px] font-bold text-[#3D3D3D]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>info@mojingo.app</p>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#FFF5E5] flex items-center justify-center shrink-0 mt-1">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DEAA3D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-[14px] font-semibold text-[#3D3D3D]/60 mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Location</p>
                                    <p className="text-[16px] font-bold text-[#3D3D3D]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>101C Ashesh Enclave, Lalpur, Ranchi</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}