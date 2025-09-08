import { NextRequest,NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
       const body = await req.json()
       const {from,to,amount} = body;

       if(!from || !to || !amount){
        return NextResponse.json({error:"missing parameter"}),{status:400}
       }
       
       const rates : Record<string,number>={
        USD:1,
        INR:83,
        EUR:0.83
       }

       const convertedValue = (amount /rates[from])*rates[to];
       return NextResponse.json({from,to,amount,convertedValue})
    } catch (error) {
         return NextResponse.json({ error: "Something went wrong in conversion" }, { status: 500 });
    }
}