"use client"

import NavBar from '@/components/navBar'
import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import ProductCard from '@/components/productCard'
import Categories from '@/components/categories'
import axios from 'axios'
import { Product } from '@/types/product'
import Image from 'next/image'
import BannerImage1 from "@/assets/BannerMenu1.svg"
import BannerImage2 from "@/assets/BannerImage2.svg"
import Cart from '@/components/cartMenu'


function Shop() {
  const [products, setProducts] = useState<Product[]>([])

      // TEST WHILE BACKEND UPDATE
  useEffect(() => {

    const getProducts = async (): Promise<Product[]> => {
      const {data} = await axios.get<Product[]>('https://fakestoreapi.com/products')
      return data
    }
    getProducts().then(r => setProducts(r))
    
  },[])
    // TEST WHILE BACKEND UPDATE

  return (
    <>
      <NavBar/>
      <div className={styles.shopContainer}>
        <div className={styles.categoriesContainer}>
          <Categories/>
        </div>
        <main className={styles.productsContainer}>
          <div className={styles.bannersContainer}>
            <div className={styles.bannerContainer}>
                <Image src={BannerImage1} alt='BannerImage1' width={580} height={213}/>
            </div>
            <div className={styles.bannerContainer}>
                <Image src={BannerImage2} alt='BannerImage1' width={580} height={213}/>
            </div>
          </div>
          <div className={styles.productGrid}>
            {products.map((data:Product , index:number) => (
                <ProductCard product={data} key={index}/>
              ))}
          </div>
        
          
        </main>
        <div className={styles.cartLayout}>
              <Cart/>
        </div>
      </div>
    </>
    
  )
}

export default Shop