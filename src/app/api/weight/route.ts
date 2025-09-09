import { NextRequest,NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
       const body = await req.json()
       const {from,to,weight} = body;

       if(!from || !to || !weight){
        return NextResponse.json({error:"missing parameter"}),{status:400}
       }
       
       const weightUnits : Record<string,number>={
        KG : 1,
        G:0.001,
        LB:0.453592,
        OZ:0.0283495,
       }

       const convertedweight = (weight*weightUnits[from]) / weightUnits[to];

       
       return NextResponse.json({from,to,weight,convertedweight})
    } catch (error) {
         return NextResponse.json({ error: "Something went wrong in conversion" }, { status: 500 });
    }
}