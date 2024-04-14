import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../services/UserContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useUser();

    if (!user) {
        return <Navigate to="/login" />;
    }

    return allowedRoles.includes(user.role.name) ? children : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;
