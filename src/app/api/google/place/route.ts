import { NextResponse } from "next/server";

interface GooglePlacesResponse {
  predictions?: [];
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get("query");

    if (!query) {
      return NextResponse.json(
        { error: "Query parameter is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      throw new Error("API key is missing");
    }

    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      query
    )}&components=country:in&key=${apiKey}`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from Google Places API: ${response.statusText}`
      );
    }

    const data: GooglePlacesResponse = await response.json();

    if (!Array.isArray(data.predictions)) {
      throw new Error("Unexpected response format from Google Places API");
    }

    return NextResponse.json(
      {
        message: "Places fetched successfully",
        data: data.predictions.slice(0, 3),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
