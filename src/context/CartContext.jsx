/* eslint-disable react/prop-types */
/* eslint-disable no-case-declarations */
import { createContext, useContext, useReducer } from "react";

const initialState = {
    products: [
        {
            id: 1,
            name: 'Product 1',
            price: 11.99,
            quantity: 5,
          },
          {
            id: 2,
            name: 'Product 2',
            price: 12.99,
            quantity: 10,
          },
          {
            id: 3,
            name: 'Product 3',
            price: 13.99,
            quantity: 2,
          },
          {
            id: 4,
            name: 'Product 4',
            price: 14.99,
            quantity: 3,
          },
          {
            id: 5,
            name: 'Product 5',
            price: 15.99,
            quantity: 20,
          },
          {
            id: 6,
            name: 'Product 6',
            price: 16.99,
            quantity: 15,
          },
          {
            id: 7,
            name: 'Product 7',
            price: 17.99,
            quantity: 0,
          },
          {
            id: 8,
            name: 'Product 8',
            price: 18.99,
            quantity: 7,
          },
          {
            id: 9,
            name: 'Product 9',
            price: 19.99,
            quantity: 6,
          },
    ],
    cartItems: [],
};

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const newItem = action.payload;
            const productIndex = state.products.findIndex((product) => product.id === newItem.id);

            if (productIndex !== -1 && state.products[productIndex].quantity > 0) {
                const cartItemIndex = state.cartItems.findIndex((cartItem) => cartItem.id === newItem.id);

                if (cartItemIndex !== -1) {
                    const updatedCart = [...state.cartItems];
                    const existingCartItem = updatedCart[cartItemIndex];
                    const updatedCartItem = { ...existingCartItem, quantity: existingCartItem.quantity + 1 };
                    updatedCart[cartItemIndex] = updatedCartItem;

                    const updatedProducts = [...state.products];
                    const updatedProduct = { ...updatedProducts[productIndex] };
                    updatedProduct.quantity -= 1;
                    updatedProducts[productIndex] = updatedProduct;

                    return {
                        ...state,
                        cartItems: updatedCart,
                        products: updatedProducts,
                    };
                } else {
                    const newCartItem = { ...newItem, quantity: 1, availableQuantity: newItem.quantity };

                    return {
                        ...state,
                        cartItems: [...state.cartItems, newCartItem],
                        products: state.products.map((product) =>
                        product.id === newItem.id ? { ...product, quantity: product.quantity - 1 } : product
                        ),
                    };
                }
            }
            return state;
        case 'REMOVE_FROM_CART':
            const itemToRemove = action.payload;
            const cartItemIndex = state.cartItems.findIndex((cartItem) => cartItem.id === itemToRemove.id);

            if (cartItemIndex !== -1) {
                const removedCartItem = state.cartItems[cartItemIndex];
                const productIndex = state.products.findIndex((product) => product.id === removedCartItem.id);
                
                if (productIndex !== -1) {
                    const updatedProducts = [...state.products];
                    updatedProducts[productIndex].quantity += removedCartItem.quantity;

                    const updatedCartItems = [...state.cartItems];
                    updatedCartItems.splice(cartItemIndex, 1);

                    return {
                        ...state,
                        cartItems: updatedCartItems,
                        products: updatedProducts,
                    };
                }
            }
            return state;
        case 'UPDATE_QUANTITY':
            const { itemToUpdate, newQuantity } = action.payload;
            const numericNewQuantity = parseInt(newQuantity, 10);
        
            if (!isNaN(numericNewQuantity) && numericNewQuantity >= 1) {
                // Use the stored available quantity to limit the input
                if (numericNewQuantity <= itemToUpdate.availableQuantity) {
                    const updatedCartItems = state.cartItems.map((cartItem) =>
                        cartItem.id === itemToUpdate.id ? { ...cartItem, quantity: numericNewQuantity } : cartItem
                    );
                
                    const updatedProducts = state.products.map((product) =>
                        product.id === itemToUpdate.id ? { ...product, quantity: product.quantity + (itemToUpdate.quantity - numericNewQuantity) } : product
                    );
            
                    return {
                        ...state,
                        cartItems: updatedCartItems,
                        products: updatedProducts,
                    };
                } else {
                    // If the new quantity exceeds available quantity, set it to the available quantity
                    const updatedCartItems = state.cartItems.map((cartItem) =>
                        cartItem.id === itemToUpdate.id ? { ...cartItem, quantity: itemToUpdate.availableQuantity } : cartItem
                    );
                
                    return {
                        ...state,
                        cartItems: updatedCartItems,
                    };
                }
            }

            return state;
        default:
            return state;
    }
}

export const CartProvider = ({ children }) => {
    const [cartState, dispatch] = useReducer(cartReducer, initialState);
    
    return (
        <CartContext.Provider value={{ cartState, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext);
    return context;
}