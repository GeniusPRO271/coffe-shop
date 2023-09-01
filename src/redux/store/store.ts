import { configureStore, createReducer } from "@reduxjs/toolkit";
import counterReducer from "@/redux/features/cart/cartSlice"
import usersReducer from "@/redux/features/user/userSlice"

export const store = configureStore(({
    reducer: {
        cart: counterReducer,
        user: usersReducer,
      },
}))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
