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
            <p><span>Total price:</span> ${totalSumOfItemsInCart.toLocaleString()}</p>
            <p><span>Total items in cart:</span> <TotalProductsInCart/></p>
        </div>
    )
}

export default TotalPriceAndItems