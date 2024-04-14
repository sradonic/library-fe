import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../services/UserContext';
import LoginPage from '../pages/Login/LoginPage';
import RegistrationPage from '../pages/Registration/RegistrationPage';
import HomePage from '../pages/Home/HomePage';
import AdminHomePage from '../pages/Home/AdminHomePage';
import ProtectedRoute from '../components/ProtectedRoute';
import UserDetails from '../pages/Users/UserDetails';
import { Roles } from './role';


const RoleBasedHomePage = () => {
  const { user } = useUser(); 
  switch (user?.role.name) {
    case Roles.admin:
    case Roles.librarian:
      return <AdminHomePage />;
    case Roles.customer:
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
    element: <ProtectedRoute allowedRoles={[Roles.admin, Roles.librarian, Roles.customer]}>
              <RoleBasedHomePage />
            </ProtectedRoute>
  },
  {
    path: "/user/:userId",
    element: <ProtectedRoute allowedRoles={[Roles.admin, Roles.librarian]}>
              <UserDetails  />
            </ProtectedRoute> 
  },
];
