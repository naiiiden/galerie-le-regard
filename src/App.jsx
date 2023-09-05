/* eslint-disable no-unused-vars */
import Cart from "./components/Cart/Cart";
import CartItem from "./components/CartItem/CartItem";
import ProductItem from "./components/ProductItem/ProductItem";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import TotalPriceAndItems from "./components/TotalPriceAndItems/TotalPriceAndItems";
import { useCart } from "./context/CartContext";
import { Routes, Route, Link } from "react-router-dom";

const App = () => {
  const ulStyle = {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexWrap: 'wrap',
  }

  const { cartState, dispatch } = useCart();

  return (
    <div className="App">
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <h1>Cart functionality</h1>
        <nav>
          <Link to="/" style={{ marginRight: '1rem' }}>All Products</Link>
          <Link to="/cart">Cart</Link>
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
                  onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
                />
              ))}
            </ul>
            {/* FUTURE CART COMPONENT */}
            <Cart style={ulStyle}/>
          </main>
        }/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/:productName" element={<SingleProduct/>}/>
      </Routes>
    </div>
  )
}

export default App;
