import { useContext, useEffect } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const ProtectedRoute = ({ children, adminOnly = false }) => {

    const { user, loading, error, isAdmin } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;

        if (error) {
            toast.error('Failed to fetch user data');
            return;
        }

        if (!user) {
            navigate('/login');
            return;
        }

        if (adminOnly && !isAdmin()) {
            toast.error('You are not authorized to access this page');
            navigate('/');
        }
    }, [user, loading, error, navigate, isAdmin, adminOnly]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return children;
}

export default ProtectedRoute;