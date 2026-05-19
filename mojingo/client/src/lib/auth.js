
export function getAuthToken() {
    const cookies = document.cookie.split(';')
    const tokenCookie = cookies
        .find(c => c.trim().startsWith('mojingo_token='))
    return tokenCookie ? tokenCookie.split('=')[1].trim() : null
}

export function isLoggedIn() {
    const token = getAuthToken()
    if (!token) return false

    try {
        // Decode JWT payload (middle part)
        const payload = JSON.parse(atob(token.split('.')[1]))
        // Check not expired
        return payload.exp * 1000 > Date.now()
    } catch {
        return false
    }
}