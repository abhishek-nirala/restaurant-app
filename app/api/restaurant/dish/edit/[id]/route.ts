import { connectionStr } from "@/app/_lib/db.connectionStr";
import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import Dish from "@/app/_lib/dishes.model";

interface Content {
    params: { id: string };
}

export async function GET(request: NextResponse, content: Content) {
    let result, success = false;
    try {

        const _id = content.params.id;
        await mongoose.connect(connectionStr);
        result = await Dish.findOne({_id : _id});
        if (result) success = true;
    } catch (err) {
        console.log("error while fetching dish data", err);

    }
    return NextResponse.json({ result, success });
}

