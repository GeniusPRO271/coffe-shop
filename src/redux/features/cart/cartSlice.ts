import { RootState } from "@/redux/store/store";
import CartState from "@/types/cart";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {Product} from "@/types/product"
const initialState: CartState = {
    items: [],
    totalPrice: 0,
    rawPrice: 0,
    deliveryFee: 3000,
    deliveryOption: 1,
    deliveryFreeAt: 300
}

export const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<Product>){
            const existingItem = state.items.find((item) => item.product.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ product: action.payload, quantity: 1 });
            } 
            state.rawPrice = Number((state.rawPrice + action.payload.price).toFixed(2))

            if(Math.max(Number((state.deliveryFreeAt - state.rawPrice).toFixed(0)),0) === 0){
                state.deliveryFee = 0
            }

            if (state.deliveryOption === 0 && state.rawPrice > 0) {
                state.totalPrice = Math.max(Number((state.rawPrice + state.deliveryFee).toFixed(2)), 0);
            } else if (state.deliveryOption === 1){
                state.totalPrice = Number((state.rawPrice).toFixed(2));
            }

            state.items.sort((a, b) => a.product.id - b.product.id);
            console.log("addItem", existingItem?.product.price)
        },
        removeItem(state, action: PayloadAction<Product>) {
            const existingItem = state.items.find((item) => item.product.id === action.payload.id);
            if (existingItem) {
                if (existingItem.quantity === 1){
                    state.items = state.items.filter((item) => item.product.id !== action.payload.id);
                } else {
                    existingItem.quantity -= 1
                }

                state.rawPrice = Number((state.rawPrice - existingItem.product.price).toFixed(2))

                if(Math.max(Number((state.deliveryFreeAt - state.rawPrice).toFixed(0)),0) !== 0){
                    state.deliveryFee = 3000
                }

                if (state.deliveryOption === 0 && state.rawPrice > 0) {
                    state.totalPrice = Math.max(Number((state.rawPrice + state.deliveryFee).toFixed(2)), 0);
                } else if (state.deliveryOption === 1){
                    state.totalPrice = Math.max(Number((state.rawPrice).toFixed(2)), 0);
                }
            }
            if (state.items.length <= 0){
                state.items = []
                state.totalPrice = 0
            }
        },
        changeDelivery(state, action: PayloadAction<number>) {
            if (state.deliveryOption === 0 && state.rawPrice > 0) {
                state.totalPrice = Math.max(Number((state.totalPrice - state.deliveryFee).toFixed(2)), 0);
            }

            state.deliveryOption = action.payload;

            if (action.payload === 0) {
                state.totalPrice = Number((state.rawPrice + state.deliveryFee).toFixed(2));
            }
        },
        changeFee(state, action: PayloadAction<number>) {
            if (state.deliveryOption === 0 && state.rawPrice > 0) {
                state.totalPrice = Math.max(Number((state.totalPrice - state.deliveryFee).toFixed(2)), 0);
            }

            state.deliveryFee = action.payload;

            if (action.payload === 0) {
                state.totalPrice = Number((state.rawPrice + state.deliveryFee).toFixed(2));
            }
        },
        deleteItem(state, action: PayloadAction<number>) {
            const  productId  = action.payload;
            const existingItem = state.items.find((item) => item.product.id === productId);
            if (existingItem) {
                state.items = state.items.filter((item) => item.product.id !== productId);

                state.rawPrice = Number((state.rawPrice - existingItem.product.price).toFixed(2))

                if(Math.max(Number((state.deliveryFreeAt - state.rawPrice).toFixed(0)),0) !== 0){
                    state.deliveryFee = 3000
                }

                if (state.deliveryOption === 0 && state.rawPrice > 0) {
                    state.totalPrice = Math.max(Number((state.rawPrice + state.deliveryFee).toFixed(2)), 0);
                } else if (state.deliveryOption === 1){
                    state.totalPrice = Math.max(Number((state.rawPrice).toFixed(2)), 0);
                }
            }
            
        },
        clearCart(state){
            state.items = []
            state.totalPrice = 0
        },
    }

})

export const { addItem, removeItem, deleteItem, clearCart,changeDelivery,changeFee } = cartSlice.actions

export const selectCartProducts = (state : RootState) => state.cart
export const selectCartProduct = (state : RootState, product:Product) => state.cart.items.find((item) => item.product.id === product.id);
export const selectCartProductId = (state : RootState, id:number) => state.cart.items.find((item) => item.product.id === id);
export const selectTotalPrice = (state: RootState) => state.cart.items
export default cartSlice.reducer