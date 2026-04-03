import axios from 'axios'

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/auth`,
    withCredentials: true
})

export async function register({ username, email, password }) {
    try {
        const response = await api.post('/register', {
            username,
            email,
            password,
        })
        return response.data
    } catch (err) {
        console.error('register failed', err)
        throw err
    }
}

export async function login({ email, password }) {
    try {
        const response = await api.post('/login', {
            email,
            password,
        })
        return response.data
    } catch (error) {
        console.error('login failed', error)
        throw error
    }
}

export async function logout() {
    try {
        const response = await api.get('/logout')
        return response.data
    } catch (error) {
        console.error('logout failed', error)
        throw error
    }
}


export async function getMe() {
    try {
        const response = await api.get('/get-me')
        return response.data
    } catch (error) {
        console.warn('getMe failed', error?.response?.status, error?.response?.data)
        if (error?.response?.status === 401) {
            return null
        }
        throw error
    }
}