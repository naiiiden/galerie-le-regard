import { UseCart } from "../../context/CartContext";
import TotalProductsInCart from "../TotalProductsInCart/TotalProductsInCart";

const TotalPriceAndItems = () => {
    const { cartState } = UseCart();
    
    let totalSumOfItemsInCart = 0;
    
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