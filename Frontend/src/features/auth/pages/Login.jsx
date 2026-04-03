import React, { useState } from 'react'
import { Link } from 'react-router'
import '../auth.form.scss'
import { useAuth } from '../hooks/use.auth.js'
import { useNavigate } from 'react-router'

const Login = () => {
    const navigate = useNavigate()
    const { loading, handleLogin } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const onhandleSubmit = async (e) => {
        e.preventDefault()
        setErrorMsg('')

        try {
            await handleLogin({ email, password })
            navigate('/')
        } catch (err) {
            console.error('Login failed', err)
            setErrorMsg(err?.response?.data?.message || 'Invalid email or password')
        }
    }

    if (loading) {
        return (
            <main className="loader-container">
                <div className="loader"></div>
            </main>
        )
    }

    return (
        <main className="auth-page">
            {/* Left Branding Panel */}
            <div className="auth-branding">
                <div className="auth-branding__content">
                    <div className="auth-branding__logo">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z" fill="currentColor"/>
                        </svg>
                        <span>ResumeForge</span>
                    </div>
                    <h2 className="auth-branding__title">AI-Powered Interview<br />Preparation Platform</h2>
                    <p className="auth-branding__desc">Get personalized interview strategies, tailored resume generation, and a complete preparation roadmap — all powered by AI.</p>

                    <div className="auth-branding__features">
                        <div className="auth-branding__feature">
                            <div className="auth-branding__feature-icon">📋</div>
                            <div>
                                <h4>Smart Interview Reports</h4>
                                <p>Get technical & behavioral questions tailored to your job description</p>
                            </div>
                        </div>
                        <div className="auth-branding__feature">
                            <div className="auth-branding__feature-icon">📄</div>
                            <div>
                                <h4>AI Resume Builder</h4>
                                <p>Generate ATS-friendly resumes customized for each role</p>
                            </div>
                        </div>
                        <div className="auth-branding__feature">
                            <div className="auth-branding__feature-icon">🗺️</div>
                            <div>
                                <h4>Preparation Roadmap</h4>
                                <p>Day-by-day study plan to ace your interview</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Form Panel */}
            <div className="auth-form-panel">
                <div className="form-container">
                    <h1>Welcome Back</h1>
                    <p className="subtitle">Sign in to continue your preparation</p>

                    {errorMsg && <div className="error-message" style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>{errorMsg}</div>}

                    <form onSubmit={onhandleSubmit}>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <button className="button primary-button" type="submit">Sign In</button>
                    </form>

                    <div className="auth-footer">
                        New user? <Link to="/register">Create an account</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login