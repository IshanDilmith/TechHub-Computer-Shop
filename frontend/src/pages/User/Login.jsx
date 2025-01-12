import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
    
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data)
            });

            const tokenData = await response.json();

            if (response.ok) {
                if (tokenData.token) {
                    console.log("Token received:", tokenData.token);

                    localStorage.setItem('token', tokenData.token);

                    toast.success('Login Successful!!');

                    setTimeout(() => {
                        window.location = '/';
                    }, 1500);
                } else {
                    throw new Error('Login successful but no token received');
                }
            } else {
                throw new Error(tokenData.message || 'Login failed');
            }

        } catch (err) {
            console.error(err);
            if (err.response) {
                setError(err.response.data.message || 'Server returned an error');
            } else {
                setError('Network error or server is unreachable');
            }
        }
        
        
    }


    return (
        <div>
            <Toaster />
            <div className="container">
                <h2>Login to Your Account</h2>
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" 
                        id='email'
                        placeholder='Email'
                        name='email'
                        onChange={handleChange} 
                        value = {data.email} 
                        required />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" 
                        id='password'
                        placeholder='Password' 
                        name='password'
                        onChange={handleChange}
                        value = {data.password} 
                        required />
                    </div>
                    
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;