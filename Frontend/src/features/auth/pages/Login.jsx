import React from 'react'
import { Link } from 'react-router'
import '../auth.form.scss'

const Login = () => {
    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>

                <form action="">
                    <div className="input-group">
                        <label htmlFor="email">Email</label><input type="email" placeholder='Email' />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label><input type="password" placeholder='Password' />
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