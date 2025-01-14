// Import React and the useState hook:
import React, { useEffect } from "react";
import { useState } from "react";

// Define a functional component called `ItemList`:
const ItemList = () => {
	// Set up state for the list of items using `useState`:
	const [items, setItems] = useState(() => {
		// Retrieve the saved items from `localStorage`
		const savedItems = localStorage.getItem('items');
		// check if savedItems exists, then parse the JSON string into an array, If not initialize state into empty array
		return savedItems ? JSON.parse(savedItems) : [];
	});
	// Set up state for the new item input field using `useState`:
	const [newItem, setNewItem] = useState('');

	// Synchronize `items` state with `localStorage using `useEffect`
	useEffect(() => {
		localStorage.setItem('items', JSON.stringify(items));
	}, [items]);

	// Define a function to add a new item to the list:
	const addItem = () => {
		if (newItem.trim()) {
			setItems([...items, newItem]);
			setNewItem('');
		}
	};

	// Define a function to delete item from the list with one parameter.
	const deleteItem = (indexToRemove) => {
		// use the `filter method on `items` array to create new array that excludes at `indexToRemove`
		// in callback function for filter, include items whose index does'nt match `indexToRemove`
		setItems(items.filter((_, index) => index !== indexToRemove));
	};

	// Clear all button function definition
	const clearAllItems = () => {
		setItems([]);
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
				// keyboard navigation.
				onKeyPress={(e) => e.key === 'Enter' && addItem()}
			/>

			{/* Create an `Add` button: */}
			<button className="add-button" onClick={addItem}>Add</button>

			{/* Clear all button */}
			<button className="clear-button" onClick={clearAllItems}>Clear All</button>

			{/* Display the list of items */}
			<ul className="item-list">
				{items.length === 0 ? (
					<p className="empty-message">Your list is empty. Add some items!</p>) : (
						items.map((item, index) => (
						<li key={index} className="item">
							{item}
							{/* Delete an item button */}
							<button onClick={() => deleteItem(index)} className="delete-button">Delete</button>					
						</li>
					)))
				}
			</ul>
		</div>
	);
};

// Export the `ItemList` component as the default export.
export default ItemList;
