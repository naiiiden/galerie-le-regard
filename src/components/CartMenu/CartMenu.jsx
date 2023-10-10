/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { UseCart } from '../../context/CartContext'
import CartItem from '../CartItem/CartItem';
import TotalPriceAndItems from '../TotalPriceAndItems/TotalPriceAndItems';
import clearAlert from '../../helpers/clearAlert';
import { OpenCart } from "../../context/OpenCartContext";

const CartMenu = ({ className, onClick }) => {

  const { cartState, dispatch } = UseCart(); 

  const { openedCart, openCart, closeCart } = OpenCart();

  return (
    <div inert={!openedCart ? '' : undefined} className={`${className} cart-menu-closed`}>
        <div>
            <h2>Your Cart</h2>
            <button onClick={onClick}>close X</button>
        </div>
        {cartState.cartItems.length !== 0 ? (
                <>
                    <ul>
                        {cartState.cartItems.map((item) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onQuantityChange={(itemToUpdate, newQuantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { itemToUpdate, newQuantity } })}
                            onRemove={(itemToRemove) => 
                                dispatch({ type: 'REMOVE_FROM_CART', payload: { id: itemToRemove.id } },
                                clearAlert(dispatch)
                            )}
                        />
                        ))}
                    </ul>
                    <TotalPriceAndItems/>
                    <button onClick={() => dispatch({ type: 'CLEAR_CART' }, clearAlert(dispatch))}>clear cart</button>
                </>
            ) : (
                <p>Your cart is empty.</p>
            )}
    </div>
  )
}

export default CartMenu