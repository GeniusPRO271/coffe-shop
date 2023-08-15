import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion'; // Make sure to import motion from the appropriate package
import styles from "@/app/checkout/page.module.css"

interface PopOutProps {
  id: string;
  children: React.ReactNode; // Use React.ReactNode type for children
  style?: React.CSSProperties
  oppositeCorner?: boolean

}

function PopOut({ id, children, style = {}, oppositeCorner = false }: PopOutProps) {
  const popUpId = "popUpLayOut"
  const [width, setWidth] = useState<number>(0);
  const [buttonWidth, setButtonWidth] = useState<number>(0)
  const [popUpWidth , setPopUpWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0);
  const popUpRef = useRef(null);

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const updateDimensions = () => {
      const buttonElement = document.getElementById(id);
      const popUpElement = document.getElementById(popUpId)
      if (buttonElement && popUpElement) {
        const button = buttonElement.getBoundingClientRect();
        const popUP = popUpElement.getBoundingClientRect()
        setHeight(button.top);
        setWidth(button.left);
        setButtonWidth(button.width)
        setPopUpWidth(popUP.width)
      }
    };

    // Initial update
    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    window.addEventListener('resize', updateDimensions);
    // Attach event listener for window resize
    if (popUpRef.current) {
      resizeObserver.observe(popUpRef.current);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
 // Include id in the dependency array to re-run effect when id changes

  return (
    <div style={{ position: 'fixed', top: height + 33, left: oppositeCorner ? width+(buttonWidth-popUpWidth) : width,}} onClick={stopPropagation}>
      <motion.div
        transition={{ duration: 0.2 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className={styles.checkOutLeftColumnAddressButtonPopUpContainer}
      >
        <div ref={popUpRef} id="popUpLayOut" className={styles.checkOutLeftColumnAddressButtonPopUpLayOut} style={style}>
            {children}
        </div>
      </motion.div>
    </div>
  );
}

export default PopOut;
