/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { OpenCart } from "../../context/OpenCartContext";

const CartItem = ({ item, onQuantityChange, onRemove }) => {

  const { closeCart } = OpenCart();

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1 && newQuantity <= item.availableQuantity) {
      onQuantityChange(item, newQuantity);
    }
  };

  return (
    <li key={item.id}>
        <img src={`/${item.image}`} alt=""/>
        <div className="cart-item-text">
          <div>
            <Link to={`/paintings/${item.category}/${item.name}`} onClick={() => closeCart()} className="text-overflow-fix">{item.name}</Link>
            <button onClick={() => onRemove(item)} aria-label={`Remove ${item.name} from your cart`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width='15'>
                <path stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" d="m2 2 20 20m0-20L2 22"></path>
              </svg>
            </button>
          </div>
          <div className="cart-item-price">
            <p>${item.price}</p>
            <input
              aria-label="Product quantity"
              id={`quantity-product-${item.id}`}
              type='number'
              value={item.quantity}
              onChange={handleQuantityChange}
              min='1'
              max={item.availableQuantity}
            />
          </div>
        </div>
    </li>
  )
}

export default CartItem;
