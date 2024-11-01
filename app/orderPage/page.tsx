'use client'
import { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader"
import Footer from "../_components/Footer"
import Image from "next/image";

const Cart = () => {

    const cartStorageString = localStorage.getItem('cart');
    const cartStorageJson = cartStorageString ? JSON.parse(cartStorageString) : null;
    const [cartStorage, setCartStorage] = useState(cartStorageJson?cartStorageJson : [])

    return (<>

        <CustomerHeader />
        <div className="grid grid-rows-3 md:grid-rows-2 md:grid-cols-2 lg:grid-rows-2 lg:grid-cols-2">
            {/* <div><Image/></div> */}
            <div></div>
            <div></div>
        </div >
        <Footer />
    </>)
}
export default Cart