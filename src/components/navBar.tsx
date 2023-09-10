import React, { useState } from 'react'
import styles from "../app/home/page.module.css"
import Logo from "@/assets/Logo.svg"
import CartIcon from "@/assets/icons/BagIcon.svg"
import UserIcon from "@/assets/icons/user-solid.svg"
import Image from 'next/image'
import Link from 'next/link'
import {useSelector } from 'react-redux'
import { RootState } from '@/redux/store/store'
import { selectCartProducts } from '@/redux/features/cart/cartSlice'
import PopOut from './popUp'
import { CartContent } from './cartMenu'


function NavBar() {

    const cartItems = useSelector((state:RootState) => selectCartProducts(state))
    const [popUpShow, setPopUpShow] = useState<boolean>(false)

    return (
        <>
        <header className={styles.navBarLayout}>
            <div     
                className={styles.navBarContainer}>
                <div className={styles.navBarLeftSide}>
                    <Link href="/home" className={styles.navLogo}> <Image src={Logo} alt="Logo" width={100} height={53}/></Link>
                    <div className={styles.navLinks}>
                        <Link href="/shop" className={styles.navLink}> Pide Aqui </Link>
                        <Link href="/home" className={styles.navLink}> Nuestro Menu </Link>
                        <Link href="/home" className={styles.navLink}> Visitanos </Link>
                    </div>
                </div>
                <div className={styles.navBarRightSide}>  
                        <button className={styles.logInButton} id='userButton'>
                            <Image src={UserIcon} alt='UserIcon' height={20} width={20}/>
                        </button> 

                        <button className={styles.cartButtonStyle} id='cartButton' onClick={() => setPopUpShow(popUpShow => !popUpShow)}>
                            <Image src={CartIcon} alt='CartIcon' height={23} width={20} style={{marginRight: "6px"}}/>
                            <span style={{paddingRight:"15px"}}>${cartItems.totalPrice}</span>
                        </button>
                </div>
            </div>
        </header>
        {popUpShow &&
        <> 

                <div className={styles.popUpRoot} onClick={() => setPopUpShow(false)}>
                    <PopOut id='cartButton' style={{marginTop: "25px" , zIndex: 112}} oppositeCorner={true}>
                        <div className={styles.popUpCartRoot} onClick={() =>{ }}>
                            <div className={styles.popUpCartContainer}>
                                <CartContent/>
                            </div>
                        </div>
                    </PopOut>
                </div>
            
        </>}
        </>
    )
}

export default NavBar