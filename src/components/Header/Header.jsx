import CartMenu from "../CartMenu/CartMenu";
import { UseCart } from "../../context/CartContext";
import { Link, useLocation } from "react-router-dom";
import { OpenCart } from "../../context/OpenCartContext";
import TotalProductsInCart from "../TotalProductsInCart/TotalProductsInCart";
import Logo from "../Logo/Logo";

const Header = () => {
    const location = useLocation();

    const { cartState } = UseCart();
    const { openedCart, openCart, closeCart } = OpenCart();

    openedCart ? document.body.style.overflow = "hidden" : document.body.style.overflow = "";

    return (
        <>
            {location.pathname === "/" 
                ? undefined 
                : <div className={`click-outside ${openedCart ? "close" : ""}`} onClick={() => closeCart()}></div>}
            <header>
                <Logo className={location.pathname.split("/").length === 4 ? "opacity" : ""}/>
                {location.pathname === "/"
                    ? undefined
                    : <>
                        <nav>
                            <Link inert={openedCart ? '' : undefined} to="/paintings" aria-current={location.pathname === '/paintings' ? 'page' : undefined}>Paintings</Link>
                            <button inert={openedCart ? '' : undefined} onClick={() => openCart()} aria-label={openedCart ? "Close Cart" : "Open Cart"} aria-live="polite">
                                Cart
                                (<TotalProductsInCart/>)
                            </button>
                            <CartMenu className={openedCart ? 'cart-menu-open' : 'cart-menu-closed'} onClick={() => closeCart()}/>
                        </nav>
                        {cartState.alert === null ? null : <p id="global-alert" key={Math.random()} aria-live="polite">{cartState.alert}</p>}
                    </> 
                }
            </header>
        </>
    )
}

export default Header