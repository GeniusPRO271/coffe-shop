import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {Product} from "@/types/product"
import { User } from "@/types/user";
import { RootState } from "@/redux/store/store";
import {YmapsAddressClass} from "@/types/ymaps";

const initialState: User = {
    name : "",
    lastName : "",
    phone : "",
    address : [],
    activeAddress: new YmapsAddressClass
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
        addAddress(state, action: PayloadAction<YmapsAddressClass>){
            state.address.push(action.payload)
            state.activeAddress = action.payload
        },
        changeActiveAddress(state , action: PayloadAction<YmapsAddressClass>){
            state.activeAddress = action.payload
        },
        changePhone(state, action: PayloadAction<string>){
            state.phone = action.payload
        },
        logOut(state, action: PayloadAction<Product>){

        }
    }
})

export const { changeUser, changeName, changeLastName, addAddress, changeActiveAddress, changePhone,logOut } = userSlice.actions

export const selectAddreses = (state : RootState) => state.user.address
export const selectActiveAddress = (state : RootState) => state.user.activeAddress

export default userSlice.reducer