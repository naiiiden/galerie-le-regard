import { UseCart } from "../../context/CartContext";

const TotalProductsInCart = () => {
    const { cartState } = UseCart();
    
    let totalItemsInCart = 0;
    
    cartState.cartItems.forEach(() => {
        totalItemsInCart = cartState.cartItems.length;
    });

    return <span>{totalItemsInCart}</span>
}

export default TotalProductsInCart