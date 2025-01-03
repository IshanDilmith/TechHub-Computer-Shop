import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/user/', data);
            console.log(response);

            if (response.status === 200) {
                toast.success('User Registered Successfully!!');
            }

            setTimeout(() => {
                navigate('/login');
            }, 1500);
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
                <button className="btn btn-primary">
                    <Link to="/login" style={{color: 'white'}}>Login</Link>
                </button>
                <h2>Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" className="form-control"
                        placeholder='First Name'
                        name='firstName'
                        onChange={handleChange}
                        value = {data.firstName} 
                        required />
                    </div>

                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" className="form-control" 
                        placeholder='Last Name'
                        name='lastName'
                        onChange={handleChange}
                        value = {data.lastName} 
                        required />
                    </div>

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
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;