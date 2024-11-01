import { NextRequest, NextResponse } from "next/server";
import { connectToDb, UserDocument } from "../route";
import User from "@/app/_lib/user.model";

// interface L_user {
//     result?: {
//         email: string;
//         password: string;
//     }
//     success?: boolean;
// }

export async function POST(req: NextRequest) {
    let result: UserDocument | null = null, success = false;
    const { email, password } = await req.json();
    try {

        await connectToDb();
        result = await User.findOne({ email, password })
        if (result) success = true;
    } catch (err) {
        console.log("Error while checking login details : ", err);
    }
    return NextResponse.json({ result, success })

}