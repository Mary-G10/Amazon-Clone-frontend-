import { Type } from "./Action.type";

export const initialState = {
  basket: [],
};
// Defines the initial state with an empty basket array that will hold cart items
export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET:
      // Searches the basket to see if the item already exists
      // Uses find() to return the first matching item or undefined if not found
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );
      // if there is no the same product elected,just write the as if the product is 1 otherwise update the basket by adding 1
      if (!existingItem) {
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
        // ... means Spreads existing state properties
      } else {
        const updatedBasket = state.basket.map((item) => {
          // item id is the same which is if you order the same product, bu using map,the item added in the basket
          return item?.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item;
        });
        return {
          ...state,
          basket: updatedBasket,
        };
      }

    case Type.REMOVE_FROM_BASKET:
      const index = state.basket.findIndex((item) => item.id === action.id);
      //       Returns the index position of the first item where item.id matches action.id Returns -1 if no matching item is found

      let newBasket = [...state.basket];

      if (index >= 0) {
        if (newBasket[index].amount > 1) {
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount - 1,
          };
//           If quantity is greater than 1: Just decrease the amount by 1
// Creates a new item object with all existing properties (...newBasket[index])
// Updates only the amount property with the decremented value
        } else {
          newBasket.splice(index, 1);
        }
      }
      // If quantity is 1 or less: Remove the entire item from basket
      return {
        ...state,
        basket: newBasket,
      };

    default:
      return state;
  }
};
// This reducer manages a shopping cart where items can be added (incrementing quantity if already present) or removed (decrementing quantity or removing entirely if quantity reaches 0).
