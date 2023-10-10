import CartMenu from "../CartMenu/CartMenu";
import { UseCart } from "../../context/CartContext";
import { NavLink, Link, useLocation } from "react-router-dom";
import { OpenCart } from "../../context/OpenCartContext";

const Header = () => {
    const location = useLocation();

    const { cartState } = UseCart();
    const { openedCart, openCart, closeCart } = OpenCart();

    openedCart ? document.body.style.overflow = "hidden" : document.body.style.overflow = "";

    return (
        <>
            <div className={`click-outside ${openedCart ? "close" : ""}`} onClick={() => closeCart()}></div>
            <header style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid red',
                }}>
                <NavLink to="/">Cart functionality</NavLink>
                <nav>
                    {location.pathname === "/" ? 
                        undefined 
                        : <Link inert={openedCart ? '' : undefined} to="/paintings" style={{ marginRight: '1rem' }} aria-current={location.pathname === '/paintings' ? 'page' : undefined}>All Products</Link>}
                    <button inert={openedCart ? '' : undefined} onClick={() => openCart()} style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem' }} aria-label={openedCart ? "Close Cart" : "Open Cart"} aria-live="polite">
                        Cart
                        <span>{cartState.cartItems.length}</span>
                    </button>
                    <CartMenu className={openedCart ? 'cart-menu-open' : 'cart-menu-closed'} onClick={() => closeCart()}/>
                    {cartState.alert === null ? null : <p id="global-alert" key={Math.random()} aria-live="polite">{cartState.alert}</p>}
                </nav>
            </header>
        </>
    )
}

export default Header