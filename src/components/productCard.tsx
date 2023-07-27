import React from 'react'
import styles from "@/app/shop/page.module.css"
import PlusIcon from "@/assets/icons/plus-icon.svg"
import MinusIcon from "@/assets/icons/minus-solid 1.svg"
import Image from 'next/image'
import { Product } from '@/types/product'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, removeItem, selectCartProduct} from '@/redux/features/cart/cartSlice'
import { RootState } from '@/redux/store/store'

const AddButton = ({product}:{product:Product}) => {
    const dispatch = useDispatch()
    return(
        <button className={styles.productCardAddButton} onClick={() => dispatch(addItem(product))}>
                <Image src={PlusIcon} alt='PlusIcon' width={12} height={14} style={{paddingRight: "9px"}}/>
                Agregar
        </button>
    )
}
const AddButtonMoreThanOne = ({quantity,product}:{quantity:number,product:Product}) => {
    const dispatch = useDispatch()
    return(
        <div className={styles.productCardAddButton}>
            <button className={styles.productCardAddButton} onClick={() => dispatch(removeItem(product))}>
                <Image src={MinusIcon} alt='PlusIcon' width={12} height={14}/>
            </button>
            <button className={styles.productCardAddButton}> 
                {quantity}
            </button>
            <button className={styles.productCardAddButton} onClick={() => dispatch(addItem(product))}>
                <Image src={PlusIcon} alt='PlusIcon' width={12} height={14}/>
            </button>
        </div>
    )
}

function ProductCard( {product}:{product:Product}) {
    const cartItem = useSelector((state: RootState) => selectCartProduct(state, product))
    return (
    <div className={styles.productCardContinaer}>
        <div className={styles.productCardImageContainer}>
            <Image src={product.image} alt='image' width={199} height={168} className={styles.productImage} unoptimized={true}/>
        </div>
        <div className={styles.productCardText}>
            <span className={styles.productCardPriceTag}>${product.price}</span> <br/>
            <span className={styles.productCardName}>{product.title}</span>
        </div>
        <div className={styles.productCardButtonContainer}>
            {cartItem ? <AddButtonMoreThanOne quantity={cartItem.quantity} product={product}/> : <AddButton product={product}/>}
        </div>
    </div>
    )
}

export default ProductCard