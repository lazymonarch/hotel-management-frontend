import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminDashboard from './pages/AdminDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import OrderHistoryPage from './pages/OrderHistoryPage';
import './App.css';

// Create a separate Navigation component
function Navigation({ isLoggedIn, handleLogout }) {
    const location = useLocation();
    
    // Don't show navigation on homepage
    if (location.pathname === '/') {
        return null;
    }

    return (
        <nav className="main-nav">
            <ul>
                <li><Link to="/">Home</Link></li>
                {isLoggedIn ? (
                    <li><button onClick={handleLogout}>Logout</button></li>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
}

function App() {
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
        <Router>
            <div>
                <Navigation isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
                
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                    <Route path="/signup" element={<SignupPage />} />

                    <Route
                        path="/admin-dashboard"
                        element={
                            isAuthenticated("admin") ? (
                                <AdminDashboard jwtToken={jwtToken} />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />

                    <Route
                        path="/customer-dashboard"
                        element={
                            isAuthenticated("customer") ? (
                                <CustomerDashboard jwtToken={jwtToken} />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />

                    <Route
                        path="/order-history"
                        element={
                            isAuthenticated("customer") ? (
                                <OrderHistoryPage jwtToken={jwtToken} />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;