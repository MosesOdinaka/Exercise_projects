// Import React and the useState hook:
import React from "react";
import { useState } from "react";

// Define a functional component called `ItemList`:
const ItemList = () => {
	// Set up state for the list of items using `useState`:
	const [items, setItems] = useState([]);
	// Set up state for the new item input field using `useState`:
	const [newItem, setNewItem] = useState('');

	// Define a function to add a new item to the list:
	const addItem = () => {
		if (newItem.trim()) {
			setItems([...items, newItem]);
			setNewItem('');
		}
	};

	// Return the component's JSX structue
	return (
		<div className="container">
			<h1 className="title">Item List</h1>
			{/* input field for adding new items: */}
			<input 
				className="input-field"
				type="text"
				value={newItem}
				onChange={(e) => setNewItem(e.target.value)}
				placeholder="Add a new Item"
			/>

			{/* Create an `Add` button: */}
			<button className="add-button" onClick={addItem}>Add</button>

			{/* Display the list of items */}
			<ul className="item-list">
				{items.map((item, index) => (
					<li key={index} className="item">
						{item}
					</li>
				))}
			</ul>
		</div>
	);
};

// Export the `ItemList` component as the default export.
export default ItemList;