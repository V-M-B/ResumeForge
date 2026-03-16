import React from 'react'
import { useNavigate,Link } from 'react-router'
import '../auth.form.scss'
import {useState} from 'react'
import { useAuth } from '../hooks/use.auth'


const Register = () => {
    const navigate = useNavigate()
    const [username,setusername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const { loading, handleRegister } = useAuth();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        await handleRegister({name:username,email,password})
        navigate('/')
    }


    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username    ">Username</label>
                        <input type="text" placeholder='Username' 
                        onChange={(e)=>{setusername(e.target.value)}}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder='Email' 
                        onChange={(e)=>{setEmail(e.target.value)}}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label><input type="password" placeholder='Password'
                         onChange={(e)=>{setPassword(e.target.value)}}
                        />
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