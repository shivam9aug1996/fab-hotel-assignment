import { NextResponse } from "next/server";
import { hotelApiData } from "../hotelApiData";

interface Hotel {
  hotelID: string;
  address: string;
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const hotelID = url.searchParams.get("hotelID");
    const place = url.searchParams.get("place");

    const filteredHotel = hotelID ? findHotelById(hotelID) : null;

    const hotelsByAddress = place ? filterHotelsByAddress(place) : [];

    return NextResponse.json(
      {
        message: "Hotels fetched successfully",
        data: {
          byHotelId: filteredHotel,
          byPlace: hotelsByAddress,
        },
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

// Utility function to find a hotel by ID
function findHotelById(hotelID: string): Hotel | null {
  return hotelApiData.hotels.find((hotel) => hotel.hotelID === hotelID) || null;
}

// Utility function to filter hotels by address
function filterHotelsByAddress(place: string): Hotel[] {
  const searchParts = place
    .toLowerCase()
    .split(/\s|,/)
    .map((part) => part.trim())
    .filter((part) => part)
    .slice(0, -1); // Exclude the last part

  return hotelApiData.hotels.filter((hotel) => {
    const lowerCaseAddress = hotel.address.toLowerCase();
    return searchParts.some((part) => lowerCaseAddress.includes(part));
  });
}
