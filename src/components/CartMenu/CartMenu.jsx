/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { UseCart } from '../../context/CartContext'
import CartItem from '../CartItem/CartItem';
import TotalPriceAndItems from '../TotalPriceAndItems/TotalPriceAndItems';
import clearAlert from '../../helpers/clearAlert';
import { OpenCart } from "../../context/OpenCartContext";

const CartMenu = ({ className, onClick }) => {

  const { cartState, dispatch } = UseCart(); 

  const { openedCart } = OpenCart();

  return (
    <div inert={!openedCart ? '' : undefined} className={`${className} cart-menu-closed`}>
        <div className="cart-header">
            <h2>Your Cart</h2>
            <button onClick={onClick} aria-label="Close cart">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width='20'>
                    <path stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" d="m2 2 20 20m0-20L2 22"></path>
                </svg>
            </button>
        </div>
        {cartState.cartItems.length !== 0 
        ? <>
            <ul>
                {cartState.cartItems.map((item) => (
                    <CartItem
                        key={item.id}
                        item={item}
                        onQuantityChange={(itemToUpdate, newQuantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { itemToUpdate, newQuantity } })}
                        onRemove={(itemToRemove) => dispatch({ type: 'REMOVE_FROM_CART', payload: { id: itemToRemove.id } }, clearAlert(dispatch))}
                    />
                ))}
            </ul>
            <div>
                <TotalPriceAndItems/>
                <button className="black-btn" onClick={() => dispatch({ type: 'CLEAR_CART' }, clearAlert(dispatch))} aria-label="Remove all items from cart">Clear cart</button>
            </div>
        </>
        : <p className="cart-empty-text">Your cart is empty.</p>}
    </div>
  )
}

export default CartMenu