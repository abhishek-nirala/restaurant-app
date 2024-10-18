import { connectionStr } from "@/app/_lib/db.connectionStr";
import Restaurant from "@/app/_lib/restaurant.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

mongoose.connect(connectionStr)
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.log(err))

export async function GET() {
    try {
        const data = await Restaurant.find()
        // console.log("in data");
        console.log(data);
        // console.log("out data");

    } catch (err) {
        console.log(err)
    }

    return NextResponse.json({ 'msg': 'true' })
}

export async function POST(response: NextResponse) {

    const payload = await response.json()
    let result;
    let success = false;
    if (payload.login) {
        //use login logic
        try {
            result = await Restaurant.findOne({ email: payload.email, password: payload.password })
            if (result) success = true;
        } catch (err) {
            console.log(err);
        }
    } else {

        try {
            const restaurant = new Restaurant(payload);
            result = await restaurant.save()
            if (result) success = true;
        } catch (error) {
            console.log(error)
        }
    }
    return NextResponse.json({ result, success })
}