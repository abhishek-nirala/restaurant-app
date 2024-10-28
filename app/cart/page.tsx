'use client'
import { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader"
import Footer from "../_components/Footer"
import Image from "next/image";

const Cart = () => {

    const cartStorageString = localStorage.getItem('cart');
    const cartStorageJson = cartStorageString ? JSON.parse(cartStorageString) : null;
    const [cartStorage, setCartStorage] = useState(cartStorageJson)

    return (<>

        <CustomerHeader />
        <div>
            <div className="main-div text-center">
            </div>

            <div>
                {
                    cartStorage.length > 0 ? cartStorage.map((items, key) => (
                        <div key={key} className="flex h-60 border  items-center">
                            <div className="grid place-items-center h-[80%] w-[30%]">
                                <li><Image src={items.dishImgPath} width={100} height={70} alt="dish item image" className="w-[220px] h-[150px] object-cover " /></li>
                            </div>
                            <div>
                                <ul className="custom-list text-xl leading-loose font-semibold list-none capitalize ">
                                    <li> {items.dishName} </li>
                                    <li>Price : Rs {items.dishPrice} </li>
                                    <li> {items.dishDescription} </li>
                                </ul>
                                {

                                    <button className="border p-2 rounded-lg bg-orange-600" onClick={() => removeFromCart(items._id)}>Remove from Cart</button>

                                }
                            </div>
                        </div>
                    ))
                        : <h1 className="capitalize">No Dishes For this restaurant</h1>
                }
            </div>
        </div >
        <Footer />
    </>)
}
export default Cart