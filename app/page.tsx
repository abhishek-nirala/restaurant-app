'use client'
import { useEffect, useState } from "react";
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";

export default function Home() {
  const [locations, setLocations] = useState([])
  const [selectedLocation, setSelectedLocation] = useState('')
  const [showLocation, setShowLocation] = useState(false)

  useEffect(() => {
    handleLocation();

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
  const handleSelectedLocation = (item: string) => {
    setSelectedLocation(item)
    setShowLocation(false) 
  }


  return (
    <div className="">

      <CustomerHeader />
      <div className="main-div text-center">
        <h1 className=" text-7xl m-14 ">Food Delivery App</h1>

        <div className="bg-white border rounded-lg py-2  text-xl w-[60%] m-auto">

          <input className="text-black h-6 p-5 border-r-[2px] w-[35 %] border-slate-400" type="text" value={selectedLocation} onClick={()=>setShowLocation(true)} placeholder="Search Location" />
          <ul className="text-black text-left absolute bg-white border-2 border-beige ">
            {
             showLocation && locations.map((item, key) => (
                <li className="location-li" key={key} onClick={() => handleSelectedLocation(item)}>{item}</li>
              ))
            }
          </ul>
          <input className="text-black mx-2 border-black w-[60%]" type="text" placeholder="Search Your Favourite Dish Items" />
        </div>
      </div>
      <Footer />

    </div>
  );
}
