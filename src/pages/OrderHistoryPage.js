import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderHistoryPage.css';

function OrderHistoryPage({ jwtToken }) {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const apiBaseURL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${apiBaseURL}/api/customer/orders/Test Customer`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        setError('Failed to fetch order history');
        console.error('Error fetching order history:', error);
      }
    };

    fetchOrders();
  }, [jwtToken, apiBaseURL]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="history-container">
      <div className="history-header">
        <h1>Order History</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>No orders found.</p>
        </div>
      ) : (
        <ul className="orders-list">
          {orders.map((order) => (
            <li key={order._id} className="order-card">
              <div className="order-header">
                <span className="order-id">Order ID: {order._id}</span>
                <span className="order-type">{order.orderType}</span>
              </div>

              <div className="order-details">
                <div className="order-details-row">
                  <span>Date</span>
                  <span>{formatDate(order.createdAt)}</span>
                </div>
              </div>

              {order.foodItems && order.foodItems.length > 0 && (
                <ul className="food-items-list">
                  {order.foodItems.map((item) => (
                    <li key={item._id} className="food-item">
                      <span>{item.name}</span>
                      <span>${item.price}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="order-total">
                Total Amount: ${order.totalAmount}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderHistoryPage;