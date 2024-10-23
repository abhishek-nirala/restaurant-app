import Image from "next/image";
import Link from 'next/link'
const CustomerHeader  = ()=>{

    return(<div className="flex  justify-between items-center p-3">
        <div >
            <Image src="/logo.png" width={60} height={60} alt="restaurant logo" className="h-auto w-auto" />
        </div>
        <div >
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
                    <Link className="text-2xl " href="/">Cart(0)</Link>
                </li>
               



            </ul>
        </div>
    </div>)
}

export default CustomerHeader;