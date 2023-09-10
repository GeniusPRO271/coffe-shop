import React from 'react'
import PopOut from './popUp'
import { motion } from 'framer-motion'; 
import styles from "@/app/checkout/page.module.css"
import { YmapsAddress } from '@/types/ymaps';

interface autoCompleteProps{
    id: string
    placeholder: string
    valueInput: string 
    onChange: React.ChangeEventHandler<HTMLInputElement>
    className: string | undefined

    collection : YmapsAddress[],
    setCollection : React.Dispatch<React.SetStateAction<YmapsAddress[]>>

    changeValue: React.Dispatch<React.SetStateAction<string>>
    changeCords: React.Dispatch<React.SetStateAction<any[]>>

    popUp : boolean
    setPopUp:  React.Dispatch<React.SetStateAction<boolean>>

    setAddressClicked:React.Dispatch<React.SetStateAction<YmapsAddress>>
}

function AutoComplete({id, placeholder, valueInput, collection, onChange, className, changeValue, setCollection, changeCords, popUp, setPopUp, setAddressClicked}: autoCompleteProps) {
  
  return (
    <>  
        <input id={id} className={className} placeholder={placeholder} value={valueInput} onChange={onChange} autoComplete='off'/>
        {valueInput.length > 0 && popUp && collection && collection.length > 0 &&
            <PopOut id={id} style={{backgroundColor:"#F5F4F2", marginTop:"15px", width:"632px", maxHeight:"336px" ,borderTopLeftRadius:"0px", borderTopRightRadius:"0px", overflow:"scroll"}}>
                {collection.map((address:YmapsAddress, index:number) => {
                    return(
                        <motion.div 
                        key={index}
                        transition={{ duration: 0.1 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className={styles.autoCompleteCollectionIteam}
                        onClick={() => 
                        {
                            changeCords(() => address.cords)
                            changeValue(address.formatted)
                            setAddressClicked(address)
                            setPopUp(false)
                            setCollection([])

                        }
                        }
                        
                        >
                            <span  className={styles.autoCompleteCollectionIteamText}>{address.formatted}</span>
                         </motion.div>
                    )
                })}
                
            </PopOut>
        }
        
    </>
  )
}

export default AutoComplete