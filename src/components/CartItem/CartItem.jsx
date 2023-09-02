/* eslint-disable react/prop-types */
const CartItem = ({ item, onChange, onClick }) => {
  return (
    <li key={item.id} style={{
        border: '1px solid red',
        width: 'fit-content',
        padding: '1rem',
        margin: '1rem',
      }}>
      <p>{item.name} - ${item.price}</p>
      <label htmlFor={`quantity-product-${item.id}`}>Quantity: </label>
      <input
        id={`quantity-product-${item.id}`}
        type='number'
        value={item.quantity}
        onChange={onChange}
        min='1'
        max={item.availableQuantity}
      />
      <br/>
      <button onClick={onClick} aria-label={`Remove ${item.name} from your cart`}>Remove from cart</button>
    </li>
  )
}

export default CartItem