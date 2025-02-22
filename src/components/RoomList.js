import React from 'react';
import './RoomList.css';

function RoomList({ rooms, onBookNow }) {
    return (
        <div className="rooms-grid">
            {rooms.length === 0 ? (
                <p className="no-rooms">No rooms available at the moment.</p>
            ) : (
                rooms.map((room) => (
                    <div key={room._id} className="room-card">
                        <div className="room-header">
                            <h3>{room.type} Room</h3>
                            <span className={`room-status ${room.booked ? 'booked' : 'available'}`}>
                                {room.booked ? 'Booked' : 'Available'}
                            </span>
                        </div>
                        <div className="room-details">
                            <p className="room-number">Room {room.roomNumber}</p>
                            <p className="room-price">${room.price}<span>/night</span></p>
                            <div className="amenities">
                                <h4>Amenities:</h4>
                                <ul>
                                    {room.amenities.map((amenity, index) => (
                                        <li key={index}>{amenity}</li>
                                    ))}
                                </ul>
                            </div>
                            <p className="room-description">{room.description}</p>
                        </div>
                        {!room.booked && (
                            <button 
                                className="book-button"
                                onClick={() => onBookNow(room._id)}
                            >
                                Book Now
                            </button>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default RoomList;