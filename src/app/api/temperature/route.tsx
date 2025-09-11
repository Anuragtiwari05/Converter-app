import { NextRequest,NextResponse } from "next/server";

export async function POST(req:NextRequest){

    try {
        const body = await req.json();
        const {fromUnit,toUnit,temp} = body;

        if(!fromUnit || !toUnit || !temp ){
            return NextResponse.json(
                {error:"missing parameter"},
                {status:400}
            )
        }

        if(isNaN(Number(temp))){
            return NextResponse.json(
                {error:"amount must be valid number"},
                {status:400}
            )
        }

        const value = Number(temp)
        let celsius : number
        switch(fromUnit.toUpperCase()){
            case "C":
                celsius = value;
                break;
                 case "F":
        celsius = (value - 32) * 5 / 9;
        break;
      case "K":
        celsius = value - 273.15;
        break;
      default:
        return NextResponse.json({ error: "Invalid from unit" }, { status: 400 });
        }

        let converted : number;

        switch(toUnit.toUpperCase()){
              case "C":
        converted = celsius;
        break;
      case "F":
        converted = celsius * 9 / 5 + 32;
        break;
      case "K":
        converted = celsius + 273.15;
        break;
      default:
        return NextResponse.json({ error: "Invalid to unit" }, { status: 400 });
        }
            
        return NextResponse.json({ fromUnit, toUnit, temp: value, converted });
    } catch (error) {
         console.error("Temperature conversion error:", error);
    return NextResponse.json(
      { error: "Something went wrong in conversion" },
      { status: 500 }
    )
    }
}