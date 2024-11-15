'use client'
import { useEffect, useState } from "react";
import Image from 'next/image'
import CustomerHeader, { CartData } from "@/app/_components/CustomerHeader";
import Footer from "@/app/_components/Footer";
export interface Props {
    params?: { name: string; };
    searchParams?: { id: string }
}

interface IdObject { _id: string; }

const Page = (props: Props) => {
    let cartStorageDetails;
    const [restaurantDetails, setRestaurantDetails] = useState({})
    const [foodItems, setfoodItems] = useState([])
    const [cart, setCart] = useState<undefined | CartData | IdObject>();
    const [removeCartId, setremoveCartId] = useState<string|number | undefined>();
    const name = props.params?.name //used in dynamic routes to access the dynamic parts of a URL. mostly in page.tsx

    try {
        const cartStore = localStorage.getItem('cart')
        cartStorageDetails = cartStore ? JSON.parse(cartStore) : null;
    } catch (err) {
        console.log("Error : ", err);

    }

    const cartStorage = cartStorageDetails
    const [cartId, setCartId] = useState(() => cartStorage.map((item: { _id: string }) => {
        return item._id;
    }))
    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        loadRestaurantDetails()
    }, []);
    /* eslint-disable react-hooks/exhaustive-deps */

    // console.log(cartId);


    const loadRestaurantDetails = async () => {
        const id = props.searchParams?.id; //is used to access query parameters from the URL. mostly in components.
        // console.log(id);
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
    const addToCart = (item: { _id: string; }) => {
        setCart(item)
        //code to change the add to cart button to remove from cart imediately.
        const localCartId = cartId;
        localCartId.push(item._id);
        setCartId(localCartId)
        setremoveCartId(undefined);

    }

    const removeFromCart = (id: string) => {
        setremoveCartId(id);
        const removingId = cartId.filter((itm: string) => itm != id)
        setCart(undefined);
        setCartId(removingId)
    }

    // console.log(cart)



    return (<>
        <CustomerHeader cartData={cart} removeCartItem={removeCartId} />
        <div>
            <div className="main-div text-center">
                <h1 className=" text-5xl m-14 mt-[250px] capitalize">{decodeURI(name)}</h1>
            </div>
            <div className="flex justify-between items-center p-5 text-2xl  bg-orange-600 h-12">
                {/* <h3>{restaurantDetails?.name}</h3> */}
                <h3>Contact : {restaurantDetails?.contact}</h3>
                <h3>City : {restaurantDetails?.city}</h3>
                <h3>{restaurantDetails?.email}</h3>
            </div>
            <div>
                {
                    foodItems.length > 0 ? foodItems.map((items, key) => (
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
                                    cartId.includes(items._id) ?
                                        <button className="border p-2 rounded-lg bg-orange-600" onClick={() => removeFromCart(items._id)}>Remove from Cart</button>
                                        :
                                        <button className="border p-2 rounded-lg bg-orange-600" onClick={() => addToCart(items)}>Add to Cart</button>
                                }
                            </div>
                        </div>
                    ))
                        : <h1 className="capitalize">no dishes for this restaurant</h1>
                }
            </div>
        </div >
        <Footer />
    </>)
}

export default Page;