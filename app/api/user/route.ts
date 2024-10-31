import { connectionStr } from "@/app/_lib/db.connectionStr";
import User from "@/app/_lib/user.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

interface IUser {
    email : string;
    name : string;
    password : string;
    city : string;
    contact : number;
    login : boolean;
}
type UserDocument = Document & IUser;

const connectToDb = async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(connectionStr)
            .then(() => console.log("mongodb successfully connected at api/customer/location"))
            .catch((err: string) => console.log("error while connecting to mongodb err : ", err))
    }
}

export async function GET() {
    return NextResponse.json({ success: true })
}

export async function POST(request: NextRequest) {
    const payload = await request.json();
    let success = false;
    let result: UserDocument  | null = null;
    try {
        await connectToDb();
        const user = new User(payload)
        result = await user.save();
        if (result) success = true;
    } catch (err) {
        console.log("Error while saving data of the user : ", err);
    }
    return NextResponse.json({result, success})
}