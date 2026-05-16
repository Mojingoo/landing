import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '@/lib/api'

export default function ContactUs() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
    })
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(null)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.firstName || !formData.email || !formData.message) return

        setLoading(true)
        setStatus(null)
        try {
            const name = `${formData.firstName} ${formData.lastName}`.trim()
            await api.post('/contacts', {
                name,
                email: formData.email,
                subject: 'New Contact Form Submission',
                message: formData.phone ? `Phone: ${formData.phone}\n\n${formData.message}` : formData.message
            })
            setStatus('success')
            setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' })
        } catch (error) {
            setStatus('error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="relative z-10 bg-white pt-8 md:pt-16 pb-0" id="contact-us-page">
            {/* Heading Area */}
            <div className="max-w-[1100px] mx-auto px-6 sm:px-10 text-center mb-10 md:mb-16">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold text-[#111111] leading-[1.15] mb-4"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                    Let's Talk — We're Here for You
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-[13px] md:text-[15px] text-[#3D3D3D]/70 font-normal max-w-[600px] mx-auto"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                    Got questions, ideas, or feedback? Reach out anytime – the Mojingo team loves hearing from you.
                </motion.p>
            </div>

            {/* Main Content Area */}
            <div className="max-w-[1100px] mx-auto px-6 sm:px-10 pb-16 md:pb-24">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16 lg:gap-20">

                    {/* Left Side: Graphic (Desktop) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="hidden md:flex flex-1 justify-center items-center"
                    >
                        <img
                            src="/whypeoplechoosemojingo.svg"
                            alt="Contact Mojingo"
                            className="w-full max-w-[480px] h-auto object-contain"
                        />
                    </motion.div>

                    {/* Mobile Graphic */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="flex md:hidden justify-center w-full"
                    >
                        <img
                            src="/whypeoplechoosemojingo.svg"
                            alt="Contact Mojingo"
                            className="w-full max-w-[320px] h-auto object-contain"
                        />
                    </motion.div>

                    {/* Right Side: Form Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex-1 w-full max-w-[560px]"
                    >
                        <div
                            className="bg-white rounded-[24px] p-8 md:p-10"
                            style={{
                                boxShadow: '0 4px 40px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.04)',
                            }}
                        >
                            {/* Card Header */}
                            <h2
                                className="text-[22px] md:text-[26px] font-bold text-[#FF4F93] mb-2 leading-[1.2]"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                                We'd Love to hear from you
                            </h2>
                            <p
                                className="text-[12px] md:text-[13px] text-[#3D3D3D]/70 font-normal mb-8 leading-[1.6]"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                                Our team is just a message away – reach out, share your vibe, and we'll be in touch soon. We're here to help you vibe safely – anytime.
                            </p>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6" id="contact-form">
                                {/* First Name + Last Name */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-1.5">
                                        <label
                                            htmlFor="contact-firstName"
                                            className="text-[13px] font-medium text-[#3D3D3D]"
                                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                        >
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="contact-firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                            className="w-full border-0 border-b-[1.5px] border-[#E0E0E0] pb-2 text-[14px] text-[#111111] placeholder:text-[#BDBDBD] focus:outline-none focus:border-[#FF4F93] transition-colors bg-transparent"
                                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label
                                            htmlFor="contact-lastName"
                                            className="text-[13px] font-medium text-[#3D3D3D]"
                                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                        >
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="contact-lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="w-full border-0 border-b-[1.5px] border-[#E0E0E0] pb-2 text-[14px] text-[#111111] placeholder:text-[#BDBDBD] focus:outline-none focus:border-[#FF4F93] transition-colors bg-transparent"
                                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                            placeholder=""
                                        />
                                    </div>
                                </div>

                                {/* Email + Phone */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-1.5">
                                        <label
                                            htmlFor="contact-email"
                                            className="text-[13px] font-medium text-[#3D3D3D]"
                                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="contact-email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full border-0 border-b-[1.5px] border-[#E0E0E0] pb-2 text-[14px] text-[#111111] placeholder:text-[#BDBDBD] focus:outline-none focus:border-[#FF4F93] transition-colors bg-transparent"
                                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label
                                            htmlFor="contact-phone"
                                            className="text-[13px] font-medium text-[#3D3D3D]"
                                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                        >
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="contact-phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full border-0 border-b-[1.5px] border-[#E0E0E0] pb-2 text-[14px] text-[#111111] placeholder:text-[#BDBDBD] focus:outline-none focus:border-[#FF4F93] transition-colors bg-transparent"
                                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                            placeholder=""
                                        />
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="flex flex-col gap-1.5">
                                    <label
                                        htmlFor="contact-message"
                                        className="text-[13px] font-medium text-[#3D3D3D]"
                                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        className="w-full border-0 border-b-[1.5px] border-[#E0E0E0] pb-2 text-[14px] text-[#111111] placeholder:text-[#BDBDBD] focus:outline-none focus:border-[#FF4F93] transition-colors bg-transparent resize-none"
                                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                        placeholder="Write your message.."
                                    />
                                </div>

                                {/* Status Messages */}
                                {status === 'success' && (
                                    <div className="p-3 bg-green-50 text-green-600 text-[13px] font-medium rounded-lg">
                                        Thanks for reaching out! We'll get back to you soon.
                                    </div>
                                )}
                                {status === 'error' && (
                                    <div className="p-3 bg-red-50 text-red-600 text-[13px] font-medium rounded-lg">
                                        Oops! Something went wrong. Please try again.
                                    </div>
                                )}

                                {/* Submit Button */}
                                <div className="flex justify-end mt-2">
                                    <button
                                        type="submit"
                                        id="contact-submit-btn"
                                        disabled={loading}
                                        className="inline-flex items-center justify-center bg-[#FF4F93] hover:bg-[#e84384] active:scale-[0.97] text-white text-[14px] font-medium rounded-full px-8 py-2.5 shadow-[0_4px_16px_rgba(255,79,147,0.3)] hover:shadow-[0_6px_24px_rgba(255,79,147,0.4)] transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                    >
                                        {loading ? (
                                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            'Submit'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Success Overlay Modal */}
            <AnimatePresence>
                {status === 'success' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#3D3D3D]/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-[640px] bg-white rounded-[32px] overflow-hidden shadow-2xl p-8 sm:p-12 text-center"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            {/* Background Clouds */}
                            <img
                                src="/contact_pop_up_cloud.svg"
                                alt=""
                                className="absolute -bottom-8 -left-12 w-[200px] sm:w-[280px] opacity-60 pointer-events-none"
                            />
                            <img
                                src="/contact_pop_up_cloud.svg"
                                alt=""
                                className="absolute -bottom-8 -right-12 w-[240px] sm:w-[320px] opacity-60 pointer-events-none transform scale-x-[-1]"
                            />

                            {/* Content Container */}
                            <div className="relative z-10 flex flex-col items-center">
                                {/* Responsive Top Graphic */}
                                <img
                                    src="/Contact_pop_up.svg"
                                    alt="Success Graphic"
                                    className="hidden md:block w-full max-w-[500px] h-auto object-contain mx-auto mb-8"
                                />
                                <img
                                    src="/Contact_pop_up_mobile.svg"
                                    alt="Success Graphic"
                                    className="block md:hidden w-full max-w-[320px] h-auto object-contain mx-auto mb-6"
                                />

                                {/* Heading */}
                                <h2 className="text-[24px] sm:text-[28px] font-bold text-[#FF4F93] mb-4">
                                    Your vibe reached us
                                </h2>

                                {/* Paragraph */}
                                <p className="text-[#3D3D3D]/80 text-[15px] sm:text-[17px] leading-relaxed mb-10 max-w-[420px] mx-auto font-medium">
                                    Thanks for reaching out to Mojingo.<br />
                                    Our team will get back to you soon. Have a great day!
                                </p>

                                {/* Action Button */}
                                <button
                                    onClick={() => {
                                        setStatus(null)
                                        window.location.href = '/' // Explore Mojingo
                                    }}
                                    className="bg-[#FF4F93] hover:bg-[#e84384] text-white font-semibold text-[15px] py-3.5 px-10 sm:px-12 rounded-full shadow-[0_4px_16px_rgba(255,79,147,0.3)] hover:shadow-[0_6px_24px_rgba(255,79,147,0.4)] transition-all duration-200 active:scale-95"
                                >
                                    Explore Mojingo
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
