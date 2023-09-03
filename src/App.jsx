import CartItem from "./components/CartItem/CartItem";
import ProductItem from "./components/ProductItem/ProductItem";
import { useCart } from "./context/CartContext";

const App = () => {
  const ulStyle = {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexWrap: 'wrap',
  }
  
  const { cartState, dispatch } = useCart();

  let totalSumOfItemsInCart = 0;
  cartState.cartItems.forEach((item) => {
    totalSumOfItemsInCart += item.price * item.quantity;
  });

  return (
    <main>
      <h1>Cart functionality</h1>
      <ul style={ulStyle}>
        {cartState.products.map((product) => (
          <ProductItem 
            product={product} 
            key={product.id}
            onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
          />
        ))}
      </ul>
      <h2>Cart Items</h2>
      {cartState.cartItems.length !== 0 ?
        <>
          <ul style={ulStyle}>
            {cartState.cartItems.map((item) => (
              <CartItem 
                item={item} 
                key={item.id} 
                onChange={(newQuantity) => {
                  dispatch({ type: 'UPDATE_QUANTITY', payload: { itemToUpdate: item, newQuantity } });
                }}
                onClick={() => {
                  dispatch({ type: 'REMOVE_FROM_CART', payload: item });
                }}
              />
            ))}
          </ul>
  
          <p>Total price: {totalSumOfItemsInCart.toFixed(2)}</p>
        </>
        :
        <p>Your cart is empty.</p>
      }
    </main>
  )
}

export default App







  // const addItemToCart = (item) => {
  //   // // Find the index of the item in the products array
  //   // const productIndex = products.findIndex((product) => product.id === item.id);
  //   // // Create a copy of the products array to ensure immutability
  //   // const updatedProducts = [...products];
  
  //   // // Check if the item is in the products array and its quantity is greater than 0
  //   // if (productIndex !== -1 && products[productIndex].quantity > 0) {
  //   //   // Find the index of the item in the cartItems array
  //   //   const cartItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
  
  //   //   // If the item is already in the cart, update its quantity
  //   //   if (cartItemIndex !== -1) {
  //   //     // Create a copy of the cartItems array to ensure immutability
  //   //     const updatedCart = [...cartItems];
  //   //     // Get the existing cart item and create an updated version with increased quantity
  //   //     const existingCartItem = updatedCart[cartItemIndex];
  //   //     const updatedCartItem = { ...existingCartItem, quantity: existingCartItem.quantity + 1 };
  //   //     // Replace the existing cart item with the updated version
  //   //     updatedCart[cartItemIndex] = updatedCartItem;
  //   //     // Update the cartItems state with the updated cart
  //   //     setCartItems(updatedCart);
  //   //   } else {
  //   //     // Add the new cart item to the cartItems array
  //   //     // If the item is not in the cart, create a new cart item with quantity 1
  //   //     const newCartItem = { ...item, quantity: 1, availableQuantity: item.quantity };
  //   //     setCartItems([...cartItems, newCartItem]);
  //   //   }
  
  //   //   // Create an updated version of the product with decreased quantity
  //   //   const updatedProduct = { ...updatedProducts[productIndex] };
  //   //   updatedProduct.quantity -= 1;
  //   //   // Replace the existing product with the updated version
  //   //   updatedProducts[productIndex] = updatedProduct;
  //   //   // Update the products state with the updated products
  //   //   setProducts(updatedProducts);
  //   // }
  // };

  // const removeItemFromCart = (item) => {
    // // Find the index of the removed item in the cartItems array
    // const cartItemIndex = cartItems.findIndex(cartItem => cartItem === item);
  
    // if (cartItemIndex !== -1) {
    //   const removedCartItem = cartItems[cartItemIndex];
    //   // Increase the quantity of the corresponding product in the products array
    //   const productIndex = products.findIndex(product => product.id === removedCartItem.id);
      
    //   if (productIndex !== -1) {
    //     const updatedProducts = [...products];
    //     updatedProducts[productIndex].quantity += removedCartItem.quantity;
    //     setProducts(updatedProducts);
    //   }
  
    //   // Remove the item from the cartItems array
    //   const updatedCartItems = [...cartItems];
    //   updatedCartItems.splice(cartItemIndex, 1);
    //   setCartItems(updatedCartItems);
    // }
  // };

  // const handleQuantityChange = (item, newQuantity) => {
  //   const numericNewQuantity = parseInt(newQuantity, 10);

  //   if (!isNaN(numericNewQuantity) && numericNewQuantity >= 1) {
  //     // Use the stored available quantity to limit the input
  //     if (numericNewQuantity <= item.availableQuantity) {
  //       const updatedCart = cartItems.map((cartItem) =>
  //         cartItem.id === item.id ? { ...cartItem, quantity: numericNewQuantity } : cartItem
  //       );
  //       setCartItems(updatedCart);

  //       // Update the product's quantity as well
  //       const productIndex = products.findIndex((product) => product.id === item.id);
  //       if (productIndex !== -1) {
  //         const updatedProducts = [...products];
  //         updatedProducts[productIndex].quantity += item.quantity - numericNewQuantity;
  //         setProducts(updatedProducts);
  //       }
  //     } else {
  //       // If the new quantity exceeds available quantity, set it to the available quantity
  //       const updatedCart = cartItems.map((cartItem) =>
  //         cartItem.id === item.id ? { ...cartItem, quantity: item.availableQuantity } : cartItem
  //       );
  //       setCartItems(updatedCart);
  //     }
  //   }
  // };