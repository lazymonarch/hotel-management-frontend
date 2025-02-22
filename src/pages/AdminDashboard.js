import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css';
import AddRoomModal from '../components/AddRoomModal';

function AdminDashboard({ jwtToken }) {
    const [activeTab, setActiveTab] = useState('rooms');
    const [rooms, setRooms] = useState([]);
    const [foodItems, setFoodItems] = useState([]);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);
    const apiBaseURL = process.env.REACT_APP_API_BASE_URL;

    // Clear messages when switching tabs
    useEffect(() => {
        setError('');
        setSuccess('');
    }, [activeTab]);

    // Fetch data based on active tab
    useEffect(() => {
        const fetchData = async () => {
            setError('');
            setSuccess('');
            try {
                switch (activeTab) {
                    case 'rooms':
                        const roomsResponse = await axios.get(`${apiBaseURL}/api/admin/rooms`, {
                            headers: { Authorization: `Bearer ${jwtToken}` }
                        });
                        setRooms(roomsResponse.data);
                        break;
                    case 'food':
                        const foodResponse = await axios.get(`${apiBaseURL}/api/admin/food`, {
                            headers: { Authorization: `Bearer ${jwtToken}` }
                        });
                        setFoodItems(foodResponse.data);
                        break;
                    case 'users':
                        const usersResponse = await axios.get(`${apiBaseURL}/api/admin/users`, {
                            headers: { Authorization: `Bearer ${jwtToken}` }
                        });
                        setUsers(usersResponse.data);
                        break;
                    case 'orders':
                        const ordersResponse = await axios.get(`${apiBaseURL}/api/admin/orders`, {
                            headers: { Authorization: `Bearer ${jwtToken}` }
                        });
                        setOrders(ordersResponse.data);
                        break;
                    default:
                        break;
                }
            } catch (error) {
                setError('Failed to fetch data');
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [activeTab, jwtToken, apiBaseURL]);

    // Room management functions
    const handleAddRoom = async (roomData) => {
        try {
            await axios.post(`${apiBaseURL}/api/admin/rooms`, roomData, {
                headers: { Authorization: `Bearer ${jwtToken}` }
            });
            setSuccess('Room added successfully');
            // Refresh rooms list
            const response = await axios.get(`${apiBaseURL}/api/admin/rooms`, {
                headers: { Authorization: `Bearer ${jwtToken}` }
            });
            setRooms(response.data);
            // Clear success message after 3 seconds
            setTimeout(() => {
                setSuccess('');
            }, 3000);
        } catch (error) {
            setError('Failed to add room');
            console.error('Error adding room:', error);
            // Clear error message after 3 seconds
            setTimeout(() => {
                setError('');
            }, 3000);
        }
    };

    const handleDeleteRoom = async (roomId) => {
        try {
            await axios.delete(`${apiBaseURL}/api/admin/rooms/${roomId}`, {
                headers: { Authorization: `Bearer ${jwtToken}` }
            });
            setRooms(rooms.filter(room => room._id !== roomId));
            setSuccess('Room deleted successfully');
            setTimeout(() => {
                setSuccess('');
            }, 3000);
        } catch (error) {
            setError('Failed to delete room');
            setTimeout(() => {
                setError('');
            }, 3000);
        }
    };

    // Food menu management functions
    const handleAddFoodItem = async (foodData) => {
        try {
            await axios.post(`${apiBaseURL}/api/admin/food`, foodData, {
                headers: { Authorization: `Bearer ${jwtToken}` }
            });
            setSuccess('Food item added successfully');
            const response = await axios.get(`${apiBaseURL}/api/admin/food`, {
                headers: { Authorization: `Bearer ${jwtToken}` }
            });
            setFoodItems(response.data);
            setTimeout(() => {
                setSuccess('');
            }, 3000);
        } catch (error) {
            setError('Failed to add food item');
            setTimeout(() => {
                setError('');
            }, 3000);
        }
    };

    const handleDeleteFoodItem = async (foodId) => {
        try {
            await axios.delete(`${apiBaseURL}/api/admin/food/${foodId}`, {
                headers: { Authorization: `Bearer ${jwtToken}` }
            });
            setFoodItems(foodItems.filter(item => item._id !== foodId));
            setSuccess('Food item deleted successfully');
            setTimeout(() => {
                setSuccess('');
            }, 3000);
        } catch (error) {
            setError('Failed to delete food item');
            setTimeout(() => {
                setError('');
            }, 3000);
        }
    };

    // User management function
    const handleDeleteUser = async (userId) => {
        try {
            const confirmDelete = window.confirm("Are you sure you want to delete this user?");
            if (!confirmDelete) return;

            await axios.delete(`${apiBaseURL}/api/admin/users/${userId}`, {
                headers: { Authorization: `Bearer ${jwtToken}` }
            });
            setUsers(users.filter(user => user._id !== userId));
            setSuccess('User deleted successfully');
            setTimeout(() => {
                setSuccess('');
            }, 3000);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to delete user');
            setTimeout(() => {
                setError('');
            }, 3000);
        }
    };

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <div className="tab-navigation">
                    <button 
                        className={activeTab === 'rooms' ? 'active' : ''} 
                        onClick={() => setActiveTab('rooms')}
                    >
                        Rooms
                    </button>
                    <button 
                        className={activeTab === 'food' ? 'active' : ''} 
                        onClick={() => setActiveTab('food')}
                    >
                        Food Menu
                    </button>
                    <button 
                        className={activeTab === 'users' ? 'active' : ''} 
                        onClick={() => setActiveTab('users')}
                    >
                        Users
                    </button>
                    <button 
                        className={activeTab === 'orders' ? 'active' : ''} 
                        onClick={() => setActiveTab('orders')}
                    >
                        Orders
                    </button>
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <div className="admin-content">
                {activeTab === 'rooms' && (
                    <div className="rooms-section">
                        <h2>Room Management</h2>
                        <button 
                            className="add-button" 
                            onClick={() => setIsAddRoomModalOpen(true)}
                        >
                            Add New Room
                        </button>
                        <AddRoomModal 
                            isOpen={isAddRoomModalOpen}
                            onClose={() => setIsAddRoomModalOpen(false)}
                            onAdd={handleAddRoom}
                        />
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Room Number</th>
                                    <th>Type</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rooms.map(room => (
                                    <tr key={room._id}>
                                        <td>{room.roomNumber}</td>
                                        <td>{room.type}</td>
                                        <td>${room.price}</td>
                                        <td>{room.booked ? 'Booked' : 'Available'}</td>
                                        <td>
                                            <button onClick={() => {/* Open edit modal */}}>Edit</button>
                                            <button onClick={() => handleDeleteRoom(room._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'food' && (
                    <div className="food-section">
                        <h2>Food Menu Management</h2>
                        <button className="add-button" onClick={() => {/* Open add food modal */}}>
                            Add New Item
                        </button>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {foodItems.map(item => (
                                    <tr key={item._id}>
                                        <td>{item.name}</td>
                                        <td>{item.category}</td>
                                        <td>${item.price}</td>
                                        <td>
                                            <button onClick={() => {/* Open edit modal */}}>Edit</button>
                                            <button onClick={() => handleDeleteFoodItem(item._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'users' && (
                    <div className="users-section">
                        <h2>User Management</h2>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Role</th>
                                    <th>Created At</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" style={{textAlign: 'center'}}>No users found</td>
                                    </tr>
                                ) : (
                                    users.map(user => (
                                        <tr key={user._id}>
                                            <td>{user.username}</td>
                                            <td>{user.role}</td>
                                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                {user.role !== 'admin' && (
                                                    <button 
                                                        onClick={() => handleDeleteUser(user._id)}
                                                        className="delete-button"
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="orders-section">
                        <h2>Order Management</h2>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Type</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.customerName}</td>
                                        <td>{order.orderType}</td>
                                        <td>${order.totalAmount}</td>
                                        <td>{order.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;