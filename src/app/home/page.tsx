import Image from 'next/image'
import styles from "./page.module.css"
import BannerImage from "@/assets/bannerimage.png"
import MenuImage from "@/assets/MenuImage.svg"
import NavBar from '@/components/navBar'
import DeliveryIcon from "@/assets/icons/DeliveryIcon2.svg"
import SpearatorButton from "@/assets/SpearatorButton.svg"
import CarryourIcon from "@/assets/icons/CarryOutIcon2.svg"
import SpearatorButton1 from "@/assets/SpearatorButton1.svg"
import Link from 'next/link'



export default function Home() {
  return (
    <div className={styles.homeRoot}>
      <NavBar/>
      <main className={styles.homePlaceRoot}>
        <div className={styles.homeLayoutContainer}>
          <div className={styles.homeLayout}>
            <div className={styles.homeMainContainer}>
              <div className={styles.leftSideContainer}>
                <div className={styles.bannerImageContainer}>
                  <div className={styles.bannerTextContainer}>
                    <span className={styles.bannerText}>
                      ¡DESCUBRE UN OASIS DEL CAFÉ:

                      ¡<span style={{color: "#1EE3E4"}}>VEN A VISITARNOS</span>!
                    </span>
                  </div>
                  <Image src={BannerImage} alt="BannerImage" className={styles.bannerImage}/>
                </div>
                <div className={styles.bannerSloganContainer}>
                  <div className={styles.bannerSloganLayout}>    
                    <span className={styles.bannerSloganText}>
                      ¡PIDE <span style={{color: "#1EE3E4"}}>FILOMENA</span> CAFÉ!
                    </span>
                  </div>
                </div>
                <div className={styles.bannerDescriptionContainer}>
                  <span className={styles.bannerDescriptionText}>
                      Sumérgete en una experiencia inigualable de sabor y aroma en nuestra tienda de café. Descubre una cuidadosa selección de granos de café de origen único 
                  </span>
                </div>
                <div className={styles.bannerButtonContainer}>
                  <div className={styles.bannerButtonLayout}>
                    <Link href={"/shop"} className={styles.buttonContainer} style={{backgroundColor: "rgba(30, 227, 228, 0.3)"}}>
                      <span className={styles.buttonText} style={{color: "#313638"}}>
                        Delivery
                      </span>
                      <div className={styles.buttonIconContainer}>
                        
                          <Image src={SpearatorButton} alt='SpearatorButton' width={2} height={98}/>
                        
                        <div className={styles.buttonIcon}>
                          <Image src={DeliveryIcon} alt='DeliveryIcon' width={50} height={50}/>
                        </div>
                        
                      </div>
                      
                    </Link>
                    <div className={styles.buttonContainer} style={{backgroundColor: "rgba(27, 186, 187, 1)"}}>
                      <span className={styles.buttonText} style={{color: "#F5F4F2"}}> 
                        Para retirar
                      </span>
                      <div className={styles.buttonIconContainer}>
                        
                          <Image src={SpearatorButton1} alt='SpearatorButton1' width={2} height={98}/>
                        
                        <div className={styles.buttonIcon}>
                          <Image src={CarryourIcon} alt='CarryourIcon' width={50} height={50}/>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.rightSideContainer}>
                  <div className={styles.rightSideLayout}>
                      <div className={styles.mapContainer}>
                        <iframe src="https://yandex.com/map-widget/v1/?um=constructor%3A39a16a8fa698b85df5646aa6d746ec9c1a6f79e3cfa891634ec20d7df77e9cfc&amp;source=constructor" width="100%" height="630"
                                frameBorder="0" style={{borderRadius:"15px"}}></iframe>
                      </div>
                      <div className={styles.menuBannerRoot}>
                        <div className={styles.manuBannerImageContainer}>
                          <Image className={styles.menuBannerImage} src={MenuImage} alt='MenuImage'/>
                        </div>
                        <div className={styles.manuBannerContainer}>
                          <span className={styles.menuBannerText}>¡Descubre un mundo de sabores!.
                          En nuestro menú de café y deleites culinarios.</span>
                        </div>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

  )
}
