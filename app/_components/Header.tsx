'use client'
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export const Header = () => {
    const router = useRouter();
    const [details, setDetails] = useState();
    // const [isLoggedIn, setisLoggedIn] = useState(false);
    const pathname = usePathname()

    useEffect(() => {
        const localStorageData = localStorage.getItem("restaurantDetails")
        console.log(localStorageData);

        if (!localStorageData ) {
            router.push('/register')
        } else if (localStorageData && pathname === '/register') {
            router.push("/dashboard")
        } else {
            setDetails(JSON.parse(localStorageData))
        }

    }, [router ,pathname])

    const handleLogout = () =>{
        localStorage.removeItem("restaurantDetails")
        router.push("/register");
    }

    // useAuth(isLoggedIn);
    return (<div className="flex  justify-between p-3">
        <div >
            <Image src="/logo.png" width={60} height={60} alt="restaurant logo" className="h-auto w-auto" />
        </div>
        <div >
            <ul className="flex items-center ">
                <li className="px-5">
                    <Link className="text-2xl " href="/">Home</Link>
                </li>
                {
                    details ?
                        <>
                            <li className="px-5">
                                <button onClick={() => handleLogout()} className="text-2xl">Logout</button>
                            </li>
                            <Link className="text-2xl " href="/">Profile</Link>
                        </>
                        :

                        <Link className="text-2xl " href="/register">Login/Signup</Link>
                }



            </ul>
        </div>
    </div>)
}

export default Header