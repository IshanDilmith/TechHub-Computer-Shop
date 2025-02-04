import { UserContext } from "./UserContext";
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const GuestRoute = ({ children }) => {
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            toast.error("You are already logged in");
        }
    }, [user]);

    if (user) return <Navigate to="/" />;
    return children;
};

export default GuestRoute;