import React from 'react';
import '../styles/HomePage.css'; // Import the CSS file
import MenuController from '../components/MenuController';

function HomePage() {
    return (
        <div className="home-container">
            <MenuController />
            <h1>Welcome to Our Hotel!</h1>
            <p>Discover the perfect blend of comfort and luxury at our hotel. We offer a wide range of rooms and suites to suit your needs, along with exceptional amenities and personalized service.</p>
        </div>
    );
}

export default HomePage;