import Dish from "@/app/_lib/dishes.model";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/app/_lib/db.connectionStr";

const connectToDb = async ():Promise<void> => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(connectionStr)
            .then(() => console.log("mongodb successfully connected at api/customer/location"))
            .catch((err: string) => console.log("error while connecting to mongodb err : ", err))
    }
}

export async function GET(){
    let data = null; let success = false;
    try{
        await connectToDb();
        data = await Dish.find().limit(9)
        if(data) success = true;
    }catch(err){
        console.log("Error : ",err)
    }
    return NextResponse.json({data, success})
}