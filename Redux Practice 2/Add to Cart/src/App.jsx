// src/App.js
import React from 'react';
import Product from './Components/Product.jsx';
import Cart from './Components/Cart.jsx';
import { Provider } from 'react-redux';
import { store } from './App/Store.js';


const products = [
  { id: 1, name: 'Product 1', price: 240 },
  { id: 2, name: 'Product 2', price: 30 },
  // Add more products as needed
  { id: 3, name: 'Product 3', price: 240 },
  { id: 4, name: 'Product 4', price: 330 },{ id: 1, name: 'Product 1', price: 240 },
  { id: 5, name: 'Product 5', price: 350 },{ id: 1, name: 'Product 1', price: 240 },
  { id: 6, name: 'Product 6', price: 360 },


];

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>Online Store</h1>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '20px' }}>
            <h2>Products</h2>
<Product/>
           </div>
          {/* <Cart /> */}
        </div>
      </div>
    </Provider>
  );
};

export default App;
