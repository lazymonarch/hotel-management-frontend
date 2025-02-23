import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

function LoginPage({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const apiBaseURL = process.env.REACT_APP_API_BASE_URL;
            const response = await axios.post(`${apiBaseURL}/api/auth/login`, {
                username,
                password,
            });

            if (response.status === 200) {
                const { token, role } = response.data;
                onLogin(token, role);

                if (role === 'admin') {
                    navigate('/admin-dashboard');
                } else if (role === 'customer') {
                    navigate('/home');
                }
            } else {
                setError('Login failed');
                setTimeout(() => setError(''), 3000);
            }
        } catch (error) {
            setError('Login failed. Please check your credentials.');
            setTimeout(() => setError(''), 3000);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Login</h1>
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
                            placeholder="Enter your username"
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
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit" className="auth-button">
                        Login
                    </button>
                </form>
                <p className="auth-footer">
                    Don't have an account? <span onClick={() => navigate('/signup')} className="auth-link">Sign Up</span>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;