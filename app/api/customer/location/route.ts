import { connectionStr } from "@/app/_lib/db.connectionStr";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Restaurant from "@/app/_lib/restaurant.model";

interface RestaurantDocument {
    city: string;
    // Include other fields if needed
  }
  

const connectToMongoDb = async () => {
    if (mongoose.connection.readyState === 0) {
        mongoose.connect(connectionStr)
            .then(() => console.log("mongodb successfully connected at api/customer/location"))
            .catch((err: string) => console.log("error while connecting to mongodb err : ", err))
    }
}

export async function GET() {
    await connectToMongoDb();
    let data:string[] = [], success = false;
    try{
        const result:RestaurantDocument[] = await Restaurant.find()
        data = result.map((item)=>item.city.charAt(0).toUpperCase() + item.city.slice(1))
        data = [...new Set(data)];

        if(data) success = true;
    }catch(err){
        console.log("Error while fetching Location data at api/customer/location : ", err);
        
    }
    return NextResponse.json({ data, success });
}