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
            <div className={styles.categoriesMenuSticky}>
                <h2 className={styles.categoriesTextTitle}>
                    Menu
                </h2>
                <ul>
                    {categories.map((d, index:number) => {
                        return(
                            <li className={styles.categoriesTextContainer} key={index}>
                                    {d}
                            </li>
                        )
                    })}
                </ul>
            </div>
    )
}

export default Categories