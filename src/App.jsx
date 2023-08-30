import { useState } from "react"

const App = () => {
  const products = [
    {
      id: 1,
      name: 'Product 1',
      price: 11.99,
    },
    {
      id: 2,
      name: 'Product 2',
      price: 12.99,
    },
    {
      id: 3,
      name: 'Product 3',
      price: 13.99,
    },
    {
      id: 4,
      name: 'Product 4',
      price: 14.99,
    },
    {
      id: 5,
      name: 'Product 5',
      price: 15.99,
    },
    {
      id: 6,
      name: 'Product 6',
      price: 16.99,
    },
    {
      id: 7,
      name: 'Product 7',
      price: 17.99,
    },
    {
      id: 8,
      name: 'Product 8',
      price: 18.99,
    },
    {
      id: 9,
      name: 'Product 9',
      price: 19.99,
    },
  ]

  const [cartItems, setCartItems] = useState([]);
  
  const addItemToCart = (item) => {
    setCartItems([...cartItems, item]);
    console.log('cart: ', cartItems);
  }

  return (
    <main>
      <h1>Cart functionality</h1>
      <ul style={{
        listStyle: 'none',
        padding: 0,
      }}>
        {products.map((product) => (
          <li key={product.id} style={{
            background: 'darkcyan',
            width: 'fit-content',
            padding: '1rem',
            margin: '1rem 0',
          }}>
            <p style={{
              margin: '0 0 .5rem 0',
            }}>{product.name} - ${product.price}</p>
            <button onClick={() => addItemToCart(product)}>Add to cart</button>
          </li>
        ))}
      </ul>
      <h2>Cart</h2>
      {cartItems.length !== 0 && 
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>{item.name} - ${item.price}</li>
          ))}
        </ul>
      }
    </main>
  )
}

export default App