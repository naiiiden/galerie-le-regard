/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-case-declarations */
import { createContext, useContext, useReducer, useEffect } from "react";
import productData from '../products.json';

const initialState = {
  products: productData,
  cartItems: [],
  alert: null,
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
            alert: `${productToAdd.name} added to cart`,
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
            alert: `${productToAdd.name} added to cart`,
          };
        }
      }
      return state;

    case 'REMOVE_FROM_CART':
      const removedProductId = action.payload.id;
      const removedCartItem = state.cartItems.find((cartItem) => cartItem.id === removedProductId);

      if (removedCartItem) {
        const updatedProducts = state.products.map((product) =>
          product.id === removedProductId
            ? { ...product, quantity: product.quantity + removedCartItem.quantity }
            : product
        );

        const updatedCartItems = state.cartItems.filter((cartItem) => cartItem.id !== removedProductId);

        return {
          ...state,
          cartItems: updatedCartItems,
          products: updatedProducts,
          alert: `${removedCartItem.name} removed from cart`,
        };
      }
      return state;
      
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

    case 'CLEAR_CART':
      return {
        ...state,
        cartItems: [],
        // not sure about products
        products: productData,
        alert: `Cart has been cleared`,
      };

    case 'SET_ALERT':
      return {
        ...state,
        alert: action.payload,
      };

    case 'CLEAR_ALERT':
      return {
        ...state,
        alert: null,
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    fetch(`src/products.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error initializing cart:', error);
      });
  }, []);

  return (
    <CartContext.Provider value={{ cartState, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const UseCart = () => {
  const context = useContext(CartContext);
  return context;
};
