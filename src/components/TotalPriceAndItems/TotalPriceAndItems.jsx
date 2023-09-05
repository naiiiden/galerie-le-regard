import { useCart } from "../../context/CartContext";

const TotalPriceAndItems = () => {
    const { cartState } = useCart();
    
    let totalSumOfItemsInCart = 0;
      let totalItemsInCart = 0;
    
      // Calculate the total price of items in the cart
      cartState.cartItems.forEach((item) => {
        totalSumOfItemsInCart += item.price * item.quantity;
        totalItemsInCart = cartState.cartItems.length;
    });

    return (
        <div>
            <p>Total price: {totalSumOfItemsInCart.toFixed(2)}</p>
            <p>Total items in cart: {totalItemsInCart}</p>
        </div>
    )
}

export default TotalPriceAndItems