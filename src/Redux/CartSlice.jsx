
import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
const Slice = createSlice({
  name: "cartSlice",
  initialState: {
    cards: [],
    currentUser: {},
    allCards:[],
    search : false, // for visibility
    wishlist: [],
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
    searchBoxIsVisible:(state, {payload})=>{
      state.search = payload;
    },


    toggleWishlit: (state, { payload }) => {
      if (state.currentUser === null) {
        message.info("You need to log in to continue.")
        return;
      }
      let data = state.wishlist.find(wish => wish.id === payload.id);
      if (data) {
        state.wishlist = state.wishlist.filter((item) => (payload.id != item.id));
        message.warning("Product removed from  wishelist")
      }
      else {
        state.wishlist.push(payload)
        message.success("Product added to  wishelist")
      }
    },
  }
});
export const { addToCart, removeFromCart, increQuantity, decreQuantity, currentUserInfo, removeAllFromCart,searchBoxIsVisible, toggleWishlit } = Slice.actions;
export default Slice.reducer;