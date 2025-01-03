import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    const [isTokenAvailable, setIsTokenAvailable] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsTokenAvailable(!!token);
    }
    , []);
    

    return (
        <div>
            <Toaster />
            <div className="container">
                {isTokenAvailable && (
                    <button className="btn btn-primary" onClick={handleLogout}>
                        Logout
                    </button>
                )}
                {!isTokenAvailable && (
                    <button className="btn btn-primary">
                    <Link to="/signUp" className="btn btn-primary">
                        SignUp
                    </Link>
                </button>
                )}
                {!isTokenAvailable && (
                    <button className="btn btn-primary">
                    <Link to="/login" className="btn btn-primary">
                        Login
                    </Link>
                </button>
                )}
                

                <h2>Home Page</h2>
            </div>
        </div>
    )
}

export default HomePage;