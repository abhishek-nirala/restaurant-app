'use client'

import { useState } from "react"
import AddDishes from "../_components/AddDishes"
import Header from "../_components/Header"
import DishItemList from "../_components/DishItemList"

 const Dashboard = ()=>{
    const [item , setItem] = useState(false)
    return(<>
    <Header/>

    <button className="text-xl m-3 border rounded border-black p-3 hover:bg-slate-400 hover:transition hover:duration-250 hover:text-white box" onClick={()=>{setItem(false)}}>Dashboard</button>
    <button className="text-lg m-3 border rounded border-black p-3 hover:bg-slate-400 hover:transition hover:duration-250 hover:text-white box" onClick={()=>{setItem(true)}}>Add Dishes</button>
    {
        item ? <AddDishes setItem = {setItem}/> :  <DishItemList/>
    }
    
    
    </>)
}

export default Dashboard