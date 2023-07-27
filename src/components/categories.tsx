"use client"
import React, { useEffect, useState } from 'react'
import styles from "@/app/shop/page.module.css"
import axios from 'axios'

function Categories() {
    const [categories, setCategories] = useState([])
    const [selection, setSelection] = useState<number>()

    useEffect(() => {
        const getCategories = async () => {
        const {data} = await axios.get('https://fakestoreapi.com/products/categories')
        console.log(data)
        return data
    }
    getCategories().then(r => setCategories(r))
    },[])
    
    return (
        <div className={styles.categoriesLayout}>
            <div className={styles.categoriesContainer}>
                <div className={styles.categoriesTextTitle}>
                    Menu
                </div>
                <div>
                    {categories.map((d, index:number) => {
                        return(
                            <div className={styles.categoriesTextContainer} key={index}>
                                <button className={styles.categoriesText} onClick={() => setSelection(index)}>
                                    {d}
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Categories