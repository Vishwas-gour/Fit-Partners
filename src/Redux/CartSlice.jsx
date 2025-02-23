
import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
const Slice = createSlice({
  name: "cartSlice",
  initialState: {
    cards: [],
    currentUser: {},
    allCards:[],
    search : ""
  },
  reducers: {
    addToCart: (state, { payload }) => {
      if (state.currentUser === null) {
        message.info("You need to log in to continue.")
        return;
      }
      let data = state.cards.find(card => card.id === payload.id);
      if (data) {
        message.info("Product is already in cart")
      }
      else {
        state.cards.push(payload)

      }
    },
    removeFromCart: (state, { payload }) => {
      state.cards = state.cards.filter((item) => (payload != item.id));
    },
    removeAllFromCart: (state) => {
      state.cards.length = 0;
    },
    increQuantity: (state, { payload }) => {
      if (state.cards[payload].quantity == 5) message.warning("This seller has only 5 of these available.")
      else state.cards[payload].quantity += 1;
    },
    decreQuantity: (state, { payload }) => {
      if (state.cards[payload].quantity == 1) {
          message.warning("only one item left");
      }
      else state.cards[payload].quantity -= 1;
    },
    currentUserInfo: (state, { payload }) => {
      state.currentUser = payload;
    },
    addInSearchBar:(state, {payload})=>{
      state.search = payload;
      console.log(payload)
    }
  }
});
export const { addToCart, removeFromCart, increQuantity, decreQuantity, currentUserInfo, removeAllFromCart,addInSearchBar } = Slice.actions;
export default Slice.reducer;