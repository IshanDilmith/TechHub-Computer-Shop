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
            const response = await axios.post('http://localhost:3000/auth/login', data);

            if (response.status === 200) {
                toast.success('Login Successful!!');
            }

            localStorage.setItem('token', response.data.data);

            setTimeout(() => {
                window.location = '/'; 
            }, 1500);
            
            console.log(response);

        } catch (err) {
            if (err.response &&
                err.response.status >= 400 &&
                err.response.status < 500) {
                setError(err.response.data.message);
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
                        placeholder='Email'
                        name='email'
                        onChange={handleChange} 
                        value = {data.email} 
                        required />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" 
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