/* eslint-disable react/prop-types */
import { UseCart } from '../../context/CartContext';

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1 && newQuantity <= item.availableQuantity) {
      onQuantityChange(item, newQuantity);
    }
  };

  // DEBUGGING
  const { cartState } = UseCart(); 
  const productInCart = cartState.products.find((product) => product.name === item.name);
  console.log(productInCart);
  console.log('end');
  // cartItem is rerendered after global alert ends

  return (
    <li key={item.id}>
      <p>{item.name} - ${item.price}</p>
      <p>TEST available quantity left: {productInCart.quantity}</p>
      <label htmlFor={`quantity-product-${item.id}`}>Quantity: </label>
      <input
        id={`quantity-product-${item.id}`}
        type='number'
        value={item.quantity}
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
