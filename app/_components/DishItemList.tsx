import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import second from ''

interface DishItem {
    _id: string;
    dishName: string;
    dishPrice: number;
    dishDescription: string;
    dishImgPath?: string;
}


const DishItemList = () => {
    const [dishItems, setDishItems] = useState([]);
    const router = useRouter();
    useEffect(() => {
        loadDishItems();
    }, [])

    const loadDishItems = async () => {  // for fetching dish items from the databse.

        try {
            const restoData = localStorage.getItem("restaurantDetails")
            const restaurantId = restoData ? JSON.parse(restoData) : null;
            const _id = restaurantId._id;

            const response = await fetch(`http://localhost:3000/api/restaurant/dish/${_id}`)
            const data = await response.json();
            // console.log(data); 

            if (data.success) {
                setDishItems(data.result);
            }
        } catch (err) {
            console.log("Error while loading Dish Items : ", err);

        }

    }

    const handleDelete = async (id: string) => {

        try {
            const response = await fetch(`http://localhost:3000/api/restaurant/dish/${id}`, {
                method: "DELETE"
            })
            const data = await response.json();
            if (data.success) {
                loadDishItems();
            } else {
                alert("Dish item didn't got deleted")
            }
        } catch (err) {
            console.log("An Error while Deleting dish Items", err);

        }
    };

    return (<div className="text-center">
        <div className="text-3xl">Dish items on the menu</div>
        <div className="m-10 flex  justify-center">
            <table className="mx-auto">
                <thead>
                    <tr>
                        <td>S.No</td>
                        <td>Name</td>
                        <td>Price</td>
                        <td>Description</td>
                        <td>Image</td>
                        <td>Operations</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        dishItems.map((item: DishItem, key: number) => (
                            <tr key={key}>
                                <td>{++key}</td>
                                <td>{item.dishName}</td>
                                <td>{item.dishPrice}</td>
                                <td>{item.dishDescription}</td>
                                <td><Image src={item.dishImgPath || '/logo.png'} alt="images of food items" width={128} height={60} className="w-auto h-auto" /></td>
                                <td><button className="py-1 px-2 hover:bg-slate-500 hover:text-white m-3 border border-black" onClick={() => { handleDelete(item._id) }}>Delete</button><button className="py-1 px-2 hover:bg-slate-500 hover:text-white m-3 border border-black" onClick={() => router.push(`/dashboard/${item._id}`)}>Edit</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>)
}

export default DishItemList;