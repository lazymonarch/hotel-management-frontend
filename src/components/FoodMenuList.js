import React from 'react';

function FoodMenuList({ foodItems, onAddToOrder }) {
  return (
    <div>
      <h3>Food Menu</h3>
      {foodItems.length === 0 ? (
        <p>No food items available at the moment.</p>
      ) : (
        <ul>
          {foodItems.map((item) => (
            <li key={item._id}>
              <strong>{item.name}</strong> - ${item.price}<br />
              {item.description && <p>{item.description}</p>}
              <button onClick={() => onAddToOrder(item._id)}>Add to Order</button>  {/* Add to Order button */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FoodMenuList;