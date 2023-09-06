import { useCart } from "../../context/CartContext";

const TotalProductsInCart = () => {
    const { cartState } = useCart();
    
    let totalItemsInCart = 0;
    
    cartState.cartItems.forEach(() => {
        totalItemsInCart = cartState.cartItems.length;
    });

    return <span>{totalItemsInCart}</span>
}

export default TotalProductsInCart