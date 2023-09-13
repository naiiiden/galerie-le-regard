/* eslint-disable react/prop-types */
import { useState } from 'react';

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1 && newQuantity <= item.availableQuantity) {
      setQuantity(newQuantity);
      onQuantityChange(item, newQuantity);
    }
  };

  console.log('initial quantity: ', quantity);
  console.log('max quantity: ', item.availableQuantity);

  return (
    <li key={item.id} style={{
        border: '1px solid red',
        width: 'fit-content',
        padding: '1rem',
        margin: '1rem',
      }}>
      <p>{item.name} - ${item.price}</p>
      <p>test max quantity: {item.availableQuantity}</p>
      <label htmlFor={`quantity-product-${item.id}`}>Quantity: </label>
      <input
        id={`quantity-product-${item.id}`}
        type='number'
        value={quantity}
        onChange={handleQuantityChange}
        min='1'
        max={item.availableQuantity}
      />
      <br/>
      <button onClick={() => onRemove(item)} aria-label={`Remove ${item.name} from your cart`}>Remove from cart</button>
    </li>
  )
}

export default CartItem;
