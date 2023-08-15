"use client"

import React from 'react'
import Logo from "@/assets/Logo.svg"
import Image from 'next/image'

function LoadingScreen() {
    return (
            <div
            style={{height: "100vh", backgroundColor: "#1BBABB", display:"flex", justifyContent:"center", alignItems:"center"}}>
                <Image src={Logo} alt='Logo' width={250} height={250}/>
            </div>
    )
}

export default LoadingScreen