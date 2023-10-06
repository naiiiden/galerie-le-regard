import CartMenu from "../CartMenu/CartMenu";
import { UseCart } from "../../context/CartContext";
import { NavLink, useLocation, Link } from "react-router-dom";
import { OpenCart } from "../../context/OpenCartContext";

const Header = () => {
    const { cartState } = UseCart();

    const { openedCart, openCart, closeCart } = OpenCart();

    openedCart ? document.body.style.overflow = "hidden" : document.body.style.overflow = "";

    const location = useLocation();

    return (
        <>
            <div className={`click-outside ${openedCart ? "close" : ""}`} onClick={() => closeCart()}></div>
            <header style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid red',
                }}>
                    {
                        location.pathname === "/" 
                        ? <h1>Cart functionality</h1>
                        : 
                        <>
                            <h1 className="sr-only">Cart functionality</h1>
                            <Link to="/">Go back</Link>
                        </>
                    }
                <nav>
                    <NavLink inert={openedCart ? '' : undefined} to="/" style={{ marginRight: '1rem' }}>All Products</NavLink>
                    <button inert={openedCart ? '' : undefined} onClick={() => openCart()} style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem' }} aria-label={openedCart ? "Close Cart" : "Open Cart"} aria-live="polite">
                        Cart
                    </button>
                    <CartMenu className={openedCart ? 'cart-menu-open' : 'cart-menu-closed'} onClick={() => closeCart()}/>
                    {cartState.alert === null ? null : <p id="global-alert" key={Math.random()} aria-live="polite">{cartState.alert}</p>}
                </nav>
            </header>
        </>
    )
}

export default Header