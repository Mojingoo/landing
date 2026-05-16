import { createContext, useContext, useState, useEffect } from 'react'
import api from '@/lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [admin, setAdmin] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('mojingo_token')
        if (token) {
            api.get('/auth/me')
                .then(res => setAdmin(res.data))
                .catch(() => localStorage.removeItem('mojingo_token'))
                .finally(() => setLoading(false))
        } else {
            setLoading(false)
        }
    }, [])

    async function login(email, password) {
        const res = await api.post('/auth/login', { email, password })
        localStorage.setItem('mojingo_token', res.data.token)
        setAdmin({ email: res.data.email })
        return res.data
    }

    function logout() {
        localStorage.removeItem('mojingo_token')
        setAdmin(null)
    }

    return (
        <AuthContext.Provider value={{ admin, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}