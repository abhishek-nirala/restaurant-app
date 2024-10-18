import { connectionStr } from "@/app/_lib/db.connectionStr";
import Dish from "@/app/_lib/dishes.model";
import mongoose, { ConnectOptions } from "mongoose";
import { NextResponse } from "next/server";

interface Content {
    params: {
        restoId: string;
    }
}
interface Options extends ConnectOptions {
    useNewUrlParser?: boolean;
    useUnifiedTopology?: boolean;

}
const options: Options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}


mongoose.connect(connectionStr, options)
    .then(() => console.log("mongodb successfully connected"))
    .catch((err) => console.log("error while connecting to mongodb err : ", err))

export async function GET(request: NextResponse, content: Content) {
    let result, success = false;
    try {
        const id = content.params.restoId;
        result = await Dish.find({dishName : id});
        if (result) success = true;

    } catch (error) {
        console.log(error);
    }

    return NextResponse.json({ result, success })
}