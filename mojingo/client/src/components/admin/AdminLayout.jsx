import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Inbox, FileText, Shield, LogOut } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const navLinks = [
    { to: '/admin/contacts', icon: Inbox, label: 'Contact Submissions' },
    { to: '/admin/blog', icon: FileText, label: 'Blog Posts' },
    { to: '/admin/legal', icon: Shield, label: 'Legal Pages' },
]

export default function AdminLayout() {
    const { admin, logout } = useAuth()
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate('/admin/login')
    }

    return (
        <div className="min-h-screen flex bg-[#FAFAFA]">

            {/* ── Sidebar ── */}
            <aside className="w-64 flex-shrink-0 bg-white border-r border-[rgba(190,190,190,0.2)] flex flex-col">

                {/* Logo */}
                <div className="px-6 py-6 border-b border-[rgba(190,190,190,0.2)] flex flex-col items-center">
                    <img src="/logo.svg" alt="Mojingo" className="h-8 mb-1" />
                    <p className="text-xs text-[#3D3D3D]/40">Admin Panel</p>
                </div>

                {/* Nav links */}
                <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
                    {navLinks.map(({ to, icon: Icon, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-[12px] text-sm font-medium transition-colors
                 ${isActive
                                    ? 'bg-[#FF4F93]/10 text-[#FF4F93]'
                                    : 'text-[#3D3D3D]/60 hover:bg-gray-50 hover:text-[#3D3D3D]'
                                }`
                            }
                        >
                            <Icon size={18} />
                            {label}
                        </NavLink>
                    ))}
                </nav>

                {/* Admin email + logout */}
                <div className="px-4 py-5 border-t border-[rgba(190,190,190,0.2)]">
                    <p className="text-xs text-[#3D3D3D]/40 px-4 mb-3 truncate">{admin?.email}</p>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-[12px] text-sm font-medium text-[#3D3D3D]/60 hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                        <LogOut size={18} />
                        Log out
                    </button>
                </div>
            </aside>

            {/* ── Page content ── */}
            <main className="flex-1 overflow-auto relative">
                {/* Background Watermark */}
                <div className="fixed inset-0 z-0 opacity-[0.30] pointer-events-none flex items-center justify-center p-20 ml-64">
                    <img src="/logo_mobile.svg" alt="" className="w-full max-w-2xl h-auto object-contain opacity-20" />
                </div>
                <div className="relative z-10">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}