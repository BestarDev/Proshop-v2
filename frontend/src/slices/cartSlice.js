import { createSlice } from "@reduxjs/toolkit";
import { updateState } from "../utils/cartUtils";

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {cartItems: []}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x._id === item._id)
            if(existItem){
                // ********************** Important ***********************|
                // Be aware of Array.map() function. It must return new arr|
                // ********************************************************|
                state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x);
            } else {
                state.cartItems = [...state.cartItems, item]
            }

            return updateState(state);
        }
    }
})

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;