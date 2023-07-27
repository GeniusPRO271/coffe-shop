import React from 'react'
import styles from "./page.module.css"
import Logo from "../../assets/Logo.svg"
import Separator from "../../assets/separatorAuth.svg"
import AuthBackground from "../../assets/authBackground.svg"
import Image from 'next/image'
import Link from 'next/link'

function Register() {
    return (
        <div className={styles.registerContainer}>
          <div className={styles.leftSide}>
              <Image src={AuthBackground} alt='AuthBackground' style={{position:"absolute", width: "100%", height:"100%", zIndex: -1}}/>
              <form className={styles.registerForm} style={{height: "670px"}}>
                <div className={styles.registerText}>
                    REGISTRATE
                </div>
                <div className={styles.inputContainer}>
                  <input className={styles.inputStyle} type="text" placeholder='Nombre 💁‍♂️ 💁‍♀️' />
                </div>
                <div className={styles.inputContainer}>
                  <input className={styles.inputStyle} type="text" placeholder='Phone ☎️'/>
                </div>
                <div className={styles.inputContainer}>
                  <input className={styles.inputStyle} type="email" placeholder='Email 📫' />
                </div>
                <div className={styles.inputContainer}>
                  <input className={styles.inputStyle} type="password" placeholder='Contraseña 🔒' />
                </div>
                <div className={styles.inputContainer}>
                  <input className={styles.inputStyle} type="password" placeholder='Repite la Contraseña 🔗' />
                </div>
                <div className={styles.buttonsContainer}>
                  <button className={styles.buttonStyle}>
                    Registrame
    
                  </button>
                  <Link href="/login" className={styles.forgotStyle}>
                    Ya tienes una cuenta?
                  </Link>
                </div>
                
                
              </form>
          </div>
          <div className={styles.rightSideContainer}>
    
                <Link href="/"> <Image src={Logo} width={280} height={148} alt='Logo' style={{paddingTop: "116px"}}/> </Link>
                <Image src={Separator} width={200} height={100} alt='Separator' style={{paddingTop: "71px"}}/>
                <div className={styles.textContainer}>
                  <div className={styles.titleLogin}> 

                    ¡<span style={{color: "#00FDFF"}}>BIENVENIDO</span> A BORDO!
                  </div>
                  <div className={styles.subTitleLogin}>
                            Registrate y Descubre 
                            un mundo de sabores!
                  </div>
                </div>
                <Image src={Separator} width={200} height={100} alt='Separator' style={{paddingBottom: "71px"}}/> 
            
    
          </div>
        </div>
      )
}

export default Register