'use client'
import { useEffect, useState } from "react";
import Image from 'next/image'
import CustomerHeader from "@/app/_components/CustomerHeader";
interface Props {
    params: { name: string; };
    searchParams: { id: string }
}

const Page = (props: Props) => {
    const [restaurantDetails, setRestaurantDetails] = useState({})
    const [foodItems, setfoodItems] = useState([])
    const name = props.params.name // o used in dynamic routes to access the dynamic parts of a URL. mostly in page.tsx

    useEffect(() => {
        loadRestaurantDetails()
    }, []);
    const loadRestaurantDetails = async () => {
        const id = props.searchParams.id; //is used to access query parameters from the URL. mostly in components.
        console.log(id);
        try {
            const response = await fetch("http://localhost:3000/api/customer/" + id)
            const data = await response.json();
            if (data.success) {
                setRestaurantDetails(data.details)
                setfoodItems(data.foodItems)
            }
        } catch (err) {
            console.log("Error : ", err);
        }

    }

    return (<>
        <CustomerHeader />
        <div>
            <div className="main-div text-center">
                <h1 className=" text-5xl m-14 mt-[250px] ">{decodeURI(name)}</h1>
            </div>
            <div>
                <h3>{restaurantDetails?.name}</h3>
                <h3>{restaurantDetails?.contact}</h3>
                <h3>{restaurantDetails?.email}</h3>
                <h3>{restaurantDetails?.city}</h3>
            </div>
            <div>
                {
                    foodItems.map((items, key) => (
                        <div key={key}>
                            <ul>
                                <li> <Image src={items.dishImgPath} width={100} height={100} alt="restaurant logo" className="h-auto w-auto" />
                                </li>
                                <li>Dish name: {items.dishName} </li>
                                <li> {items.dishPrice} </li>
                                <li> {items.dishDescription} </li>
                            </ul>
                        </div>
                    ))
                }
            </div>
        </div>
    </>)
}

export default Page;