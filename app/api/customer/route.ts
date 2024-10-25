import { connectionStr } from "@/app/_lib/db.connectionStr";
import restaurantModel from "@/app/_lib/restaurant.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

const connectToDB = async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(connectionStr)
            .then(() => console.log("DB connected successfully at api/customer"))
            .catch((err) => console.log("Error while connected at api/customer : ", err))
    }
}


export async function GET(req: NextRequest) {
    const queryParams = req.nextUrl.searchParams;
    let result;
    // console.log(queryParams.get('restaurant'));
    try {
        await connectToDB();
        let filter = {}
        if (queryParams.get('location')) {
            const city = queryParams.get('location')
            filter = { city: { $regex: new RegExp(city, 'i') } }
        }else if(queryParams.get('restaurant')){
            const name = queryParams.get('restaurant')
            filter = { name: { $regex: new RegExp(name, 'i') } }

        }
        result = await restaurantModel.find(filter);
    } catch (err) {
        console.log("Error at api/customer : ", err)
    }


    return NextResponse.json({ result, success: true })
}