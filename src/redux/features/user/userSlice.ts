import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {Product} from "@/types/product"
import { User } from "@/types/user";

const initialState: User = {
    name : "",
    lastName : "",
    phone : "",
    address : ""
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        changeUser(state, action: PayloadAction<Product>){

        },
        changeName(state, action: PayloadAction<Product>){

        },
        changeLastName(state, action: PayloadAction<Product>){
            
        },
        changeAddress(state, action: PayloadAction<Product>){

        },
        changePhone(state, action: PayloadAction<Product>){

        },
        logOut(state, action: PayloadAction<Product>){

        }
    }
})

export const { changeUser, changeName, changeLastName, changeAddress,changePhone,logOut } = userSlice.actions

export default userSlice.reducer