import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

// Contexts
import { ProductContext } from './contexts/ProductContext.js';
import { CartContext } from './contexts/CartContext.js';

// Hooks
import { useLocalStorage } from './hooks/useLocalStorage.js';

function App() {
	const [products] = useState(data);
	const [cart, setCart] =  useLocalStorage('cart', []);

	const addItem = item => {
		setCart([...cart, item]);
	};

	const removeItem = id => {
		setCart(cart.filter(item => {
			return item.id !== id;
		}))
	}

	return (
		<div className="App">
			<ProductContext.Provider value={{products, addItem}}>
			<CartContext.Provider value={{cart, removeItem}}>
				<Navigation />

				{/* Routes */}
				<Route exact path="/" component={Products} />
				<Route path="/cart" component={ShoppingCart} />

			</CartContext.Provider>
			</ProductContext.Provider>
		</div>
	);
}

export default App;
