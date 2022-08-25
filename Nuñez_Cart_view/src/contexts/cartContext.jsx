import React, { createContext, useState } from 'react'

export const CartContext = createContext()

function CartProvider(props) {
  const [cartItems, setCartItems] = useState([])
  function clearCart() {
    setCartItems([])
  }
  function isInCart(id) {
    cartItems.find(product => product.id === id)
  }

  function removeProduct(id) {
    setCartItems(cartItems.filter(product => product.id !== id))
  }

  function addProduct(item, quantity) {
    console.log('quantiy', quantity)
    console.log('item', item)
    // let newCart;

    setCartItems(cartItems => {
      let productWasAlreadyInCart = false
      const newCartItems = [...cartItems].map(product => {
        if (product.id === item.id) {
          productWasAlreadyInCart = true
          return { ...product, quantity: (product.quantity += quantity) }
        } else {
          return product
        }
      })

      if (!productWasAlreadyInCart) {
        newCartItems.push({ ...item, quantity })
      }

      return newCartItems
    })
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        clearCart,
        setCartItems,
        isInCart,
        removeProduct,
        addProduct
      }}
    >
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider
