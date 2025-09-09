import { NextRequest,NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
       const body = await req.json()
       const {born,current} = body;

       if(!born || !current ){
        return NextResponse.json({error:"missing parameter"}),{status:400}
       }
       
       const bornYear = parseInt(born)
       const currentYear = parseInt(current)

        if (isNaN(bornYear) || isNaN(currentYear)) {
      return NextResponse.json(
        { error: "Invalid year format" },
        { status: 400 }
      );
    }

    if (currentYear < bornYear) {
      return NextResponse.json(
        { error: "Current year must be greater than born year" },
        { status: 400 }
      );
    }

    const age = currentYear - bornYear;

    return NextResponse.json({ bornYear, currentYear, age });

    } catch (error) {
         return NextResponse.json({ error: "Something went wrong in conversion" }, { status: 500 });
    }
}