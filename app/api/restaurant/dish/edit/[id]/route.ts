import { connectionStr } from "@/app/_lib/db.connectionStr";
import { NextResponse,NextRequest } from "next/server";
import mongoose from 'mongoose';
import Dish from "@/app/_lib/dishes.model";

interface Content {
    params: { id: string };
}
mongoose.connect(connectionStr)
    .then(() => console.log("mongoose got connected sucessfully at /edit/[id]"))
    .catch((err) => console.log("mongose errro while connecting at /edit/[id]", err))

export async function GET(req:NextRequest,content: Content) {
    let result, success = false;
    try {

        const _id = content.params.id;
        await mongoose.connect(connectionStr);
        result = await Dish.findOne({ _id: _id });
        if (result) success = true;
    } catch (err) {
        console.log("error while fetching dish data", err);

    }
    return NextResponse.json({ result, success });
}

export async function PUT(request: NextRequest, content: Content) {
    let result, success = false;
    const _id = content.params.id;
    try {
        const payload = await request.json()
        result = await Dish.findOneAndUpdate({ _id: _id }, payload)
        if (result) success = true;
    } catch (err) {
        console.log("error while PUT method", err);
    }
    return NextResponse.json({ result, success });
}

