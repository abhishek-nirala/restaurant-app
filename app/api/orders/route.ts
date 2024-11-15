import { NextRequest, NextResponse } from 'next/server';
import Order from '@/app/_lib/order.model';
import mongoose from 'mongoose';
import { connectionStr } from '@/app/_lib/db.connectionStr';

const connectToDb = async (): Promise<void> => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(connectionStr)
            .then(() => console.log("mongodb successfully connected at api/customer/location"))
            .catch((err: string) => console.log("error while connecting to mongodb err : ", err))
    }
}

export async function POST(request: NextRequest) {
    const payload = await request.json();
    let success = false;
    await connectToDb();
    const orderObj = new Order(payload)
    const result = await orderObj.save();
    if (result) success = true;
    return NextResponse.json({ result, success })


}