import { NextResponse } from "next/server";
import { hotelApiData } from "../hotelApiData";

interface Hotel {
  hotelID: string;
  title: string;
  address: string;
}

interface FilteredHotel {
  item: string;
  hotelID: string;
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

    const filteredHotels = filterHotelsByQuery(query);
    const data = formatHotelData(filteredHotels);

    return NextResponse.json(
      {
        message: "Hotels fetched successfully",
        data,
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

// Utility function to filter hotels based on the query
function filterHotelsByQuery(query: string): Hotel[] {
  const lowerCaseQuery = query.toLowerCase();
  return hotelApiData.hotels.filter(
    (hotel) =>
      hotel.title.toLowerCase().includes(lowerCaseQuery) ||
      hotel.address.toLowerCase().includes(lowerCaseQuery)
  );
}

// Utility function to format hotel data
function formatHotelData(hotels: Hotel[]): FilteredHotel[] {
  return hotels
    .map((hotel) => ({
      item: `${hotel.title} ${hotel.address}`,
      hotelID: hotel.hotelID,
    }))
    .slice(0, 3);
}
