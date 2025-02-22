import React, { useState } from 'react';
import '../styles/AddRoomModal.css';

const ROOM_TYPES = {
    SINGLE: {
        type: 'Single',
        price: 100,
        amenities: ['1 Single Bed','Private Bathroom']
    },
    DOUBLE: {
        type: 'Double',
        price: 150,
        amenities: ['1 Double Bed','Private Bathroom', 'Mini Fridge']
    },
    SUITE: {
        type: 'Suite',
        price: 250,
        amenities: ['1 King Bed', 'Living Room','Jacuzzi', 'Mini Bar', 'City View']
    },
    DELUXE: {
        type: 'Deluxe',
        price: 200,
        amenities: ['1 Queen Bed','Private Bathroom', 'Mini Bar', 'Work Desk']
    }
};

function AddRoomModal({ isOpen, onClose, onAdd }) {
    const [step, setStep] = useState(1);
    const [roomNumber, setRoomNumber] = useState('');
    const [selectedType, setSelectedType] = useState(null);

    const handleTypeSelect = (type) => {
        setSelectedType(type);
        setStep(2);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!roomNumber.trim()) {
            alert('Please enter a room number');
            return;
        }

        const newRoom = {
            roomNumber: roomNumber,
            type: selectedType.type,
            price: selectedType.price,
            amenities: selectedType.amenities,
            description: `${selectedType.type} room with ${selectedType.amenities.join(', ')}`,
            booked: false
        };

        onAdd(newRoom);
        onClose();
        setStep(1);
        setRoomNumber('');
        setSelectedType(null);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>&times;</button>
                
                {step === 1 && (
                    <div className="room-type-selection">
                        <h2>Select Room Type</h2>
                        <div className="room-type-grid">
                            {Object.entries(ROOM_TYPES).map(([key, type]) => (
                                <div 
                                    key={key} 
                                    className="room-type-card"
                                    onClick={() => handleTypeSelect(type)}
                                >
                                    <h3>{type.type}</h3>
                                    <p className="price">${type.price}/night</p>
                                    <ul className="amenities-list">
                                        {type.amenities.map((amenity, index) => (
                                            <li key={index}>{amenity}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="room-number-input">
                        <h2>Enter Room Number</h2>
                        <p>Selected Type: {selectedType.type}</p>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="roomNumber">Room Number:</label>
                                <input
                                    type="text"
                                    id="roomNumber"
                                    value={roomNumber}
                                    onChange={(e) => setRoomNumber(e.target.value)}
                                    placeholder="Enter room number"
                                    required
                                />
                            </div>
                            <div className="button-group">
                                <button type="button" onClick={() => setStep(1)}>Back</button>
                                <button type="submit">Create Room</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddRoomModal; 