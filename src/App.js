import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminDashboard from './pages/AdminDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import OrderHistoryPage from './pages/OrderHistoryPage';
import Navigation from './components/Navigation';
import AuthContext, { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
    const { isLoggedIn, jwtToken, handleLogin, handleLogout, isAuthenticated } = useContext(AuthContext);

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

export default function AppWrapper() {
    return (
        <AuthProvider>
            <App />
        </AuthProvider>
    );
}