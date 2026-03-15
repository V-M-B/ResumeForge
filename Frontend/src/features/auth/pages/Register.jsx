import React from 'react'
import { Link } from 'react-router'
import '../auth.form.scss'

const Register = () => {
    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>

                <form action="">
                    <div className="input-group">
                        <label htmlFor="username    ">Username</label><input type="text" placeholder='Username' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label><input type="email" placeholder='Email' />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label><input type="password" placeholder='Password' />
                    </div>


                    <button className="button primary-button" type="submit">Register</button>
                </form>

                <div className="auth-footer">
                    Already have an account? <Link to="/login">Sign in</Link>
                </div>
            </div>
        </main>
    )
}



export default Register