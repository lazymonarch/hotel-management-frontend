import React from 'react';
import { Link, useLocation } from 'react-router-dom';

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

export default Navigation;