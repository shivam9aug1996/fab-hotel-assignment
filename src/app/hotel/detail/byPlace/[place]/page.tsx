export const dynamic = "force-dynamic";

import { HotelDetailApiResponse, DetailByPlaceProps } from "@/app/types";
import React from "react";

const Page = async ({ params }: DetailByPlaceProps) => {
  const apiUrl = `${process.env.API_BASE_URL}/api/hotel/detail?place=${params?.place}`;

  let response: HotelDetailApiResponse;
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    response = data;
  } catch (error) {
    console.error("Failed to fetch data", error);
    response = { data: { byPlace: [] } };
  }

  const hotels = response.data.byPlace || [];

  return (
    <div>
      <div className="p-6 max-w-4xl mx-auto ">
        <div className="">
          <h1 className="text-4xl font-extrabold text-center  text-white">
            Hotels in {decodeURIComponent(params?.place || "Unknown")}
          </h1>
        </div>

        {hotels.length === 0 ? (
          <div className="bg-white shadow-lg rounded-lg border border-gray-300 mt-6 p-6">
            <p className="text-center text-lg text-gray-600">
              No hotels found for the given place.
            </p>
          </div>
        ) : (
          <ul className="space-y-8 mt-5">
            {hotels.map((hotel, index) => (
              <li
                key={index}
                className="bg-white shadow-lg rounded-lg border border-gray-300 hover:shadow-xl transition-shadow duration-300 ease-in-out"
              >
                <div className="relative p-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg opacity-40"></div>
                  <h1 className="relative text-2xl font-semibold text-gray-900 mb-2">
                    {hotel.title}
                  </h1>
                  {hotel.hotelID && (
                    <p className="relative text-sm text-gray-700 mb-4">
                      Hotel ID:{" "}
                      <span className="font-semibold">{hotel.hotelID}</span>
                    </p>
                  )}
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-md text-gray-700">{hotel.description}</p>
                  <p className="text-md text-gray-600 italic">
                    {hotel.address}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Page;
