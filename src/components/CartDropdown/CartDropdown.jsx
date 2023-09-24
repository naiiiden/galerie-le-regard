import { useCart } from '../../context/CartContext'
import CartItem from '../CartItem/CartItem';
import TotalPriceAndItems from '../TotalPriceAndItems/TotalPriceAndItems';
import clearAlert from '../../helpers/clearAlert';

const CartDropdown = ({ className, onClick }) => {

  const { cartState, dispatch } = useCart(); 

  return (
    <div className={`${className} cart-menu-closed`}>
        <button onClick={onClick}>close</button>
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
                </>
            ) : (
                <p>Your cart is empty.</p>
            )}
    </div>
  )
}

export default CartDropdown