import CartMenu from "../CartMenu/CartMenu";
import { UseCart } from "../../context/CartContext";
import { NavLink, Link, useLocation } from "react-router-dom";
import { OpenCart } from "../../context/OpenCartContext";
import TotalProductsInCart from "../TotalProductsInCart/TotalProductsInCart";

const Header = () => {
    const location = useLocation();

    const { cartState } = UseCart();
    const { openedCart, openCart, closeCart } = OpenCart();

    openedCart ? document.body.style.overflow = "hidden" : document.body.style.overflow = "";

    if (location.pathname !== "/asd") {
        return (
            <>
                <div className={`click-outside ${openedCart ? "close" : ""}`} onClick={() => closeCart()}></div>
                <header>
                    <NavLink to="/">Le Regard</NavLink>
                    <nav>
                        {location.pathname === "/" ? 
                            undefined 
                            : <Link inert={openedCart ? '' : undefined} to="/paintings" aria-current={location.pathname === '/paintings' ? 'page' : undefined}>All Products</Link>}
                        <button inert={openedCart ? '' : undefined} onClick={() => openCart()} aria-label={openedCart ? "Close Cart" : "Open Cart"} aria-live="polite">
                            Cart
                            (<TotalProductsInCart/>)
                        </button>
                        <CartMenu className={openedCart ? 'cart-menu-open' : 'cart-menu-closed'} onClick={() => closeCart()}/>
                        {cartState.alert === null ? null : <p id="global-alert" key={Math.random()} aria-live="polite">{cartState.alert}</p>}
                    </nav>
                </header>
            </>
        )
    }
}

export default Header