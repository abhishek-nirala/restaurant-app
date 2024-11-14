'use client'
// import { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader"
import Footer from "../_components/Footer"
// import Image from "next/image";

const OrderPage = () => {

    const cartStorageString = localStorage.getItem('cart');
    const cartStorageJson = cartStorageString ? JSON.parse(cartStorageString) : null;
    const cartStorage = cartStorageJson?cartStorageJson : []
    console.log('at cartStorage',cartStorage)

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
export default OrderPage