import { useState } from "react"

const App = () => {
  const ulStyle = {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexWrap: 'wrap',
  }

  const products = [
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
  ]

  const [cartItems, setCartItems] = useState([]);
  
  const addItemToCart = (item) => {
    setCartItems([...cartItems, item]);
    console.log('cart: ', cartItems);
  }

  const removeItemFromCart = (item) => {
    const newCartItems = cartItems.filter(i => i !== item)
    setCartItems(newCartItems);
  }

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
        <ul style={ulStyle}>
          {cartItems.map((item) => (
            <li key={item.id} style={{
              border: '1px solid red',
              width: 'fit-content',
              padding: '1rem',
              margin: '1rem',
            }}>
              <p>{item.name} - ${item.price}</p>
              <button onClick={() => removeItemFromCart(item)}>Remove from cart</button>
            </li>
          ))}
        </ul>
      }
    </main>
  )
}

export default App