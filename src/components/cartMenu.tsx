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
import { useRouter } from 'next/navigation'

function CartEmpy(){
    return(
        <div className={styles.cartEmptyContent}>
                <Image src={CartIcon} alt='CartIcon' width={150} height={133} style={{marginBottom: "24px"}}/>
                <div className={styles.cartEmpyText}>
                    Tu carro esta vacio
                </div>
            
        </div>
    )
}

function CartNotEmpy(){
    const cartItems = useSelector((state:RootState) => selectCartProducts(state))
    const dispatch = useDispatch()

    return(
    <div className={styles.cartNotEmpyRoot}>
        <div className={styles.cartNotEmpyContainer}>
            <div className={styles.cartNotEmptyDeliverySelectionRoot}>
                <div className={styles.cartNotEmptyDeliverySelectionContainer}>
                    <div className={styles.cartNotEmptyDeliverySelection}>
                    <div className={styles.cartNotEmptyToggle} style={cartItems.deliveryOption == 1 ? {transform:"translateX(140px)"} : {transform:"translateX(0px)"}}></div>
                        <div className={styles.cartNotEmptyDeliveryOption} onClick={() => dispatch(changeDelivery(0))}>
                            <span className={styles.cartNotEmptyDeliveryOptionText}>
                                Delivery
                            </span>
                        </div>
                        <div className={styles.cartNotEmptyDeliveryOption} onClick={() => dispatch(changeDelivery(1))}>
                        <span className={styles.cartNotEmptyDeliveryOptionText}>
                                Para llevar
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {cartItems && cartItems.items.map((d) => {
                    return ( 
                        <div className={styles.cartNotEmptyIteamRow}>
                            <div className={styles.cartNotEmptyImageContainer}>
                                <div className={styles.cartNotEmptyImageCover}>
                                    <Image src={d.product.image}  alt='product Image' width={69} height={69} unoptimized={true} style={{borderRadius: "18px"}} />
                                </div>
    
                            </div>
                            <div className={styles.cartNotEmptyInfo}>
                                <div className={styles.cartNotEmptyInfoTitle}>
                                    {d.product.title} 
                                </div>
                                
                                <div className={styles.cartNotEmptyInfoPriceRow}>
                                    <span className={styles.cartNotEmptyInfoPriceText}>${Math.max(Number((d.product.price * d.quantity).toFixed(2)))} </span>
                                </div>
                                
                            </div>
                            <div className={styles.cartNotEmptyCartButtonRoot}>
                                <div className={styles.cartNotEmptyCartContainer}>
                                
                                    <button className={styles.cartNotEmptyButton} onClick={() => dispatch(removeItem(d.product))}>
                                        <Image src={MinusIcon} alt='PlusIcon' width={12} height={14}/></button>
                                    <span className={styles.cartNotEmptyButtonQuantity}>{d.quantity}</span>
                                    <button className={styles.cartNotEmptyButton} onClick={() => dispatch(addItem(d.product))}>
                                        <Image src={PlusIcon} alt='PlusIcon' width={12} height={14}/></button>

                                </div>
                            </div>
                        </div>
                    )
            })}
        </div>
    </div>
    )
}

export function CartContent(){
    const dispatch = useDispatch()
    const cartItems = useSelector((state:RootState) => selectCartProducts(state))
    const rotuer = useRouter()
    
    return(
        <>
        <div className={styles.cartTitle}>
            <h2 className={styles.cartTitleText}>
                Tu Carro
            </h2>
            {cartItems.items.length > 0
            && <span className={styles.cartClearButton} onClick={() => dispatch(clearCart())}>
                Vaciar
            </span>}
            
        </div>
        
        {cartItems.items.length > 0 ? 
        (<>
        <CartNotEmpy/> 
        <div className={styles.cartFooterRoot}>
            { cartItems.deliveryOption == 1 ?
                <div className={styles.cartFooterFeeContainer}>
                        
                    <Image src={CarryOut} alt='CarryOut' width={48} height={48} className={styles.cartFooterFeeImage}/>
                    <div className={styles.cartFooterFeeContainerText}>
                        <div className={styles.cartFooterFeeContainerTextTime}>
                            Para llevar · 5 min. Ver Detalles
                        </div>
                        
                        <div className={styles.cartFooterFeeContainerTextAddress}>
                            Providencia, Miguel Claro 2109
                        </div>
                    </div>
                </div>
                : 
                <div className={styles.cartFooterFeeContainer}>
                        
                    <Image src={DeliveryIcon} alt='DeliveryIcon' width={48} height={48} className={styles.cartFooterFeeImage}/>
                    <div className={styles.cartFooterFeeContainerText}>
                        <div className={styles.cartFooterFeeContainerTextTime}>
                            Precio ${cartItems.deliveryFee}
                        </div>
                        
                        <div className={styles.cartFooterFeeContainerTextFree}>
                            Para alcanzar delivery gratis  ${Math.max(Number((300 - cartItems.rawPrice).toFixed(0)),0)}
                        </div>
                    </div>
                </div>
                }
                
                <button className={styles.cartCheckOutButton} onClick={() => rotuer.push("/checkout")}>
                    <span>
                        <span className={styles.cartCheckOutButtonText}>Si, ir a finalizar compra</span>
                        <span className={styles.cartCheckOutButtonPrice}>${cartItems.totalPrice}</span>
                    </span>
                </button>
        </div></>)
        : 
        <CartEmpy/>}
    </>
    )
}

function Cart() {
    const cartItems = useSelector((state:RootState) => selectCartProducts(state))
    const noFee = cartItems.totalPrice - 3000

    return (
    <div className={styles.cartRoot}>
        <div className={styles.cartContainer}>
            <CartContent/>
        </div>
    </div>
    )
}

export default Cart