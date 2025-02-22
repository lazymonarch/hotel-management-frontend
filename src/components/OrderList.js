// src/components/OrderList.js
import React from 'react';

function OrderList({ orders }) {
    return (
        <div>
            <h3>Orders</h3>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul>
                    {orders.map(order => (
                        <li key={order._id}>
                            <strong>Order ID:</strong> {order._id}<br />
                            <strong>Customer Name:</strong> {order.customerName}<br />
                            <strong>Order Type:</strong> {order.orderType}<br />
                            <strong>Total Amount:</strong> ${order.totalAmount}
                            <hr />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default OrderList;