import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function AdminLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const { login } = useAuth()
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')

        if (!email.trim() || !password.trim()) {
            setError('Both fields are required')
            return
        }

        setLoading(true)
        try {
            await login(email, password)
            navigate('/admin/contacts')
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background Logo Watermark */}
            <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden p-4 sm:p-20">
                <img src="/logo_mobile.svg" alt="" className="w-[140%] sm:w-full h-auto sm:h-full object-contain opacity-[0.05] sm:opacity-10 max-w-none sm:max-w-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 w-full max-w-md bg-white/40 backdrop-blur-xl rounded-[32px] border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.1)] p-10"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <img src="/logo.svg" alt="Mojingo" className="h-10 mx-auto mb-2" />
                    <p className="text-sm text-[#3D3D3D]/50">Admin Dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-[#3D3D3D]">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="admin@mojingo.com"
                            className="w-full px-5 py-3.5 rounded-[14px] border border-[rgba(190,190,190,0.4)] text-sm text-[#3D3D3D] outline-none focus:border-[#FF4F93] transition-colors bg-white"
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-[#3D3D3D]">Password</label>
                        <div className="relative">
                            <input
                                type={showPass ? 'text' : 'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-5 py-3.5 pr-12 rounded-[14px] border border-[rgba(190,190,190,0.4)] text-sm text-[#3D3D3D] outline-none focus:border-[#FF4F93] transition-colors bg-white"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPass(s => !s)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3D3D3D]/40 hover:text-[#3D3D3D] transition-colors"
                            >
                                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <p className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-[12px]">
                            {error}
                        </p>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-[#FF4F93] hover:bg-[#e03f80] text-white font-semibold rounded-full py-4 text-base transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                    >
                        {loading ? (
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <><LogIn size={18} /> Sign in</>
                        )}
                    </button>
                </form>
            </motion.div>
        </div>
    )
}