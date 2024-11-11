'use client'

import { useEffect, useState } from "react";
import { Props } from "../../[name]/page";
import Image from "next/image";
import CustomerHeader from "@/app/_components/CustomerHeader";


const Page = (props: Props) => {
    // const name = props.params?.name;
    const [dishName, setDishName] = useState('');
    const [dishPrice, setDishPrice] = useState('');
    const [dishImgPath, setDishImgPath] = useState('');
    const [dishDescription, setDishDesciption] = useState('');

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
    const style = 'w-[250px] h-[250px] md:w-[500px] md:h-[500px] lg:w-[800px] lg:h-[800px] '

    return (<>
        <CustomerHeader />
        <div className="text-xl grid grid-cols-2 grid-rows-2 w-[300px] md:w-[800px] lg:w-screen overflow-hidden">
            <div className={`${style} grid place-items-center`}>
                <Image className="w-[70%] h-auto object-contain rounded-lg" src={dishImgPath} alt={`image of ${dishName}`} width={500} height={500} />
            </div>

            <div className={`${style} flex flex-col justify-center capitalize ml-16 leading-relaxed`}>
                <h1>{dishName}</h1>
                <h2>Price : {dishPrice}</h2>
                <div className="w-[60%]">
                <p className="text-justify">{dishDescription}</p>

                <button className="border rounded-lg p-2 mt-4 hover:bg-slate-700 active:bg-slate-900">Order now</button>
                </div>
                
            </div>
        </div>
    </>)
}
export default Page