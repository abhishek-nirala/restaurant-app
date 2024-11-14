import { connectionStr } from "@/app/_lib/db.connectionStr";
import Dish from "@/app/_lib/dishes.model";
import { NextRequest, NextResponse } from "next/server";
import mongoose from 'mongoose'
// import { NextApiResponse} from 'next'

interface Content {
    params: {
        restoId: string;
        id: string;
    }
}



mongoose.connect(connectionStr)
    .then(() => console.log("mongodb successfully connected at api/restaurant/dish/[restoId]/route.ts"))
    .catch((err: string) => console.log("error while connecting to mongodb err : ", err))

export async function GET(req: NextResponse, content: Content) {
    let result, success = false;

    try {
        const id = content.params.restoId;
        result = await Dish.find({ restoId: id });
        if (result) success = true;

    } catch (error) {
        console.log(error);
    }

    return NextResponse.json({ result, success })
}

export async function DELETE(req : NextRequest, content: Content) {
    let result, success = false;

    try {
        const id = content.params.restoId;
        result = await Dish.deleteOne({ _id: id });
        if (result.deletedCount > 0) success = true;

    } catch (error) {
        console.log(error);
    }

    return NextResponse.json({ result, success })
}
