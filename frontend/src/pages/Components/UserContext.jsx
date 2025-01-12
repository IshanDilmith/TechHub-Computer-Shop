import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get('http://localhost:3000/user/Profile', {
                    withCredentials: true,
                });                
                setUser(data);
                setError(null);
            } catch (error) {
                console.error("Failed to fetch user:", error);
                setUser(null);
                setError(error.response?.data?.message || 'Failed to fetch user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const isAdmin = () => user?.role === 'admin';
    
    return (
        <UserContext.Provider value={{ user, setUser, loading, error, isAdmin }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
