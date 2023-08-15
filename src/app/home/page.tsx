"use client"

import Image from 'next/image'
import styles from "./page.module.css"
import bannerImageMain from "@/assets/bannerImageMain.png"
import textBanner from "@/assets/textBanner.svg"
import MenuImage from "@/assets/Menu.svg"
import NavBar from '@/components/navBar'
import DeliveryIcon from "@/assets/icons/DeliveryIcon2.svg"
import SpearatorButton from "@/assets/SpearatorButton.svg"
import CarryourIcon from "@/assets/icons/CarryOutIcon2.svg"
import SpearatorButton1 from "@/assets/SpearatorButton1.svg"


export default function Home() {
  return (
    <>
    <NavBar/>
    <main className={styles.main}>
      <div className={styles.contentContainer}>
        <div className={styles.rightSideContainer}>
                <Image src={bannerImageMain} width={1070} height={363} alt="bannerImageMain"/> 
                <div className={styles.textBannerContainer}>
                  <div className={styles.textTitle}>
                    ¡PIDE <span style={{color: "#1EE3E4"}}>FILOMENA</span> <br/> CAFÉ!
                    <Image src={textBanner} alt='textBanner' width= {667} height={151} style={{paddingLeft:"50px", position: "absolute"}}/>
                  </div>
                  <div className={styles.textDescription}>
                    Sumérgete en una experiencia inigualable de sabor y aroma en nuestra tienda de café. Descubre una cuidadosa selección de granos de café de origen único
                  </div>
                  <div className={styles.buttonsContainer}>
                    <button className={styles.deliveryButton}> 
                      <span style={{width:"70%"}}>Delivery</span>
                      <Image src={SpearatorButton} alt='SpearatorButton' width={2} height={98} style={{paddingRight:"20px"}}/>
                      <Image src={DeliveryIcon} alt='DeliveryIcon' width={49} height={49} />
                    </button>
                    <button className={styles.takeButton}> 
                      <span style={{width:"70%"}}>Para retirar</span>
                      <Image src={SpearatorButton1} alt='SpearatorButton' width={2} height={98} style={{paddingRight:"20px"}}/>
                      <Image src={CarryourIcon} alt='DeliveryIcon' width={49} height={49} />
                      </button>
                  </div>
                </div>
        </div>
        <div className={styles.leftSideContainer}>
            <div className={styles.menuContainer}>
              
              <div className={styles.textMenu}>
                ¡Descubre un mundo de sabores!.
                En nuestro menú de café y deleites culinarios.
              </div>
              
              <div className={styles.menuBottomRow}>
                <div className={styles.textMore}>
                  Nuestro Menu
                </div>
                <Image src={MenuImage} alt='MenuImage' width= {343} height={144} className={styles.MenuImage}/>
              </div>
            </div>
        </div>
      </div>
    </main>
    </>

  )
}
