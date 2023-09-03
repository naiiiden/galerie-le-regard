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
            const productId = action.payload.id;
            const productToAdd = state.products.find((product) => product.id === productId);

            if (!productToAdd || productToAdd.quantity === 0) {
                return state; // Product not found or no more available
            }

            const existingCartItem = state.cartItems.find((cartItem) => cartItem.id === productId);

            if (existingCartItem) {
                if (existingCartItem.quantity < existingCartItem.availableQuantity) {
                    const updatedCartItems = state.cartItems.map((cartItem) =>
                        cartItem.id === productId
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                    );

                    const updatedProducts = state.products.map((product) =>
                        product.id === productId
                        ? { ...product, quantity: product.quantity - 1 }
                        : product
                    );

                    return {
                        ...state,
                        cartItems: updatedCartItems,
                        products: updatedProducts,
                    };
                }
            } else {
                if (productToAdd.quantity > 0) {
                    const newCartItem = {
                        ...productToAdd,
                        quantity: 1,
                        availableQuantity: productToAdd.quantity,
                    };

                    const updatedCartItems = [...state.cartItems, newCartItem];

                    const updatedProducts = state.products.map((product) =>
                        product.id === productId
                        ? { ...product, quantity: product.quantity - 1 }
                        : product
                    );

                    return {
                        ...state,
                        cartItems: updatedCartItems,
                        products: updatedProducts,
                    };
                }
            }
        return state;
      case 'REMOVE_FROM_CART':
        const removedProductId = action.payload.id;
        const removedCartItem = state.cartItems.find((cartItem) => cartItem.id === removedProductId);
  
        if (!removedCartItem) {
          return state;
        }
  
        const updatedCartItems = state.cartItems.filter((cartItem) => cartItem.id !== removedProductId);
  
        const updatedProducts = [...state.products];
        const productToUpdate = updatedProducts.find((product) => product.id === removedProductId);
        productToUpdate.quantity += removedCartItem.quantity;
  
        return {
          ...state,
          cartItems: updatedCartItems,
          products: updatedProducts,
        };
  
      case 'UPDATE_QUANTITY':
        const { itemToUpdate, newQuantity } = action.payload;
  
        const numericNewQuantity = parseInt(newQuantity, 10);
  
        if (!isNaN(numericNewQuantity) && numericNewQuantity >= 1) {
          if (numericNewQuantity <= itemToUpdate.availableQuantity) {
            const updatedCartItems = state.cartItems.map((cartItem) =>
              cartItem.id === itemToUpdate.id ? { ...cartItem, quantity: numericNewQuantity } : cartItem
            );
  
            const updatedProducts = state.products.map((product) =>
              product.id === itemToUpdate.id
                ? { ...product, quantity: product.quantity + (itemToUpdate.quantity - numericNewQuantity) }
                : product
            );
  
            return {
              ...state,
              cartItems: updatedCartItems,
              products: updatedProducts,
            };
          } else {
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
  };
  

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