import { useCart } from "../../context/CartContext";
import TotalProductsInCart from "../TotalProductsInCart/TotalProductsInCart";

const TotalPriceAndItems = () => {
    const { cartState } = useCart();
    
    let totalSumOfItemsInCart = 0;
    
    // Calculate the total price of items in the cart
    cartState.cartItems.forEach((item) => {
        totalSumOfItemsInCart += item.price * item.quantity;
    });

    return (
        <div>
            <p>Total price: {totalSumOfItemsInCart.toFixed(2)}</p>
            <p style={{ display: 'inline-flex', alignItems: 'center', margin: 0 }}>Total items in cart: <TotalProductsInCart/></p>
        </div>
    )
}

export default TotalPriceAndItems