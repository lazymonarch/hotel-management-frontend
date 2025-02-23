import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RoomList from '../components/RoomList';
import BookingForm from '../components/BookingForm';
import FoodMenuList from '../components/FoodMenuList';
import '../styles/CustomerDashboard.css';

function CustomerDashboard({ jwtToken }) {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState('');
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [orderSuccessMessage, setOrderSuccessMessage] = useState('');
  const apiBaseURL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${apiBaseURL}/api/customer/rooms`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setRooms(response.data);
      } catch (error) {
        setError('Failed to fetch available rooms');
        console.error('Error fetching rooms:', error);
      }
    };

    const fetchFoodMenu = async () => {
      try {
        const response = await axios.get(`${apiBaseURL}/api/customer/food`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setFoodItems(response.data);
      } catch (error) {
        setError('Failed to fetch food menu');
        console.error('Error fetching food menu:', error);
      }
    };

    fetchRooms();
    fetchFoodMenu();
  }, [jwtToken, apiBaseURL]);

  const handleBookNow = (roomId) => {
    setSelectedRoomId(roomId);
  };

  const handleBookingCancel = () => {
    setSelectedRoomId(null);
  };

  const handleAddToOrder = (itemId) => {
    setOrderItems([...orderItems, itemId]);
  };

  const handlePlaceOrder = async () => {
    try {
      const totalAmount = calculateTotal();
      const response = await axios.post(
        `${apiBaseURL}/api/customer/orders`,
        {
          customerName: "Test Customer",
          foodItems: orderItems,
          totalAmount: totalAmount,
          orderType: "Food",
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setOrderSuccessMessage("Order placed successfully!");
        setOrderItems([]);
        setError('');
      } else {
        setError("Failed to place order");
        setOrderSuccessMessage('');
        console.error("Failed to place order:", response);
      }
    } catch (error) {
      setError("Failed to place order: " + error.message);
      setOrderSuccessMessage('');
      console.error("Error placing order:", error);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    orderItems.forEach((itemId) => {
      const item = foodItems.find((foodItem) => foodItem._id === itemId);
      if (item) {
        total += item.price;
      }
    });
    return total;
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Customer Dashboard</h1>
        <p>Welcome to your dashboard! Book rooms and order food here.</p>
        <Link to="/order-history" className="order-history-link">
          View Order History
        </Link>
      </div>

      {error && <div className="message error-message">{error}</div>}
      {orderSuccessMessage && (
        <div className="message success-message">{orderSuccessMessage}</div>
      )}

      <div className="dashboard-section">
        <h2>Available Rooms</h2>
        <RoomList rooms={rooms} onBookNow={handleBookNow} />
        {selectedRoomId && (
          <BookingForm
            roomId={selectedRoomId}
            jwtToken={jwtToken}
            onBookingCancel={handleBookingCancel}
          />
        )}
      </div>

      <div className="dashboard-section">
        <h2>Food Menu</h2>
        <FoodMenuList foodItems={foodItems} onAddToOrder={handleAddToOrder} />
      </div>

      <div className="order-summary">
        <h3>Order Summary</h3>
        {orderItems.length === 0 ? (
          <p>Your order is empty.</p>
        ) : (
          <>
            <ul className="order-list">
              {orderItems.map((itemId) => {
                const item = foodItems.find(foodItem => foodItem._id === itemId);
                return item ? (
                  <li key={itemId}>
                    <span>{item.name}</span>
                    <span>₹{item.price}</span> {/* Display price in rupees */}
                  </li>
                ) : null;
              })}
            </ul>
            <div className="order-total">
              Total: ₹{calculateTotal()} {/* Display total in rupees */}
            </div>
            <button
              className="place-order-button"
              onClick={handlePlaceOrder}
              disabled={orderItems.length === 0}
            >
              Place Order
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default CustomerDashboard;