import { NextRequest, NextResponse } from 'next/server';
import { connectToDb } from '../user/route';
import Order from '@/app/_lib/order.model';

export  async function POST(request:NextRequest){
    const payload = await request.json();
    let success = false;
    await connectToDb();
    const orderObj = new Order(payload)
    const result = await orderObj.save();
    if(result) success = true;
    return NextResponse.json({result , success})


}