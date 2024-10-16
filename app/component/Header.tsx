'use client'
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";


export const Header = () => {
    const router = useRouter();
    const [details, setDetails] = useState('');
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const pathname = usePathname()
    useEffect(() => {
        const localStorageData = localStorage.getItem("restaurantDetails")

        // setisLoggedIn(localStorageData ? true : false);

        // if (isLoggedIn) {
        //     setDetails(JSON.parse(localStorageData))
        // } else {
        // }

        if (!localStorageData) {
            router.push("/register")
            alert("Please Login to visit Dashboard")
        }else if(localStorageData && pathname === "/register"){
            router.push('/dashboard')
        }
        else {
            setDetails(JSON.parse(localStorageData))
            setisLoggedIn(true);
        }

    })

    return (<div className="flex bg-slate-500 justify-between p-3">
        <div >
            <Image src="/logo.png" width={60} height={60} alt="restaurant logo" className="h-auto w-auto" />
        </div>
        <div >
            <ul className="flex items-center ">
                <li className="px-5">
                    <Link className="text-2xl " href="/">Home</Link>
                </li>

                <li className="px-5">
                    <Link className="text-2xl " href="/product">Product</Link>
                </li>

                <li className="px-5">
                    <Link className="text-2xl " href="/product">Profile</Link>
                </li>

                {
                    isLoggedIn ?
                        <li className="px-5">
                            <button className="text-2xl">Logout</button>
                        </li>
                        :
                        <li className="px-5">
                            <Link className="text-2xl " href="/register">Login</Link>
                        </li>
                }

            </ul>
        </div>
    </div>)
}

export default Header