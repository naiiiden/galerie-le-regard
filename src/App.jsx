/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import CartItem from "./components/CartItem/CartItem";
import ProductItem from "./components/ProductItem/ProductItem";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import TotalPriceAndItems from "./components/TotalPriceAndItems/TotalPriceAndItems";
import TotalProductsInCart from "./components/TotalProductsInCart/TotalProductsInCart";
import { useCart } from "./context/CartContext";
import { Routes, Route, Link } from "react-router-dom";

const App = () => {
  const ulStyle = {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexWrap: 'wrap',
  }

  const { cartState, dispatch, alert } = useCart();

  useEffect(() => {
    console.log('Alert effect triggered');
    // Clear the alert message after a delay (3 seconds)
    if (alert) {
      setTimeout(() => {
        console.log('Clearing alert');
        dispatch({ type: 'CLEAR_ALERT' });
      }, 3000);
    }
  }, [alert, dispatch]);
  

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
          <Link to="/" style={{ marginRight: '1rem' }}>All Products</Link>
          <Link to="/cart" style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem' }}>
            Cart
            <TotalProductsInCart/>
          </Link>
          <p id="global-alert">{cartState.alert}</p> {/* Use cartState.alert */}
        </nav>
      </header>
      <Routes>
        <Route path="/" element={
          <main>
            <ul style={ulStyle}>
              {cartState.products.map((product) => (
                <ProductItem 
                  linkHref={product.name}
                  product={product} 
                  key={product.id}
                  onClick={() => 
                    dispatch({ type: 'ADD_TO_CART', payload: product }, 
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
