"use client"
import React, { useEffect, useRef, useState } from 'react'
import styles from "./page.module.css"
import PlusIcon from "@/assets/icons/PlusIcon2.svg"
import SearchIcon from "@/assets/icons/magnifying-glass-solid.svg"
import Xicon from "@/assets/icons/xmark-solid.svg"
import MinusIcon from "@/assets/icons/MinusIcon2.svg"
import HouseIcon from "@/assets/icons/House-icon.svg"
import ClockIcon from "@/assets/icons/clock-solid.svg"
import TrashCan from "@/assets/icons/TrashCan.svg"
import UtensilIcon from "@/assets/icons/Utensil.svg"
import PointingIcon from "@/assets/icons/angle-right-solid.svg"
import Arrow from "@/assets/icons/ArrowPointingLeft.svg"
import CheckIcon from "@/assets/icons/check-solid.svg"
import Logo from "@/assets/Logo.svg"
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store/store'
import { addItem, clearCart, removeItem, selectCartProductId, selectCartProducts } from '@/redux/features/cart/cartSlice'
import { Product } from '@/types/product'
import { useRouter } from 'next/navigation';
import {motion} from "framer-motion"
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import PopOut from '@/components/popUp'
import AutoComplete from '@/components/autoComplete'
import { addAddress, changeActiveAddress, selectActiveAddress, selectAddreses } from '@/redux/features/user/userSlice'
import {CollectionOfYMapsAddresses, YmapsAddressClass} from "@/types/ymaps";
function Checkout() {
    const dispatch = useDispatch()
    const [deliveryOpt, setDeliveryOpt] = useState<number>(0)

    const addreses = useSelector((state: RootState) => selectAddreses(state))
    const activeAdress = useSelector((state: RootState) => selectActiveAddress(state))

    const [addresIsOpen, SetAddresIsOpen] = useState<boolean>(false)
    const [timeIsOpen, SetTimeIsOpen] = useState<boolean>(false)
    const [newAddressOpen, SetNewAddressOpen] = useState<boolean>(false)
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
        closeAllPopUps()
        };

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
                                        {addreses.length > 0 ?
                                            <button id="addresButton" className={styles.checkOutLeftColumnAddressButton} onClick={() => {SetAddresIsOpen(addresIsOpen => !addresIsOpen); SetPopUpIsOpen(popUpIsOpen => !popUpIsOpen)}}>
                                                    <Image src={HouseIcon} alt='HouseIcon' width={18} height={18} style={{marginRight: "6px"}}/>
                                                        {activeAdress}
                                                    <motion.div
                                                    className={styles.checkOutLeftColumnAddressButtonArrow}
                                                    animate={addresIsOpen ? {rotate: 180} : {rotate: 0}}
                                                    transition={{duration: 0.2}}

                                                    >
                                                        <Image src={PointingIcon} alt='PointingIcon' width={16} height={16} style={{transform: "rotate(90deg)"}}/>
                                                    </motion.div>
                                            </button>
                                            :
                                            (
                                            
                                                    <button id="addresButton" className={styles.checkOutLeftColumnAddressButton}
                                                            onClick={() => {
                                                                SetAddresIsOpen(addresIsOpen => !addresIsOpen);
                                                                SetPopUpIsOpen(popUpIsOpen => !popUpIsOpen)
                                                            }}>

                                                        <Image src={PlusIcon} alt='PlusIcon' width={18} height={18} style={{marginRight: "6px"}}/>
                                                        Añadir direccion 
                                                        <motion.div 
                                                            className={styles.checkOutLeftColumnAddressButtonArrow} 
                                                            animate={addresIsOpen ? {rotate: 180} : {rotate: 0}}
                                                            transition={{duration: 0.2}}
                                                            
                                                        >
                                                            <Image src={PointingIcon} alt='PointingIcon' width={16} height={16} style={{transform: "rotate(90deg)"}}/>
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
                                        <button id="timeButton" className={styles.checkOutLeftColumnTimeDeliveryOptions} onClick={() => {SetTimeIsOpen(timeIsOpen => !timeIsOpen); SetPopUpIsOpen(popUpIsOpen => !popUpIsOpen)}}>
                                            <Image src={ClockIcon} alt='ClockIcon' width={18} height={18} style={{marginRight: "6px"}}/>
                                            Delivery 30-40 min
                                            <motion.div 
                                                className={styles.checkOutLeftColumnAddressButtonArrow} 
                                                animate={timeIsOpen ? {rotate: 180} : {rotate: 0}}
                                                transition={{duration: 0.2}}
                                                >
                                                <Image src={PointingIcon} alt='PlusIcon' width={16} height={16} style={{transform: "rotate(90deg)"}}/>
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
                        <button className={styles.checkOutLeftColumnAddressButtonPopUpAddresNew} id="newAddressButton" onClick={() => {SetNewAddressOpen(true); SetAddresIsOpen(false)}} style={addreses && addreses.length > 0 ? {}  : {borderRadius: "24px"}}>
                            Agregar nueva direccion
                            <Image src={PlusIcon} alt='PlusIcon' width={18} height={18} style={{marginLeft: "12px"}}/>
                        </button>
                        {addreses && addreses.length > 0 && addreses.map((iteam: string, index: number) => {
                            return(
                                <button className={styles.checkOutLeftColumnAddressButtonPopUpAddresNew} style={ (addreses.length - 1) ===  index ? {borderRadius: "0px", borderBottomLeftRadius: "24px", borderBottomRightRadius: "24px"} : {borderRadius: "0px"} } onClick={() => {dispatch(changeActiveAddress(iteam))}}>
                                    {iteam}
                                    {iteam === activeAdress && <Image src={CheckIcon} alt='CheckIcon' width={18} height={18} style={{marginLeft: "12px"}}/>}
                                </button>
                            )
                        })
                        }
                    </PopOut>}
                {timeIsOpen  && 
                    <PopOut id='timeButton' style={{marginTop: "4px", minWidth: "200px", marginLeft:"-14px"}}>
                        <button className={styles.checkOutLeftColumnAddressButtonPopUpAddresNew}>
                            Escojer un tiempo
                        </button>
                    </PopOut>}
                {newAddressOpen  &&
                <div className={styles.checkOutAddNewAddress}>
                    <PopOut id='newAddressButton' freePosition={true} style={{backgroundColor:"#F5F4F2", width:"960px", height:"608px"}}>
                        <NewAdressComponent SetNewAddressOpen={SetNewAddressOpen}/>
                    </PopOut>
                </div>
                    }
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

function NewAdressComponent({SetNewAddressOpen } :  {SetNewAddressOpen: React.Dispatch<React.SetStateAction<boolean>>}){


    const [newAddressInput, setNewAddressInput] = useState<string>("")
    const [addressClicked, setAddressClicked] = useState<YmapsAddressClass>(new YmapsAddressClass())
    const [address, setAddress] = useState<YmapsAddressClass[]>([])

    const [cords, setCords] = useState<number[]>([84.947649, 56.484645])
    const dispatch = useDispatch()

    const [popUp, setPopUp] = useState<boolean>(false)


    useEffect(() => {
        const getCollection = new CollectionOfYMapsAddresses()
        getCollection.getCollectionBasedOnString(newAddressInput).then( result => {
                if(typeof result != "undefined") {
                    console.log("assigning collection", result)
                    setAddress(result)
                } else{
                    console.log("response at useEffect undefined")
                }
            }
        )
      }, [newAddressInput]);

    return(
        <div className={styles.NewAdressComponentContainer}>
            <div style={{position:"absolute", display:"flex", flex:1, width:"95%", flexDirection:"row-reverse"}}>
                <Image src={Xicon} alt='Xicon' width={24} height={24} onClick={() => SetNewAddressOpen(false)} style={{cursor: "pointer"}}/>
            </div>
            <div className={styles.NewAdressComponentSearchContainer}>
                <div className={styles.NewAdressComponentSearchTextsContainer}>
                    <div className={styles.NewAdressComponentSearchTitle}>
                        Ingresa tu direccion para el delivery
                    </div>
                    <div className={styles.NewAdressComponentSearchSubTitle}>
                        O como vamos a saver donde eviar tu pedido?
                    </div>
                </div>
                <div className={styles.NewAdressComponentSearchBarContainer}>
                    <div className={styles.NewAdressComponentSearchBar}>
                        <Image src={SearchIcon} alt='SearchIcon' width={24} height={48}/>
                        <AutoComplete
                            id={"autoComplete1"}
                            className={styles.NewAdressComponentSearchBarInput}
                            placeholder='Ingresa la direccion a la cual quieres que enviemos tu pedido'
                            valueInput={newAddressInput}
                            onChange={(event) => {setNewAddressInput(event.target.value); setPopUp(true)}}

                            collection={address}
                            setCollection={setAddress}

                            changeValue={setNewAddressInput}
                            changeCords={setCords}

                            setAddressClicked={setAddressClicked}
                            popUp={popUp}
                            setPopUp={setPopUp}
                            />
                        <Image src={Xicon} alt='Xicon' width={24} height={24} onClick={() => {setNewAddressInput(""); setAddressClicked(new YmapsAddressClass())}} style={{cursor: "pointer"}}/>

                    </div>
                    {addressClicked.cords.length > 1 && addressClicked.formatted === newAddressInput && addressClicked.house != undefined
                    ? <button onClick={() => {dispatch(addAddress(`${addressClicked.street != undefined && addressClicked.street != "" ? addressClicked.street + "," : ""} ${addressClicked.house != undefined && addressClicked.house != "" ? addressClicked.house : ""}`)); SetNewAddressOpen(false)}} className={styles.NewAdressComponentSearchBarButton} >
                        OK
                    </button>
                        :
                    <button className={styles.NewAdressComponentSearchBarButton} style={{backgroundColor: "rgba(92, 90, 87, 0.10)", color: "#9E9B98", cursor: "default"}}>
                        OK
                    </button>}

                </div>

            </div>
            <div className={styles.NewAdressComponentMapsContainer}>
                <MapsCompnent Cords={cords} setCords={setCords} setNewAddressInput={setNewAddressInput} setAddressClicked={setAddressClicked}/>
            </div>
        </div>
    )
}


function MapsCompnent({Cords, setCords, setNewAddressInput, setAddressClicked}:{Cords:number[], setCords: React.Dispatch<React.SetStateAction<any[]>>, setNewAddressInput: React.Dispatch<React.SetStateAction<string>>, setAddressClicked: React.Dispatch<React.SetStateAction<YmapsAddressClass>>}) {

    const defaultState = {
        center: Cords,
        zoom: 17,
    };
    const ymaps = useRef<any>(null)
    const placeMarkRef = useRef<any>()
    const mapRef = useRef<any>()

    return (
      <YMaps
      query={
        {   lang: "en_RU",
            load:"geocode",
        }
      }
      >
        <Map
            defaultState={defaultState}
            state={{center: Cords.reverse(), zoom: 17}}
            style={{width:"100%",height:"100%", borderRadius:"16px"}}
            instanceRef={mapRef}
            onLoad={(e) => {
                ymaps.current = e;
              }}
              onClick={(event:any) => {
                  const coords = event.get("coords");
                  setCords(() => coords);
                  new YmapsAddressClass().createYMapsAddressUsingCords(coords).then((res) => {
                      if(typeof res != "undefined"){
                          setAddressClicked(res)
                          setNewAddressInput(res.formatted)
                      }
                  })
              }}


        >
          <Placemark
          instanceRef={placeMarkRef}
          options={{
            draggable: true
          }}

          onDragEnd={() => {
              const coords = placeMarkRef.current.geometry._coordinates;
              setCords(() => coords)
              new YmapsAddressClass().createYMapsAddressUsingCords(coords).then((res) => {
                  if(typeof res != "undefined"){
                      setAddressClicked(res)
                      setNewAddressInput(res.formatted)
                  }
              })
          }}
          geometry={Cords}/>
        </Map>
      </YMaps>
    );
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