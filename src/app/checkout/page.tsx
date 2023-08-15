"use client"
import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import PlusIcon from "@/assets/icons/PlusIcon2.svg"
import MinusIcon from "@/assets/icons/MinusIcon2.svg"
import HouseIcon from "@/assets/icons/House-icon.svg"
import ClockIcon from "@/assets/icons/clock-solid.svg"
import TrashCan from "@/assets/icons/TrashCan.svg"
import UtensilIcon from "@/assets/icons/Utensil.svg"
import PointingIcon from "@/assets/icons/angle-right-solid.svg"
import Arrow from "@/assets/icons/ArrowPointingLeft.svg"
import Logo from "@/assets/Logo.svg"
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store/store'
import { addItem, clearCart, removeItem, selectCartProduct, selectCartProductId, selectCartProducts } from '@/redux/features/cart/cartSlice'
import { Product } from '@/types/product'
import { useRouter } from 'next/navigation';
import {motion} from "framer-motion"
import PopOut from '@/components/popUp'
function Checkout() {
    const router = useRouter();
    const dispatch = useDispatch()
    const [deliveryOpt, setDeliveryOpt] = useState<number>(0)
    const [addres, setAddres] = useState<string>("    ") // temorary bc we still need to do redux for client / user
    const [addresIsOpen, SetAddresIsOpen] = useState<boolean>(false)
    const [timeIsOpen, SetTimeIsOpen] = useState<boolean>(false)
    const [popUpIsOpen, SetPopUpIsOpen] = useState<boolean>(false)
    const cartItems = useSelector((state:RootState) => selectCartProducts(state))
    const Utensilio:Product  = {
        id : 0,
        title: "Utensilio" ,
        price : 0,
        image : UtensilIcon
    }
    const closeAllPopUps = () => {
        SetAddresIsOpen(false)
        SetTimeIsOpen(false)
        SetPopUpIsOpen(false)
    }
    const newAction = async (action: () => void) => {
        closeAllPopUps()
        await new Promise(resolve => setTimeout(resolve, 0));
        action()
    }
    
    const handleScroll = () => {
        // Your scroll handling logic here
        closeAllPopUps()
        };

    useEffect(() => {

    },[cartItems.items])
    useEffect(() =>{
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    },[])

    return (
        <>
            <NavBar/>
            <div className={styles.checkOutContainer} onClick={() => !popUpIsOpen ? {} : closeAllPopUps() }>
                <div className={styles.checkOutLayout}>
                    <div className={styles.checkOutLeftColumnContainer}>
                        <span className={styles.checkOutLeftColumnTitle}>CHECKOUT</span>
                        <div className={styles.checkOutLeftColumnTermsContainer} >
                            <div className={styles.checkOutLeftColumnTermsLayout}>
                                <span className={styles.checkOutLeftColumnTermsTitle}>Terminos del delivery</span>
                                <div className={styles.checkOutLeftColumnTermsOptions}>
                                    <div className={styles.checkOutLeftColumnTermsDeliveryOptions}>
                                        <button className={styles.checkOutLeftColumnTermsDeliveryOptionsContainer} style={deliveryOpt == 0 ? {backgroundColor: "#1BBABB"} : {}} onClick={() => newAction(() => setDeliveryOpt(0))}>
                                            Delivery <br/>
                                            <span style={deliveryOpt == 0 ? {color: "#EDFDFD"} : {}} className={styles.checkOutLeftColumnTermsDeliveryOptionsContainerPrice}>$69</span>
                                        </button>
                                        <button className={styles.checkOutLeftColumnTermsDeliveryOptionsContainer} style={deliveryOpt == 1 ? {backgroundColor: "#1BBABB"} : {}} onClick={() => newAction(() => setDeliveryOpt(1))}>
                                            Delivery para alguien mas <br/>
                                            <span style={deliveryOpt == 1 ? {color: "#EDFDFD"} : {}} className={styles.checkOutLeftColumnTermsDeliveryOptionsContainerPrice}>$69</span>
                                        </button>
                                    </div> 
                                    <div className={styles.checkOutLeftColumnAddressContainer}>
                                        {addres.trim().length > 0 ? 
                                            <button className={styles.checkOutLeftColumnAddressButton} onClick={() => {SetAddresIsOpen(addresIsOpen => !addresIsOpen),SetPopUpIsOpen(popUpIsOpen => !popUpIsOpen)}}>
                                                <Image src={HouseIcon} alt='PlusIcon' width={24} height={24} style={{marginRight: "6px"}}/>
                                                {addres}
                                                <Image src={PointingIcon} alt='PlusIcon' width={12} height={12} style={{marginLeft: "6px"}}/>
                                            </button> 
                                            :
                                            (
                                            
                                                    <button id="addresButton" className={styles.checkOutLeftColumnAddressButton} onClick={() => {SetAddresIsOpen(addresIsOpen => !addresIsOpen),SetPopUpIsOpen(popUpIsOpen => !popUpIsOpen)}}>
                                                        <Image src={PlusIcon} alt='PlusIcon' width={18} height={18} style={{marginRight: "6px"}}/>
                                                        Añadir direccion 
                                                        <motion.div 
                                                            className={styles.checkOutLeftColumnAddressButtonArrow} 
                                                            animate={addresIsOpen ? {rotate: 270} : {rotate: 90}} 
                                                            transition={{duration: 0.2}}
                                                            
                                                        >
                                                            <Image src={PointingIcon} alt='PlusIcon' width={16} height={16}/>
                                                        </motion.div>
                                                    </button>
                                            
                                            
                                            )
                                        }
                                    </div> 
                                    <div className={styles.checkOutLeftColumnInfoFormContainer}>
                                        <form className={styles.checkOutLeftColumnInfoForm}>
                                            <div className={styles.checkOutLeftColumnInfoFormTop}>
                                                <input className={styles.checkOutLeftColumnInfoFormIteam} type="text" placeholder='Apt' id='Apt/Officina'/>
                                                <input className={styles.checkOutLeftColumnInfoFormIteam} type="text" placeholder='N°Puerta' id='Puerta'/>
                                                <input className={styles.checkOutLeftColumnInfoFormIteam} type="text" placeholder='Entrada' id='Entrada'/>
                                                <input className={styles.checkOutLeftColumnInfoFormIteam} type="text" placeholder='Piso' id='Piso'/>
                                            </div>
                                            <div className={styles.checkOutLeftColumnInfoFormBottom}>
                                                <input className={styles.checkOutLeftColumnInfoFormIteam} type="text" placeholder='Otras Instrucciones' id='Apt/Officina'/>
                                            </div>
                                        </form>
                                    </div>
                                    <span className={styles.checkOutLeftColumnTermsTitle}>Terminos del delivery</span>
                                    <div className={styles.checkOutLeftColumnTimeDeliveryOptionsContainer}>
                                        <button id="timeButton" className={styles.checkOutLeftColumnTimeDeliveryOptions} onClick={() => {SetTimeIsOpen(timeIsOpen => !timeIsOpen),SetPopUpIsOpen(popUpIsOpen => !popUpIsOpen)}}>
                                            <Image src={ClockIcon} alt='ClockIcon' width={18} height={18} style={{marginRight: "6px"}}/>
                                            Delivery 30-40 min
                                            <motion.div 
                                                className={styles.checkOutLeftColumnAddressButtonArrow} 
                                                animate={timeIsOpen ? {rotate: 270} : {rotate: 90}} 
                                                transition={{duration: 0.2}}>
                                                <Image src={PointingIcon} alt='PlusIcon' width={16} height={16}/>
                                            </motion.div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.checkOutLeftColumnCart}>
                            <div className={styles.checkOutLeftColumnCartContainer}>
                                <div className={styles.checkOutLeftColumnCartTitle}>
                                    <span className={styles.checkOutLeftColumnCartTitleText}>Tu Pedido</span>
                                    <button className={styles.checkOutLeftColumnCartTitleEmptyCartButton} onClick={() => dispatch(clearCart())}>
                                        <Image src={TrashCan} alt='TrashCan' width={12} height={12} style={{marginRight: "6px"}}/>
                                        Vaciar Carro
                                    </button>
                                </div>
                                <div className={styles.checkOutLeftColumnCartProductsContainer}>
                                        {!useSelector((state:RootState) => selectCartProductId(state,Utensilio.id)) && <div className={styles.checkOutLeftColumnCartProductsAddUtensil}>
                                            <button className={styles.checkOutLeftColumnCartProductsAddUtensilButton} onClick={() => dispatch(addItem(Utensilio))}>
                                                <Image src={UtensilIcon} alt='UtensilIcon' width={20} height={20} style={{marginRight: "10px"}}/>
                                                Añadir Utensilo
                                            </button>
                                        </div>}
                                        {cartItems.items.length > 0 && cartItems.items.map((d) => {return(
                                            <ProductIteam width={d.product.id == 0 ? 20 : 80} height={d.product.id == 0 ? 20 : 80} src={d.product.image} title={d.product.title} amount={d.quantity} price={d.product.price} d={d.product}/>
                                        )} )}
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className={styles.checkOutRightColumnContainer}>
                        RIGHT
                    </div>
                    
                </div>
                {addresIsOpen  && 
                    <PopOut id='addresButton' style={{marginTop: "4px",marginLeft:"-14px"}}>
                        <button className={styles.checkOutLeftColumnAddressButtonPopUpAddresNew}>
                            Agregar nueva direccion
                            <Image src={PlusIcon} alt='PlusIcon' width={18} height={18} style={{marginLeft: "12px"}}/>
                        </button>
                        {addres && addres.trim().length > 0 && <button className={styles.checkOutLeftColumnAddressButtonPopUpAddresNew}>
                            Agregar nueva direccion
                            <Image src={PlusIcon} alt='PlusIcon' width={18} height={18} style={{marginLeft: "12px"}}/>
                        </button>}
                    </PopOut>}
                {timeIsOpen  && 
                    <PopOut id='timeButton' style={{marginTop: "4px", minWidth: "200px", marginLeft:"-14px"}}>
                        <button className={styles.checkOutLeftColumnAddressButtonPopUpAddresNew}>
                            Escojer un tiempo
                        </button>
                    </PopOut>}
            </div>
        </>
        
    )
}




function ProductIteam({width,height,src,title,amount,price, d}:{width:number, height:number, src:any,title:string, amount:number, price:number, d:Product}){
    const dispatch = useDispatch()
    return(
        <div className={styles.checkOutLeftColumnCartProductsIteamContainer}>
            <div className={styles.checkOutLeftColumnCartProductsIteamImageContainer}>
                <Image src={src} alt='ProductImage' width={width} height={height} style={{marginRight: "20px"}} unoptimized={true}/>
                {title}
            </div>
            <div className={styles.checkOutLeftColumnCartProductsIteamAddMoreContainer}>
                <div className={styles.checkOutLeftColumnCartProductsIteamAddMoreLayout}>
                    <button className={styles.checkOutLeftColumnCartProductsIteamAddMoreMinus} onClick={() => dispatch(removeItem(d))}>
                        <Image src={MinusIcon} alt='MinusIcon' width={12} height={12}/>
                    </button>
                    <button className={styles.checkOutLeftColumnCartProductsIteamAddNumber}>
                        {amount}
                    </button>
                    <button className={styles.checkOutLeftColumnCartProductsIteamAddMorePlus} onClick={() => dispatch(addItem(d))}>
                        <Image src={PlusIcon} alt='PlusIcon' width={12} height={12}/>
                    </button>
                </div>                  
            </div>
            <div className={styles.checkOutLeftColumnCartProductsIteamPrice}>
                ${price * amount}                      
            </div>
        </div>
    )
}

function NavBar(){
    const router = useRouter();
    return(
        <div className={styles.navBarContainer}>
            <div className={styles.navBarLayout}>
                <div className={styles.navBarBackButtonContainer}>
                    <button className={styles.navBarBackButton} onClick={() => router.push("/shop")}>
                        <Image src={Arrow} alt='Arrow' width={16} height={18} style={{marginRight:"6px"}}/>
                        Volver
                    </button>
                </div>
                <div className={styles.navBarLogoContainer}>
                    <div className={styles.navBarLogoLayout}>
                        <Image src={Logo} alt='Logo' width={100} height={52}/>
                    </div>
                </div>
            </div>
        </div>
    )
    
}
export default Checkout