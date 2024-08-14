export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: [...state.cart.filter((p) => p.id !== action.payload.id)],
      };
    case "QUANTITY_CART":
      return {
        ...state,
        cart: state.cart.map(
          (c) =>
            c.id === action.payload.id
              ? { ...c, qty: action.payload.qty } // Update the quantity of the matched item
              : c // Return the item unchanged if it doesn't match
        ),
      };
    default:
      return state;
  }
};
