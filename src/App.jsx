import Cart from "./pages/Cart/Cart";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import TotalProductsInCart from "./components/TotalProductsInCart/TotalProductsInCart";
import { useCart } from "./context/CartContext";
import { Routes, Route, NavLink } from "react-router-dom";

import './styles/general.css';
import Products from "./pages/Products/Products";
import CartDropdown from "./components/CartDropdown/CartDropdown";
import { useState } from "react";

const App = () => {
  const ulStyle = {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexWrap: 'wrap',
  }

  const { cartState, dispatch } = useCart();

  const [openCart, setOpenCart] = useState(false);

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
          <button onClick={() => setOpenCart(!openCart)} style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem' }}>
            Cart
            <TotalProductsInCart/>
          </button>
          <CartDropdown className={openCart ? 'cart-menu-open' : 'cart-menu-closed'}/>
          {cartState.alert === null ? null : <p id="global-alert" key={Math.random()} aria-live="polite">{cartState.alert}</p>}
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Products style={ulStyle}/>}/>
          <Route path="/cart" element={<Cart style={ulStyle}/>}/>
          <Route path="/:productName" element={<SingleProduct onQuantityChange={(itemToUpdate, newQuantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { itemToUpdate, newQuantity } })}/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App;
