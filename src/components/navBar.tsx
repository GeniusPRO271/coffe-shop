import React from 'react'
import styles from "../app/page.module.css"
import Logo from "../assets/Logo.svg"
import NavBarSeparatior from "../assets/navBarSeparator.svg"
import CartIcon from "../assets/cartIcon.svg"
import LoginLine from "../assets/loginLine.svg"
import Image from 'next/image'
import Link from 'next/link'

function NavBar() {
    return (
        <nav className={styles.navBarLayout}>
            <div className={styles.navBarContainer}>
                <div className={styles.navBarLeftSide}>
                    <Link href="/"> <Image src={Logo} alt="Logo" width={100} height={53}/></Link>
                    <div className={styles.navLinks}>
                        <Link href="/shop" className={styles.navLink}> Pide Aqui </Link>
                        <Link href="/" className={styles.navLink}> Nuestro Menu </Link>
                        <Link href="/" className={styles.navLink}> Visitanos </Link>
                    </div>
                </div>
                <div className={styles.navBarRightSide}>
                <div className={styles.navLinks}>
                        <div className={styles.loginlinkStyle}>
                            <Link href="/login" className={styles.navLinkRight}> Login</Link>
                            <Image src={LoginLine} alt='LoginLine' height={9} width={41} style={{position: "absolute" }}/>
                        </div>
                        
                        <Image src={NavBarSeparatior} alt='NavBarSeparatior' height={30} width={3} style={{paddingLeft: "9px", paddingRight: "9px"}}/>
                        <div className={styles.cartStyle}>
                            <Link href="/cart" className={styles.navLinkRight}> Bolsa</Link>
                            <Image src={CartIcon} alt='CartIcon' height={17} width={22} style={{paddingLeft: "9px", paddingRight: "9px"}}/>
                        </div>
                        
                    </div>
                </div>
                
                <div>
                    
                </div>
            </div>
        </nav>
    )
}

export default NavBar