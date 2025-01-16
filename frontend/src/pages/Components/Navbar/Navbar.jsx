import { useContext } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";


const Navbar = () => {

    const { user, setUser, cart } = useContext(UserContext);

    const handleLogout = async () => {
        try{
            localStorage.removeItem('token');
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
            await axios.post('http://localhost:3000/auth/logout', {}, {
                withCredentials: true,
            });
            setUser(null);
            window.location = '/';
        } catch (err) {
            console.error(err);
            toast.error('Failed to logout');
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        {user ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/cart">cart {cart.length}</Link>
                                </li>

                                <li className="nav-item">
                                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup">Sign Up</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );

}

export default Navbar;