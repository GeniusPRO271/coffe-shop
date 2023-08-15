"use client"

import NavBar from '@/components/navBar'
import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import ProductCard from '@/components/productCard'
import Categories from '@/components/categories'
import axios from 'axios'
import { Product } from '@/types/product'
import Image from 'next/image'
import BannerImage from "@/assets/bannerimage.png"
import Cart from '@/components/cartMenu'
import { useDispatch } from 'react-redux'
import { deleteItem } from '@/redux/features/cart/cartSlice'


function Shop() {
  const [products, setProducts] = useState<Product[]>([])
  const dispatch = useDispatch()
      // TEST WHILE BACKEND UPDATE
  useEffect(() => {

    const getProducts = async (): Promise<Product[]> => {
      const {data} = await axios.get<Product[]>('https://fakestoreapi.com/products')
      console.log(data)
      return data
    }
    dispatch(deleteItem(0))
    getProducts().then(r => setProducts(r))
    
  },[])
    // TEST WHILE BACKEND UPDATE

  return (
    <div className={styles.shopRoot}>
      <NavBar/>
      <div className={styles.shopContainer}>
        <div className={styles.shopLayoutContent}>
          <div className={styles.shopPlaceLayout}>
            <aside className={styles.categoriesMenuAside}>
                <Categories/>
            </aside>
            <main className={styles.productsContainer}>
              <div className={styles.productHeader}>
                <div className={styles.bannerContainer}>
                    <Image src={BannerImage} alt='BannerImage1' className={styles.bannerImage}/>
                </div>
              </div>
              <div className={styles.productRoot}>
                <div className={styles.productGrid}>
                  {products.map((data:Product , index:number) => (
                      <ProductCard product={data} key={index}/>
                    ))}
                </div>
              </div>
              
            
              
            </main>
            <aside className={styles.cartMenuAside}>
                  <Cart/>
            </aside>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default Shop