import axios from "axios";
import { createContext, useEffect, useState, useReducer } from "react";
import cartReducer from "../Components/CartReducer";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error] = useState(null);
    const [cart, dispatch] = useReducer(cartReducer,[]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get('http://localhost:3000/user/Profile', {
                    withCredentials: true,
                });                
                setUser(data);
                const savedCart = JSON.parse(sessionStorage.getItem(`cart_${data._id}`)) || [];
                dispatch({ type: 'LoadCart', payload: savedCart });
            } catch (error) {
                console.error("Failed to fetch user:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const isAdmin = () => user?.role === 'admin';
    
    return (
        <UserContext.Provider value={{ user, setUser, loading, error, isAdmin, cart, dispatch }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
