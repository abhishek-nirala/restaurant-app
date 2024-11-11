//for the /explore/[name] page

import { NextRequest, NextResponse } from "next/server";
import mongoose from 'mongoose'
import { connectionStr } from "@/app/_lib/db.connectionStr";
import restaurantModel from "@/app/_lib/restaurant.model";
import Dish from "@/app/_lib/dishes.model";

interface RestaurantSchema {
    email : string;
    name : string;
    city : string;
    contact : number;
}
interface FoodItems{
    dishName?: string ;
    dishPrice?: number;
    dishImgPath?:string;
    dishDescription?: string;
    restoId?:string;
}

const connectToMongoDb = async () => {
    if (mongoose.connection.readyState === 0) {
        mongoose.connect(connectionStr)
            .then(() => console.log("mongodb successfully connected at api/customer/location"))
            .catch((err: string) => console.log("error while connecting to mongodb err : ", err))
    }
}

export async function GET(request:NextRequest, content: { params: { id: string; } }) {
    await connectToMongoDb();
    let foodItems:FoodItems | null = null, details:RestaurantSchema | null = null;
    const id = content.params.id;
    try {

        details = await restaurantModel.findOne({ _id: id }) 
        foodItems = await Dish.find({ restoId: id })
    } catch (err) {
        console.log("Error at /api/customer/[id] : ", err);
    }

    return NextResponse.json({details, foodItems, success: true })
}