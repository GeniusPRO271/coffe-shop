"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <AnimatePresence>
            <motion.div
            transition={{duration: 0.35}}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}