import React,{useState} from 'react'
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
                // Handle login errors here (toast, error display, etc.)
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
            <main>
                <div className="form-container">
                    <h1>Login</h1>
                    
                    {errorMsg && <div className="error-message" style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{errorMsg}</div>}

                    <form onSubmit={onhandleSubmit}>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>


                        <button className="button primary-button" type="submit">Login</button>
                    </form>

                    <div className="auth-footer">
                        New user? <Link to="/register">Create an account</Link>
                    </div>
                </div>
            </main>
        )
    }

export default Login