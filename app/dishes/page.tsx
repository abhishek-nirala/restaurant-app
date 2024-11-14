'use client'
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface DishData {
    data: Data[];
    success: boolean;
}

interface Data {
    _id: string,
    dishName: string,
    dishPrice: number,
    dishImgPath: string,
    dishDescription: string,
    restoId: string,
}

const Dishes = () => {
    const [dishes, setDishes] = useState<Data[]>([])
    const router = useRouter();
    useEffect(() => {
        loadAllDishes();
    }, [])

    const loadAllDishes = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/dishesApi")
            const data: DishData = await response.json();
            if (data.success) {
                //  console.log("data : ",data.data)
                setDishes(data.data)
            }
        } catch (err) {
            console.log("Error while fetching data at loadAllDishes : ", err);
        }
    }

    const getPreview = (text: string, wordLimit: number) => {
        const desc = text.split(' ');
        // console.log('desc : ', desc);

        const word = desc.slice(0, wordLimit).join(' ')+"..."
        // console.log('word : ', word);

        return word;
    }


    // const getPreview = (text:string, wordLimit:number) => {
    //     const words = text.split(' '); // Split the text into an array of words
    //     console.log(words)
    //     return words.slice(0, wordLimit).join(' ') + '...'; // Join the first 'wordLimit' words
    // };





    return (<>
        <CustomerHeader />
        <div className="main-div"></div>
        <div className="ml-12  w-[90%] p-6">
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {
                    dishes.map((items, key) => (
                        <div key={key} className="">
                            <Card className="bg-[#123] h-[500px] overflow-hidden" onClick={() => router.push(`/explore/dish/${items.dishName}?id=${items._id}`)}>
                                <CardHeader>
                                    <CardTitle className="p-0"><Image className="object-contain w-[400px] h-[320px]" src={items.dishImgPath} alt={`image of ${items.dishName}`} width={256} height={128} /></CardTitle>
                                    <CardContent className="p-0">{items.dishName}</CardContent>
                                    <CardDescription>{getPreview(items.dishDescription, 8)}</CardDescription>
                                    <p className="capitalize">Price : {items.dishPrice}</p>
                                    <p></p>
                                </CardHeader>
                            </Card>
                        </div>
                    ))

                }
            </div>
        </div>
        <Footer />
    </>)
}

export default Dishes;
