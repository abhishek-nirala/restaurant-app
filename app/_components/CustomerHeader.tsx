'use client'

import Image from "next/image";
import Link from 'next/link'
import { useEffect, useState } from "react";
import { IUser } from "../api/user/route";
// import { UserData } from "./UserSignUP";
import { useRouter } from "next/navigation";

interface CartData {
    items: Array<{
        id: number;
        name: string;
        price: number;
        quantity: number;
    }>;
    _id: number;
}

export const handleRenderSignupPage = () => {
    return true;
}
const CustomerHeader: React.FC<{ cartData?: CartData, removeCartItem?: string }> = ({ cartData, removeCartItem }) => {

    const [cartNumber, setCartNumber] = useState<number>(); //no. of cartItems.
    const [cartItem, setCartItem] = useState<CartData[]>()  //all the cart items are stored in it.
    const [user, setUser] = useState<IUser>()
    const router = useRouter();
    // const isActive = (route: string) => router.pathname === route;
    useEffect(() => {
        const cartStorage = localStorage.getItem('cart')
        const cartStorageDetails = cartStorage ? JSON.parse(cartStorage) : null;
        setCartNumber(cartStorageDetails?.length)
        setCartItem(cartStorageDetails)

        const userStorage: IUser = localStorage ? JSON.parse(localStorage.getItem('user')!) : null
        setUser(userStorage);

        if (cartData) {
            // console.log('cartdata  : ', cartData);

            if (cartNumber) {
                const localCartItem = cartItem;
                localCartItem.push(JSON.parse(JSON.stringify(cartData)))//shalow copy and deep copy
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

    // console.log(user);


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


    const logOut = () => {
        localStorage.removeItem('user')
        router.push('/user-auth')
    }


    return (<div className="flex  justify-between items-center p-3">
        <div >
            <Image src="/logo.png" width={60} height={60} alt="restaurant logo" className="h-auto w-auto" />
        </div>
        <div>
            <ul className="flex items-center ">


                {
                    user ?
                        <>
                            <li className="px-5">
                                <Link className="text-2xl active:text-orange-400 " href="/">{user?.name?.split(" ")[0] || 'profile'}</Link>
                            </li>
                            <li className="px-5">
                                <button className="text-2xl active:text-orange-400 " onClick={logOut}>LogOut</button>
                            </li>

                        </>
                        :
                        <>
                            <li className="px-5">
                                <Link className="text-2xl active:text-orange-400 " href="/user-auth">Login</Link>
                            </li>
                        </>
                }
                <li className="px-5">
                    <Link className={`text-2xl`} href="/">Home</Link>
                </li>
                <li className="px-5">
                    <Link className="text-2xl active:text-orange-400 " href="/dishes">Dishes</Link>
                </li>

                <li className="px-5">
                    <Link className="text-2xl active:text-orange-400 " href={cartNumber ? "/cart" : "#"}>Cart({cartNumber ? cartNumber : 0})</Link>
                </li>

                <li className="px-5">
                    <Link className="text-2xl active:text-orange-400 " href="/">Add Restaurant</Link>
                </li>





            </ul>
        </div>
    </div>)

}

export default CustomerHeader;