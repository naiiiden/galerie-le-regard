/* eslint-disable no-unused-vars */
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

  let totalSumOfItemsInCart = 0;
  let totalItemsInCart = 0;

  // Calculate the total price of items in the cart
  cartState.cartItems.forEach((item) => {
    totalSumOfItemsInCart += item.price * item.quantity;
    totalItemsInCart = cartState.cartItems.length;
  });

  const handleQuantityChange = (itemToUpdate, newQuantity) => {
    // Dispatch the 'UPDATE_QUANTITY' action here
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: {
        itemToUpdate,
        newQuantity,
      },
    });
  };

  const handleRemove = (itemToRemove) => {
    // Dispatch the 'REMOVE_FROM_CART' action here
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: {
        id: itemToRemove.id,
      },
    });
  };

  return (
    <div className="App">
      <header>
        <h1>Cart functionality</h1>
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
                  // Use the dispatch function to add items to the cart
                  onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
                />
              ))}
            </ul>
            <h2>Cart Items</h2>
            {cartState.cartItems.length !== 0 ? (
              <>
                <ul style={ulStyle}>
                  {cartState.cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onQuantityChange={handleQuantityChange}
                      onRemove={handleRemove}
                    />
                  ))}
                </ul>

                <TotalPriceAndItems/>
              </>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </main>
        }/>
        <Route path="/:productName" element={<SingleProduct/>}/>
      </Routes>
    </div>
  )
}

export default App;
