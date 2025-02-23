import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/SignupPage.css';

function SignupPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer'); // Default to customer
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.role) {
            setRole(location.state.role);
        }
    }, [location.state]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            // Access the environment variable
            const apiBaseURL = process.env.REACT_APP_API_BASE_URL;
            const response = await axios.post(`${apiBaseURL}/api/auth/register`, {
                username,
                password,
                role
            });

            if (response.status === 201) {
                // Redirect to login page after successful signup
                navigate('/login');
            } else {
                setError('Signup failed');
                setTimeout(() => setError(''), 3000);
            }
        } catch (error) {
            setError('Signup failed. Please try a different username.');
            setTimeout(() => setError(''), 3000);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Create Account</h1>
                <p className="auth-subtitle">Join us to start booking your perfect stay</p>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Choose a username"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Choose a password"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="role-select"
                        >
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="auth-button">
                        Sign Up
                    </button>
                </form>
                <p className="auth-footer">
                    Already have an account? <span onClick={() => navigate('/login')} className="auth-link">Login</span>
                </p>
            </div>
        </div>
    );
}

export default SignupPage;