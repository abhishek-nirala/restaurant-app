import { connectionStr } from "@/app/_lib/db.connectionStr";
import Restaurant from "@/app/_lib/restaurant.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


interface RestaurantSchema {
    email : string;
    name : string;
    password : string;
    city : string;
    contact : number;
    login : boolean;
}

mongoose.connect(connectionStr)
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.log(err))

export async function GET() {
    let data , success = false;
    try {
        data = await Restaurant.find()
        if(data) success = true;

    } catch (err) {
        console.log(err)
    }

    return NextResponse.json({ data, success })
}

export async function POST(response: NextResponse) {

    const payload:RestaurantSchema = await response.json()
    let result;
    let success = false;
    if (payload.login) {
       
        try {
            result = await Restaurant.findOne({ email: payload.email, password: payload.password }) 
            if (result) success = true;
        } catch (err) {
            console.log(err);
        }
    } else {

        try {
            await mongoose.connect(connectionStr);
            const restaurant = new Restaurant(payload);
            result = await restaurant.save()
            if (result) success = true;
        } catch (error) {
            console.log(error)
        }
    }
    return NextResponse.json({ result, success })
}