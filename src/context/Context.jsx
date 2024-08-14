import React, { createContext, useContext, useReducer,useState } from "react";
import { faker } from "@faker-js/faker"
import { cartReducer } from "./cartReducer";
import { productReducer } from "./productReducer";
const Cart = createContext();
faker.seed(99)
export const Context = ({ children }) => {
  
  const products = Array.from({ length: 20 }).map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.url(),
    inStock: faker.helpers.arrayElement([0, 3, 5, 6, 7]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.helpers.arrayElement([0, 3, 5, 6, 7]),
  }));
   const [state, dispatch] = useReducer(cartReducer, {
     products,
     cart: [],
   })
   const [productState, productDispatch] = useReducer(productReducer, {
    byStock:false,
    byFastDelivery:false,
    byRating:0,
    searchQuery:""
   })


  return (
  <Cart.Provider value={{state,dispatch,productState,productDispatch}}>
  {children}   
  </Cart.Provider>
)
}

export const CartState = () => {
  return useContext(Cart)
}

