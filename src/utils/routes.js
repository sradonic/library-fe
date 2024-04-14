import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../services/UserContext';
import LoginPage from '../pages/Login/LoginPage';
import RegistrationPage from '../pages/Registration/RegistrationPage';
import HomePage from '../pages/Home/HomePage';
import ProtectedRoute from '../components/ProtectedRoute';


const RoleBasedHomePage = () => {
  const { user } = useUser(); 
  switch (user?.role.name) {
    case 'admin':
    case 'librarian':
    case 'customer':
      return <HomePage />;
    default:
      return <Navigate to="/login" />;
  }
};


export const routes = [
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegistrationPage />
  },
  {
    path: "/",
    element: <Navigate to="/home" replace />
  },
  {
    path: "/home",
    element: <ProtectedRoute allowedRoles={['admin', 'librarian', 'customer']}>
              <RoleBasedHomePage />
            </ProtectedRoute>
  },
];
