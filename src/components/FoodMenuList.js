import React from 'react';
import '../styles/FoodMenuList.css';

function FoodMenuList({ foodItems, onAddToOrder }) {
  return (
    <div className="food-menu-container">
      <h3>Food Menu</h3>
      {foodItems.length === 0 ? (
        <p>No food items available at the moment.</p>
      ) : (
        <ul className="food-menu-list">
          {foodItems.map((item) => (
            <li key={item._id} className="food-menu-item">
              <div className="food-menu-item-details">
                <strong>{item.name}</strong> - ₹{item.price}<br /> {/* Display price in rupees */}
                {item.description && <p>{item.description}</p>}
              </div>
              <button className="add-to-order-button" onClick={() => onAddToOrder(item._id)}>Add to Order</button>  {/* Add to Order button */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FoodMenuList;