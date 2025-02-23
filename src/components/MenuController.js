import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MenuController.css'; // Import the CSS file

function MenuController() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navigateTo = (path) => {
        navigate(path);
        setIsOpen(false);
    };

    const handleAdminClick = () => {
        navigate('/signup', { state: { role: 'admin' } });
        setIsOpen(false);
    };

    const handleCustomerClick = () => {
        navigate('/signup', { state: { role: 'customer' } });
        setIsOpen(false);
    };

    return (
        <div>
            <button onClick={toggleMenu} className="menu-button">☰</button>
            {isOpen && (
                <div className="menu-overlay">
                    <div className="menu-content">
                        <ul>
                            <li><button onClick={() => navigateTo('/')}>Home</button></li>
                            <li><button onClick={() => navigateTo('/about')}>About</button></li>
                            <li><button onClick={() => navigateTo('/stay')}>Stay</button></li>
                            <li><button onClick={() => navigateTo('/dining')}>Dining</button></li>
                            <li><button onClick={() => navigateTo('/contact')}>Contact Us</button></li>
                        </ul>
                        <div className="auth-buttons">
                            <button className="auth-button" onClick={handleAdminClick}>Admin</button>
                            <button className="auth-button" onClick={handleCustomerClick}>Customer</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MenuController;