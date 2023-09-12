import Cart from "./pages/Cart/Cart";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import TotalProductsInCart from "./components/TotalProductsInCart/TotalProductsInCart";
import { useCart } from "./context/CartContext";
import { Routes, Route, NavLink } from "react-router-dom";

import './test.css';
import Products from "./pages/Products/Products";

const App = () => {
  const ulStyle = {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexWrap: 'wrap',
  }

  const { cartState } = useCart();

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
      <main>
        <Routes>
          <Route path="/" element={<Products style={ulStyle}/>}/>
          <Route path="/cart" element={<Cart style={ulStyle}/>}/>
          <Route path="/:productName" element={<SingleProduct/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App;
