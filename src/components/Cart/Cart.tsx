import React from 'react';
import CartItem from '../CartItem/CartItem';
import TotalPriceAndItems from '../TotalPriceAndItems/TotalPriceAndItems';
import { useCart } from '../../context/CartContext'

const Cart = ({ style }) => {
    const { cartState, dispatch } = useCart();
    
    return (
        <div>
            <h2>Cart Items</h2>
            {cartState.cartItems.length !== 0 ? (
                <>
                    <ul style={style}>
                        {cartState.cartItems.map((item) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onQuantityChange={(itemToUpdate, newQuantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { itemToUpdate, newQuantity } })}
                            onRemove={(itemToRemove) => 
                                dispatch({ type: 'REMOVE_FROM_CART', payload: { id: itemToRemove.id } },
                                setTimeout(() => {
                                    console.log('Clearing alert');
                                    dispatch({ type: 'CLEAR_ALERT' });
                                }, 3000)
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

export default Cart