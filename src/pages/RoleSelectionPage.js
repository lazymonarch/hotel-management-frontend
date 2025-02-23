import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RoleSelectionPage.css';

function RoleSelectionPage() {
    const navigate = useNavigate();

    const handleAdminClick = () => {
        navigate('/signup', { state: { role: 'admin' } });
    };

    const handleCustomerClick = () => {
        navigate('/signup', { state: { role: 'customer' } });
    };

    return (
        <div className="role-selection-page">
            <h1>Select Your Role</h1>
            <div className="button-container">
                <button onClick={handleAdminClick}>Admin</button>
                <button onClick={handleCustomerClick}>Customer</button>
            </div>
        </div>
    );
}

export default RoleSelectionPage;