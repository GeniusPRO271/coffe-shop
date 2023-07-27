import { Product } from "./product";

interface CartItem {
    product: Product 
    quantity : number 
}

interface CartState {
    items : CartItem[]
    totalPrice : number
    rawPrice:number
    deliveryFee:number
    deliveryOption: number
    deliveryFreeAt: number

}

export default CartState;