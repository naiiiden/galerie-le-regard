import TotalProductsInCart from "../TotalProductsInCart/TotalProductsInCart";
import CartDropdown from "../CartDropdown/CartDropdown";
import { useCart } from "../../context/CartContext";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Header = () => {
    const { cartState } = useCart();

    const [openCart, setOpenCart] = useState(false);

    openCart ? document.body.style.overflow = "hidden" : document.body.style.overflow = "";

    return (
        <header style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px solid red',
            }}>
            <h1>Cart functionality</h1>
            <nav>
                <NavLink to="/" style={{ marginRight: '1rem' }}>All Products</NavLink>
                <button onClick={() => setOpenCart(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem' }}>
                Cart
                <TotalProductsInCart/>
                </button>
                <CartDropdown className={openCart ? 'cart-menu-open' : 'cart-menu-closed'} onClick={() => setOpenCart(false)}/>
                {cartState.alert === null ? null : <p id="global-alert" key={Math.random()} aria-live="polite">{cartState.alert}</p>}
            </nav>
        </header>
    )
}

export default Header