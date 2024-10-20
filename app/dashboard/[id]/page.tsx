'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AddDishesProps {
    setItem: React.Dispatch<React.SetStateAction<boolean>>
    params: { id: string; };
}

const EditDishes: React.FC<AddDishesProps> = (props) => {
    console.log(props.params.id);

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [path, setPath] = useState('')
    const [description, setDiscription] = useState('')
    const [error, setError] = useState(false)
    const router = useRouter();

    useEffect(() => {
        handleUpdate();
    })
    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/restaurant/dish/edit/${props.params.id}`)
            const data = await response.json();
            if (data.success) {
                console.log("the dish data : ", data.result)
                setName(data.result.dishName)
                setPrice(data.result.dishPrice )
                setPath(data.result.dishImgPath)
                setDiscription(data.result.dishDescription)
            }


        } catch (err) {
            console.log(err);

        }

    }

    const handleEditDishes = async () => {
        console.log(name, price, path, description);


        if (!name || !price || !path || !description) {
            setError(true)
            return false;
        } else {
            setError(false)
        }




    }

    return (<div className="text-center">
        <h1 className="text-5xl to-black m-2">Update you Dish details here</h1>
        <div className="m-6">
            <input type="text" placeholder="Enter Your Dish Name" value={name} onChange={(e) => { setName(e.target.value) }} className="bg-slate-300 text-black text-2xl p-1  text-center rounded-lg" />
            {error && !name && <span className="fixed ml-2 text-red-500 font-extrabold">Please enter a valid name</span>}
        </div>
        <div className="m-6">
            <input type="text" placeholder="Enter Price" value={price} onChange={(e) => { setPrice(e.target.value) }} className="bg-slate-300  text-2xl p-1 text-black text-center rounded-lg" />
            {error && !price && <span className="fixed ml-2 text-red-500 font-extrabold">Please enter the price of the dish</span>}
        </div>
        <div className="m-6">
            <input type="text" placeholder="Enter Path" value={path} onChange={(e) => { setPath(e.target.value) }} className="bg-slate-300  text-2xl p-1  text-center text-black rounded-lg" />
            {error && !path && <span className="fixed ml-2 text-red-500 font-extrabold">Please enter an Image Link</span>}
        </div>
        <div className="m-6">
            <input type="text" placeholder="Enter Description" value={description} onChange={(e) => { setDiscription(e.target.value) }} className="bg-slate-300  text-2xl p-1 text-black text-center rounded-lg" />
            {error && !description && <span className="fixed ml-2 text-red-500 font-extrabold">Please enter a Description about the dish</span>}

        </div>
        <div>
            <button className="text-xl m-3 border rounded border-black p-3 hover:bg-slate-400 hover:transition hover:duration-250 hover:text-white box" onClick={handleEditDishes}>Update Dishes</button>
        </div>
        <div>
            <button className="text-xl m-3 border rounded border-black p-3 hover:bg-slate-400 hover:transition hover:duration-250 hover:text-white box" onClick={() => router.push('/dashboard')}>Go to Dashboard</button>
        </div>
    </div>)
}

export default EditDishes;