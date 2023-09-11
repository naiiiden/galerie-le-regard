import { useState } from "react";
import Cart from "./components/Cart/Cart";
import ProductItem from "./components/ProductItem/ProductItem";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import TotalProductsInCart from "./components/TotalProductsInCart/TotalProductsInCart";
import { useCart } from "./context/CartContext";
import { Routes, Route, NavLink } from "react-router-dom";
import clearAlert from "./helpers/clearAlert";

import './test.css';

const App = () => {
  const ulStyle = {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexWrap: 'wrap',
  }

  const { cartState, dispatch } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [...new Set(cartState.products.map(product => product.category))];
  const filteredProducts = selectedCategory === '' 
    ? cartState.products 
    : cartState.products.filter(product => product.category === selectedCategory)

  return (
    <div className="App">
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '1px solid red',
      }}>
        <h1>Cart functionality</h1>
        <nav>
          <NavLink to="/" style={{ marginRight: '1rem' }}>All Products</NavLink>
          <NavLink to="/cart" style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem' }}>
            Cart
            <TotalProductsInCart/>
          </NavLink>
          {cartState.alert === null ? null : <p id="global-alert" key={Math.random()} aria-live="polite">{cartState.alert}</p>}
        </nav>
      </header>
      <Routes>
        <Route path="/" element={
          <main>
            <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
              <option value={''}>Filter by category</option>
              {categories.map(category => 
                <option key={category} value={category}>{category}</option>
              )}
            </select>
            <ul style={ulStyle}>
              {filteredProducts.map((product) => (
                <ProductItem 
                  linkHref={product.name}
                  product={product} 
                  key={product.id}
                  onClick={() => 
                    dispatch({ type: 'ADD_TO_CART', payload: product }, 
                    clearAlert(dispatch)
                  )}
                />
              ))}
            </ul>
          </main>
        }/>
        <Route path="/cart" element={<Cart style={ulStyle}/>}/>
        <Route path="/:productName" element={<SingleProduct/>}/>
      </Routes>
    </div>
  )
}

export default App;
