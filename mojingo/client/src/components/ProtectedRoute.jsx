import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export default function ProtectedRoute() {
    const { admin, loading } = useAuth()

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
                <span className="w-6 h-6 border-2 border-[#FF4F93]/30 border-t-[#FF4F93] rounded-full animate-spin" />
            </div>
        )
    }

    return admin ? <Outlet /> : <Navigate to="/admin/login" replace />
}