import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
      });

      useEffect(() => {
        // Save cartItems to localStorage whenever it changes
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
      }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.itemID === product.itemID);
      if (itemExists) {
        return prevItems.map((item) =>
          item.itemID === product.itemID
            ? { ...item, quantity: item.quantity + 1 } // Increment quantity if item exists
            : item
        );
      }
      return [...prevItems, product]; // Add new item if it doesn't exist
    });
  };
  
  

  const removeFromCart = (itemID) => {
    setCartItems((prevItems) => prevItems.filter(item => item.itemID !== itemID));
  };
  

  const updateQuantity = (itemID, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.itemID === itemID
          ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
          : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.retailPrice) * item.quantity;
      return total + itemPrice;
    }, 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };


  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, calculateTotal, clearCart, getTotalItems }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
