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
  console.log(productInCart.name + ' product left quantity ' + productInCart.quantity);

  console.log('product', productInCart);


  return (
    <li key={item.id} style={{
        border: '1px solid red',
        width: 'fit-content',
        padding: '1rem',
        margin: '1rem',
      }}>
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
