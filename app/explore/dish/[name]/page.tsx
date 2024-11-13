'use client'

import { useEffect, useState } from "react";
import { Props } from "../../[name]/page";
import Image from "next/image";
import CustomerHeader from "@/app/_components/CustomerHeader";
import { useRouter } from "next/navigation";
import Footer from "@/app/_components/Footer";


const Page = (props: Props) => {
    // const name = props.params?.name;
    const [dishName, setDishName] = useState('');
    const [dishPrice, setDishPrice] = useState<number>(0);
    const [dishImgPath, setDishImgPath] = useState('');
    const [dishDescription, setDishDesciption] = useState('');
    const tax = 18
    const deliveryCharge = 49
    let [quantity, setQuantity] = useState(1)
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [showOrderPopup, setShowOrderPopup] = useState(false);

    useEffect(() => {
        loadDishDetails();
    }, [])


    const loadDishDetails = async () => {
        try {
            const id = props.searchParams?.id
            const response = await fetch(`http://localhost:3000/api/restaurant/dish/edit/${id}`)
            const data = await response.json();
            if (data.success) {
                console.log(data.result);
                setDishName(data?.result.dishName)
                setDishPrice(data?.result.dishPrice)
                setDishImgPath(data?.result.dishImgPath)
                setDishDesciption(data?.result.dishDescription)
                // console.log(id,name);
            }
        } catch (err) {
            console.log("Error : ", err);
        }

        // console.log(dish);  
    }
    const router = useRouter();
    const handleOrderNow = () => {
        const user = localStorage ? localStorage.getItem('user') : null;
        const parsedUser = user ? JSON.parse(user) : null;

        if (parsedUser) {
            // alert('your order has been placed')
            setShowOrderPopup(true);
            // router.push('/')
        }
        else
            // setShowLoginPopup(true);
            setShowLoginPopup(true);
        //  router.push('/user-auth?order=true')
    }
    const handleOkClick = (flag: boolean) => {

        if (flag === true) {
            setShowOrderPopup(false)
            router.push('#')
        } else {

            // setShowLoginPopup(false);
            setShowLoginPopup(false);
            router.push('/user-auth?order=true')
        }
    }
    const style = 'w-[250px] h-[250px] md:w-[500px] md:h-[500px] lg:w-[800px] lg:h-[800px] '
    const GrandTotal = (Math.ceil(dishPrice + ((tax / 100) * dishPrice)) * quantity)+ deliveryCharge;

    return (<>
        <CustomerHeader />
        <div className="text-xl grid grid-cols-2 grid-rows-2 w-[300px] md:w-[800px] lg:w-screen overflow-hidden">
            <div className={`${style} grid place-items-center`}>
                <Image className="w-[70%] h-auto object-contain rounded-lg" src={dishImgPath} alt={`image of ${dishName}`} width={500} height={500} />
            </div>

            <div className={`${style} flex flex-col justify-center capitalize ml-16 leading-relaxed`}>
                <h3 className="text-2xl">Order details</h3>
                <div className="border-b-4 border-slate-500 w-[300px] rounded my-3"></div>
                <h1>{dishName}</h1>
                {/* <h2>Price : {dishPrice}</h2> */}
                <div className="w-[60%]">
                    <p className="text-justify">Description : {dishDescription}</p>

                    <div>
                        <div>Quantity : {quantity} 
                            <button className="text-2xl p-1" onClick={()=>{if(quantity<=4)setQuantity(++quantity)}}>+</button>
                            <button className="text-2xl p-1" onClick={()=>{if(quantity>1)setQuantity(--quantity)}}>-</button>
                            </div>
                        <p>Price : {dishPrice}</p>
                        <p>Delivery charge : {deliveryCharge}rs</p>
                        <p>G.S.T : {tax}%</p>
                        <div className="border-b-4 border-slate-500 w-[300px] rounded my-3"></div>
                        <p>Grand Total : {GrandTotal}</p>
                    </div>
                    <button className="border rounded-lg p-2 mt-4 hover:bg-slate-700 active:bg-slate-900" onClick={handleOrderNow}>Order now</button>
                </div>
            </div>
        </div>


        <div>
            {
                showOrderPopup && (<div className="popup ">
                    <div className="popup-content">
                        <p>Your order has been placed</p>
                        <p> Name : {dishName}</p>
                        <p>Total Amount  : {GrandTotal}</p>
                        <p>{dishName}</p>
                        <button onClick={() => handleOkClick(true)}>OK</button>
                    </div>
                </div>)
            }
        </div>
        <div>
            {
                showLoginPopup && (<div className="popup ">
                    <div className="popup-content">
                        <p>Login/Signup to place your order</p>
                        <button onClick={() => handleOkClick(false)}>OK</button>
                    </div>
                </div>)
            }
        </div>

        <Footer />
    </>)
}
export default Page

