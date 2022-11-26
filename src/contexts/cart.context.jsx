import {createContext, useEffect, useState} from "react";

export const CartContext = createContext(
  {
    isCartOpen: false,
    setIsCartOpen: () => {
    },
    cartItems: [],
    addItemToCart: () => {
    },
    cartCount: 0
  }
)

const addCartItem = (cartItems, productToAdd) => {
  // find if product exist
  const existingCartItem = cartItems.find((cartItems) => cartItems.id === productToAdd.id)

  // if found, increment quantity
  if (existingCartItem) {
    return cartItems.map(
      (item) => item.id === productToAdd.id
        ? {...item, quantity: item.quantity + 1}
        : item
    )
  }

  // return new array
  return [...cartItems, {...productToAdd, quantity: 1}]
}

export const CartProvider = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)

  // to change cartCount whenever cartItems changes
  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    setCartCount(newCartCount)
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }

  const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart,cartCount}

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}