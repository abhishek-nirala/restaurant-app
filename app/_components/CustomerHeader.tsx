'use client'

import Image from "next/image";
import Link from 'next/link'
import { useEffect, useState } from "react";

interface CartData {
    items: Array<{
        id: number;
        name: string;
        price: number;
        quantity: number;
    }>;
}
const CustomerHeader: React.FC<{ cartData: CartData, removeCartItem: string }> = ({ cartData, removeCartItem }) => {

    const cartStorage = localStorage.getItem('cart')
    const cartStorageDetails = cartStorage ? JSON.parse(cartStorage) : null;

    const [cartNumber, setCartNumber] = useState(cartStorageDetails?.length); //no of cartItems.
    const [cartItem, setCartItem] = useState<CartData[]>(cartStorageDetails)  //all the cart items are stored in it.

    useEffect(() => {
        if (cartData) {
            // console.log('cartdata  : ', cartData);

            if (cartNumber) {
                const localCartItem = cartItem;
                localCartItem.push(JSON.parse(JSON.stringify(cartData))); //shalow copy and deep copy
                setCartItem(localCartItem);
                setCartNumber(cartNumber + 1)
                localStorage.setItem('cart', JSON.stringify(localCartItem))
            } else {
                setCartNumber(1)
                setCartItem([cartData])
                localStorage.setItem('cart', JSON.stringify([cartData]))
            }

        }
    }, [cartData])

    useEffect(() => {
        if (removeCartItem) {

            const remainedItem = cartItem.filter((itm) => {
                return itm._id != removeCartItem
            })

            setCartItem(remainedItem);
            setCartNumber(cartNumber - 1)
            localStorage.setItem('cart', JSON.stringify(remainedItem))
            if (localStorage.length == 0) {
                localStorage.removeItem('cart')
            }
        }
    }, [removeCartItem])

    return (<div className="flex  justify-between items-center p-3">
        <div >
            <Image src="/logo.png" width={60} height={60} alt="restaurant logo" className="h-auto w-auto" />
        </div>
        <div>
            <ul className="flex items-center ">
                <li className="px-5">
                    <Link className="text-2xl " href="/">Home</Link>
                </li>
                <li className="px-5">
                    <Link className="text-2xl " href="/">Add Restaurant</Link>
                </li>
                <li className="px-5">
                    <Link className="text-2xl " href="/">Login</Link>
                </li>
                <li className="px-5">
                    <Link className="text-2xl " href="/">SignUP</Link>
                </li>
                <li className="px-5">
                    <Link className="text-2xl " href={cartNumber?"/cart":"#"}>Cart({cartNumber ? cartNumber : 0})</Link>
                </li>




            </ul>
        </div>
    </div>)

}

export default CustomerHeader;