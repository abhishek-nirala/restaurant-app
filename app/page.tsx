'use client'
import { useEffect, useState } from "react";
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useRouter } from "next/navigation";


interface ItemsList {
  name: string;
  city: string;
  contact: number;
  email: string;

}

export default function Home() {
  const [locations, setLocations] = useState([])
  const [selectedLocation, setSelectedLocation] = useState('')
  const [showLocation, setShowLocation] = useState(false)
  const [restaurants, setRestaurants] = useState([])
  const router = useRouter();

  useEffect(() => {
    handleLocation();
    loadRestaurants({});
  }, [])

  const handleLocation = async () => {
    try {
      const response: Response = await fetch("http://localhost:3000/api/customer/location")
      const data = await response.json();
      if (data.success) {
        setLocations(data.data)
      }
    } catch (err) {
      console.log("Error at handleLocation : ", err);
    }
  }

  const loadRestaurants = async (params: { location?: string; restaurant?: string; }) => {
    let url = "http://localhost:3000/api/customer"
    try {
      if (params?.location) url = url + "?location=" + params.location;
      else if (params?.restaurant) url = url + "?restaurant=" + params.restaurant;
      console.log(url);

      const response = await fetch(url)
      const data = await response.json();
      if (data.success) setRestaurants(data.result);


    } catch (err) {
      console.log("Error at page.tsx : ", err);

    }
  }

  const handleSelectedLocation = (item: string) => {
    setSelectedLocation(item)
    setShowLocation(false)
    loadRestaurants({ location: item })
  }

  console.log(restaurants);

  return (
    <div className="">

      <CustomerHeader />
      <div className="main-div text-center">
        <h1 className=" text-7xl m-14 ">Food Delivery App</h1>

        <div className="bg-white border rounded-lg py-2  text-xl w-[20%] m-auto sm:w-[20%] md:w-[50%] lg:w-[65%]">

          <input className="text-black h-6 p-5 border-r-[2px] w-[6%] border-slate-400 sm:w-[12%] md:w-[20%] lg:w-[35%]" type="text" value={selectedLocation} onChange={() => setShowLocation(true)} placeholder="Search Location" />
          <ul className="text-black text-left absolute bg-white border-2 border-beige ">
            {
              showLocation && locations.map((item, key) => (
                <li className="location-li" key={key} onClick={() => handleSelectedLocation(item)}>{item}</li>
              ))
            }
          </ul>
          <input className="text-black mx-2 border-black w-[10%] sm:w-[20%] md:w-[40%] lg:w-[60%]" type="text" placeholder="Search Your Favourite Dish Items or Restaurants" onChange={(e)=>loadRestaurants({restaurant:e.target.value})}/>
        </div>
      </div>
      <div className=" py-9 px-16 sm:px-10 mt-5 rounded-2xl">
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {restaurants.map((items: ItemsList, key) => (
            <Card key={key} className="" onClick={()=>router.push(`/explore/${items.name}`)}>
              <CardHeader>
                <CardTitle>{items.name}</CardTitle>
                <CardDescription>{items.contact}</CardDescription>
                <p>{items.city}</p>
                <p>{items.email}</p>
              </CardHeader>
            </Card>
          ))
          }
        </div>
      </div>


      <Footer />

    </div>
  );
}
