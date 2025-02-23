import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [jwtToken, setJwtToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('jwtToken');
        const storedRole = localStorage.getItem('userRole');

        if (storedToken && storedRole) {
            setIsLoggedIn(true);
            setUserRole(storedRole);
            setJwtToken(storedToken);
        }
    }, []);

    const handleLogin = (token, role) => {
        setIsLoggedIn(true);
        setUserRole(role);
        setJwtToken(token);
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('userRole', role);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserRole(null);
        setJwtToken(null);
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userRole');
    };

    const isAuthenticated = (role) => {
        return isLoggedIn && userRole === role;
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userRole, jwtToken, handleLogin, handleLogout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;