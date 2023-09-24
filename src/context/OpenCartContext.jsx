/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const OpenCartContext = createContext();

export const OpenCartProvider = ({ children }) => {
    const [openedCart, setOpenedCart] = useState(false);

    const openCart = () => setOpenedCart(true);
    const closeCart = () => setOpenedCart(false);

    return (
        <OpenCartContext.Provider value={{ openedCart, openCart, closeCart }}>
            {children}
        </OpenCartContext.Provider>
    )
}

export const OpenCart = () => {
    const context = useContext(OpenCartContext);
    return context;
};