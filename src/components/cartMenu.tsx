import React, { useState } from 'react'
import styles from "@/app/shop/page.module.css"
import Image from 'next/image'
import CartIcon from "@/assets/icons/CartIcon.svg"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store/store'
import { addItem, changeDelivery, clearCart, removeItem, selectCartProducts } from '@/redux/features/cart/cartSlice'
import PlusIcon from "@/assets/icons/PlusIcon2.svg"
import MinusIcon from "@/assets/icons/MinusIcon2.svg"
import CartNotEmptySeparator from "@/assets/icons/cartNotEmpySeparator.svg"
import CarryOut from "@/assets/icons/CarryoutIcon.svg"
import DeliveryIcon from "@/assets/icons/DeliveryIcon.svg"
function CartEmpy(){
    return(
        <div className={styles.cartEmptyContent}>
            <div className={styles.cartEmpty}>
                <div className={styles.cartEmptyIcon}>
                    <Image src={CartIcon} alt='CartIcon' width={150} height={133}/>
                </div>
                <div className={styles.cartEmpyText}>
                    Tu carro esta vacio
                </div>
            </div>
        </div>
    )
}

function CartNotEmpy(){
    const cartItems = useSelector((state:RootState) => selectCartProducts(state))
    const dispatch = useDispatch()

    return(
    <div className={styles.cartNotEmpyContainer}>
        <div className={styles.cartNotEmptyDeliverySelection}>
            
            <button className={styles.cartNotEmptyDeliveryOption1} onClick={() => dispatch(changeDelivery(0))}>
                Delivery
            </button>
            <div className={styles.cartNotEmptyToggle} style={cartItems.deliveryOption == 1 ? {transform:"translateX(70px)"} : {transform:"translateX(-70px)"}}></div>
            <button className={styles.cartNotEmptyDeliveryOption2} onClick={() => dispatch(changeDelivery(1))}>
                Para Llevar
            </button>
        </div>
        <div className={styles.cartNotEmptyIteams}>
            {cartItems && cartItems.items.map((d) => {
                return ( 
                    <div className={styles.cartNotEmptyIteam}>
                        <Image src={d.product.image}  alt='product Image' width={69} height={69} unoptimized={true} className={styles.cartNotEmptyImage}/>
                        <div className={styles.cartNotEmptyText}>
                            {d.product.title} 
                            <br/>
                            ${d.product.price * d.quantity} 
                        </div>
                        <div className={styles.cartNotEmptyCartLayout}>
                            <div className={styles.cartNotEmptyCartContainer}>
                            
                                <button className={styles.cartNotEmptyButton} onClick={() => dispatch(removeItem(d.product))}>
                                    <Image src={MinusIcon} alt='PlusIcon' width={12} height={14}/></button>
                                <button className={styles.cartNotEmptyButton}>{d.quantity}</button>
                                <button className={styles.cartNotEmptyButton} onClick={() => dispatch(addItem(d.product))}>
                                    <Image src={PlusIcon} alt='PlusIcon' width={12} height={14}/></button>

                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
        <Image src={CartNotEmptySeparator}  alt='product Image' width={296} height={2}/>
    </div>
    )
}

function Cart() {
    const cartItems = useSelector((state:RootState) => selectCartProducts(state))
    const dispatch = useDispatch()
    const noFee = cartItems.totalPrice - 3000

    return (
    <div className={styles.cartContainer}>
        <div className={styles.CartTop}>
            <div className={styles.cartTitle}>
                Tu Carro
            </div>
            {cartItems.items.length > 0
            && <div className={styles.cartClearButton} onClick={() => dispatch(clearCart())}>
                Clear
            </div>}
            
        </div>
        
        {cartItems.items.length > 0 ? 
        (<>
        <CartNotEmpy/> 
        <div className={styles.cartBottom}>
            { cartItems.deliveryOption == 1 ?
                <div className={styles.cartOptionFeeContainer}>
                        
                    <Image src={CarryOut} alt='CarryOut' width={48} height={48}/>
                    <div className={styles.cartFeeCarryOutContainer}>
                        <span style={{color: "#000", fontSize:"14px"}}>
                            Para llevar · 5 min. Ver Detalles
                        </span>
                        <br/>
                        <span style={{color: "#A5A5A5", fontSize:"12px"}}>
                            Providencia, Miguel Claro 2109
                        </span>
                    </div>
                </div>
                : 
                <div className={styles.cartOptionFeeContainer}>
                        
                    <Image src={DeliveryIcon} alt='DeliveryIcon' width={48} height={48}/>
                    <div className={styles.cartFeeCarryOutContainer}>
                        <span style={{color: "#000", fontSize:"14px"}}>
                            Precio ${cartItems.deliveryFee}
                        </span>
                        <br/>
                        <span style={{color: "#5AC31A", fontSize:"12px"}}>
                            Para alcanzar delivery gratis  ${Math.max(Number((300 - cartItems.rawPrice).toFixed(0)),0)}
                        </span>
                    </div>
                </div>
                }
                
                <div className={styles.cartCheckOutContainer}>
                    <button className={styles.cartCheckOutButton}>
                        <div style={{width:"100%"}}>
                            <span style={{width:"222px"}}>Si, ir a finalizar compra</span>
                            <span style={{paddingLeft:"52px", fontSize: "16px"}}>${cartItems.totalPrice}</span>
                        </div>
                    </button>
                </div>
        </div></>)
        : 
        <CartEmpy/>}
    </div>
    )
}

export default Cart