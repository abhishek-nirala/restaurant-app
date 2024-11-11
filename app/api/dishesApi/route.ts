import Dish from "@/app/_lib/dishes.model";
import { connectToDb } from "../user/route";
import { NextResponse } from "next/server";


export async function GET(){
    let data = null; let success = false;
    try{
        await connectToDb();
        data = await Dish.find().limit(9)
        if(data) success = true;
    }catch(err){
        console.log("Error : ",err)
    }
    return NextResponse.json({data, success})
}