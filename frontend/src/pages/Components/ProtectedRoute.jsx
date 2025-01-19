import { useContext, useEffect } from 'react';
import { UserContext } from './UserContext';
import { replace, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const ProtectedRoute = ({ children, adminOnly = false }) => {

    const { user, loading, error, isAdmin } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;

        if (error) {
            toast.error('Failed to fetch user data');
        }

        if (!user) {
            toast.error('You must be logged in to access this page');
            navigate('/login');
            return;
        }

        if (adminOnly && !isAdmin()) {
            toast.error('You are not authorized to access this page');
            navigate('/');
        }

    }, [loading, user, error, adminOnly, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return children;
}

export default ProtectedRoute;