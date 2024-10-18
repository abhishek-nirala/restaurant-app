import { NextResponse } from "next/server";
import Dish from "@/app/_lib/dishes.model";
import { connectionStr } from "@/app/_lib/db.connectionStr";
import mongoose from 'mongoose'

mongoose.connect(connectionStr)
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.log(err))


export async function GET() {
    return NextResponse.json({ msg: "true" })
}

export async function POST(request: NextResponse) {
    const payload = await request.json();
    let result , success=false; 
    try {
        const dish = new Dish(payload);
        result = await dish.save();
        if(result) success = true;
    } catch (err) {
        console.log(err);
    }
    return NextResponse.json({ result, success })
}