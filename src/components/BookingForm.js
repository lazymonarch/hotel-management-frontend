import React, { useState } from 'react';
import axios from 'axios';

function BookingForm({ roomId, jwtToken, onBookingCancel }) {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [bookingError, setBookingError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
    const apiBaseURL = process.env.REACT_APP_API_BASE_URL;


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${apiBaseURL}/api/customer/orders`,
        {
          roomId: roomId,
          checkInDate: checkInDate,
          checkOutDate: checkOutDate,
          totalAmount: 100, // Replace with actual calculation
          orderType: "Room",
          customerName: "Test Customer" //You should fetch customer name after complete implementation of user
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setBookingSuccess(true);
        setBookingError('');
        // Optionally, close the booking form after a successful booking
          onBookingCancel();
      } else {
        setBookingError('Booking failed');
        setBookingSuccess(false);
        console.error('Booking failed:', response);
      }
    } catch (error) {
      setBookingError('Booking failed');
      setBookingSuccess(false);
      console.error('Booking error:', error);
    }
  };

  return (
    <div>
      <h3>Book Room</h3>
      {bookingSuccess && <p style={{ color: 'green' }}>Booking successful!</p>}
      {bookingError && <p style={{ color: 'red' }}>{bookingError}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="checkInDate">Check-in Date:</label>
          <input
            type="date"
            id="checkInDate"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="checkOutDate">Check-out Date:</label>
          <input
            type="date"
            id="checkOutDate"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Confirm Booking</button>
        <button type="button" onClick={onBookingCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default BookingForm;