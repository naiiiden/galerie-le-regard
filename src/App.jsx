import { useState } from "react"

const App = () => {
  const ulStyle = {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexWrap: 'wrap',
  }

  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Product 1',
      price: 11.99,
      quantity: 5,
    },
    {
      id: 2,
      name: 'Product 2',
      price: 12.99,
      quantity: 10,
    },
    {
      id: 3,
      name: 'Product 3',
      price: 13.99,
      quantity: 2,
    },
    {
      id: 4,
      name: 'Product 4',
      price: 14.99,
      quantity: 3,
    },
    {
      id: 5,
      name: 'Product 5',
      price: 15.99,
      quantity: 20,
    },
    {
      id: 6,
      name: 'Product 6',
      price: 16.99,
      quantity: 15,
    },
    {
      id: 7,
      name: 'Product 7',
      price: 17.99,
      quantity: 0,
    },
    {
      id: 8,
      name: 'Product 8',
      price: 18.99,
      quantity: 7,
    },
    {
      id: 9,
      name: 'Product 9',
      price: 19.99,
      quantity: 6,
    },
  ])
  const [cartItems, setCartItems] = useState([]);
  
  let totalSumOfItemsInCart = 0;
  cartItems.forEach(item => totalSumOfItemsInCart += item.price * item.quantity);

  const addItemToCart = (item) => {
    // Find the index of the item in the products array
    const productIndex = products.findIndex((product) => product.id === item.id);
    // Create a copy of the products array to ensure immutability
    const updatedProducts = [...products];
  
    // Check if the item is in the products array and its quantity is greater than 0
    if (productIndex !== -1 && products[productIndex].quantity > 0) {
      // Find the index of the item in the cartItems array
      const cartItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
  
      // If the item is already in the cart, update its quantity
      if (cartItemIndex !== -1) {
        // Create a copy of the cartItems array to ensure immutability
        const updatedCart = [...cartItems];
        // Get the existing cart item and create an updated version with increased quantity
        const existingCartItem = updatedCart[cartItemIndex];
        const updatedCartItem = { ...existingCartItem, quantity: existingCartItem.quantity + 1 };
        // Replace the existing cart item with the updated version
        updatedCart[cartItemIndex] = updatedCartItem;
        // Update the cartItems state with the updated cart
        setCartItems(updatedCart);
      } else {
        // Add the new cart item to the cartItems array
        // If the item is not in the cart, create a new cart item with quantity 1
        const newCartItem = { ...item, quantity: 1, availableQuantity: item.quantity };
        setCartItems([...cartItems, newCartItem]);
      }
  
      // Create an updated version of the product with decreased quantity
      const updatedProduct = { ...updatedProducts[productIndex] };
      updatedProduct.quantity -= 1;
      // Replace the existing product with the updated version
      updatedProducts[productIndex] = updatedProduct;
      // Update the products state with the updated products
      setProducts(updatedProducts);
    }
  };

  const removeItemFromCart = (item) => {
    // Find the index of the removed item in the cartItems array
    const cartItemIndex = cartItems.findIndex(cartItem => cartItem === item);
  
    if (cartItemIndex !== -1) {
      const removedCartItem = cartItems[cartItemIndex];
      // Increase the quantity of the corresponding product in the products array
      const productIndex = products.findIndex(product => product.id === removedCartItem.id);
      
      if (productIndex !== -1) {
        const updatedProducts = [...products];
        updatedProducts[productIndex].quantity += removedCartItem.quantity;
        setProducts(updatedProducts);
      }
  
      // Remove the item from the cartItems array
      const updatedCartItems = [...cartItems];
      updatedCartItems.splice(cartItemIndex, 1);
      setCartItems(updatedCartItems);
    }
  };

  const handleQuantityChange = (item, newQuantity) => {
    const numericNewQuantity = parseInt(newQuantity, 10);

    if (!isNaN(numericNewQuantity) && numericNewQuantity >= 1) {
      // Use the stored available quantity to limit the input
      if (numericNewQuantity <= item.availableQuantity) {
        const updatedCart = cartItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: numericNewQuantity } : cartItem
        );
        setCartItems(updatedCart);

        // Update the product's quantity as well
        const productIndex = products.findIndex((product) => product.id === item.id);
        if (productIndex !== -1) {
          const updatedProducts = [...products];
          updatedProducts[productIndex].quantity += item.quantity - numericNewQuantity;
          setProducts(updatedProducts);
        }
      } else {
        // If the new quantity exceeds available quantity, set it to the available quantity
        const updatedCart = cartItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: item.availableQuantity } : cartItem
        );
        setCartItems(updatedCart);
      }
    }
  };

  return (
    <main>
      <h1>Cart functionality</h1>
      <ul style={ulStyle}>
        {products.map((product) => (
          <li key={product.id} style={{
            background: 'darkcyan',
            width: 'fit-content',
            padding: '1rem',
            margin: '1rem',
          }}>
            <p style={{
              margin: '0 0 .5rem 0',
            }}>{product.name} - ${product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <button onClick={() => addItemToCart(product)} disabled={product.quantity === 0}>Add to cart</button>
          </li>
        ))}
      </ul>
      <h2>Cart Items</h2>
      {cartItems.length !== 0 &&
        <>
          <ul style={ulStyle}>
            {cartItems.map((item) => (
              <li key={item.id} style={{
                border: '1px solid red',
                width: 'fit-content',
                padding: '1rem',
                margin: '1rem',
              }}>
                <p>{item.name} - ${item.price}</p>
                <label htmlFor="quantity">Quantity: </label>
                <input
                  id='quantity'
                  type='number'
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item, e.target.value)}
                  min='1'
                  max={item.availableQuantity}
                />
                <br/>
                <button onClick={() => removeItemFromCart(item)}>Remove from cart</button>
              </li>
            ))}
          </ul>
  
          <p>Total price: {totalSumOfItemsInCart.toFixed(2)}</p>
        </>
      }
    </main>
  )
}

export default App