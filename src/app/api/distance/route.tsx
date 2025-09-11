import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fromUnit, toUnit, distance } = body;

    if (!fromUnit || !toUnit || distance === undefined) {
      return NextResponse.json({ error: "Missing parameter" }, { status: 400 });
    }

    if (isNaN(Number(distance))) {
      return NextResponse.json(
        { error: "Distance must be a valid number" },
        { status: 400 }
      );
    }

    const value = Number(distance);

    // Hardcoded conversion table to meters
    const distanceUnits: Record<string, number> = {
      M: 1,             // Meter
      KM: 1000,         // Kilometer
      CM: 0.01,         // Centimeter
      MM: 0.001,        // Millimeter
      MI: 1609.34,      // Mile
      YD: 0.9144,       // Yard
      FT: 0.3048,       // Foot
      IN: 0.0254,       // Inch
    };

    if (!distanceUnits[fromUnit.toUpperCase()] || !distanceUnits[toUnit.toUpperCase()]) {
      return NextResponse.json({ error: "Invalid unit" }, { status: 400 });
    }

    // Convert to meters first, then to target unit
    const meters = value * distanceUnits[fromUnit.toUpperCase()];
    const converted = meters / distanceUnits[toUnit.toUpperCase()];

    return NextResponse.json({ fromUnit, toUnit, distance: value, converted });
  } catch (error) {
    console.error("Distance conversion error:", error);
    return NextResponse.json(
      { error: "Something went wrong in conversion" },
      { status: 500 }
    );
  }
}
