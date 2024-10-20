import { useState } from "react";

interface AddDishesProps {
    setItem: React.Dispatch<React.SetStateAction<boolean>>
}

const EditDishes: React.FC<AddDishesProps> = (props) => {

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [path, setPath] = useState('')
    const [description, setDiscription] = useState('')
    const [error, setError] = useState(false)

    const handleAddDishes = async () => {
        console.log(name, price, path, description);

        if (!name || !price || !path || !description) {
            setError(true)
            return false;
        } else {
            setError(false)
        }

      


    }

    return (<div className="text-center">
        <h1 className="text-5xl to-black m-2">Add your Dishes here</h1>
        <div className="m-6">
            <input type="text" placeholder="Enter Your Dish Name" value={name} onChange={(e) => { setName(e.target.value) }} className="bg-slate-300 text-black text-2xl p-1  text-center rounded-lg" />
            {error && !name && <span className="fixed ml-2 text-red-700">Please enter a valid name</span>}
        </div>
        <div className="m-6">
            <input type="text" placeholder="Enter Price" value={price} onChange={(e) => { setPrice(e.target.value) }} className="bg-slate-300  text-2xl p-1 text-black text-center rounded-lg" />
            {error && !price && <span className="fixed ml-2 text-red-700">Please enter the price of the dish</span>}
        </div>
        <div className="m-6">
            <input type="text" placeholder="Enter Path" value={path} onChange={(e) => { setPath(e.target.value) }} className="bg-slate-300  text-2xl p-1  text-center text-black rounded-lg" />
            {error && !path && <span className="fixed ml-2 text-red-700">Please enter an Image Link</span>}
        </div>
        <div className="m-6">
            <input type="text" placeholder="Enter Description" value={description} onChange={(e) => { setDiscription(e.target.value) }} className="bg-slate-300  text-2xl p-1 text-black text-center rounded-lg" />
            {error && !description && <span className="fixed ml-2 text-red-700">Please enter a Description about the dish</span>}

        </div>
        <div>
            <button className="text-xl m-3 border rounded border-black p-3 hover:bg-slate-400 hover:transition hover:duration-250 hover:text-white box" onClick={handleAddDishes}>Add Dishes</button>
        </div>
    </div>)
}

export default EditDishes;