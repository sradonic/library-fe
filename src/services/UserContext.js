import React, { createContext, useState, useEffect, useContext } from 'react';
import {jwtDecode} from 'jwt-decode';  
export const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUserState] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const checkToken = () => {
            const token = localStorage.getItem('token');
            if (!token) {
                clearUserData();
                setLoading(false);
                return;
            }

            try {
                const { exp } = jwtDecode(token);
                if (exp * 1000 < Date.now()) {
                    console.log("Session expired");
                    clearUserData();
                }
            } catch (error) {
                console.error("Failed to decode token:", error);
                clearUserData();
            }
            setLoading(false);
        };

        checkToken();
        const interval = setInterval(checkToken, 60000);
        return () => clearInterval(interval); 
    }, []);

    const setUserData = (userData) => {
        console.log("ajmo")
        console.log(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        setUserState(userData);
    };

    const setTokenData = (token) => {
        localStorage.setItem('token', token);
    };

    const clearUserData = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUserState(null);
    };

    return (
        <UserContext.Provider value={{ user, setUserData, setTokenData, clearUser: clearUserData, isLoading }}>
            {children}
        </UserContext.Provider>
    );
};
