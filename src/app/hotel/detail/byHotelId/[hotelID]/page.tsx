import { HotelDetailApiResponse, DetailByIdProps } from "@/app/types";
import React from "react";

const DetailById = async ({ params }: DetailByIdProps) => {
  const { hotelID } = params;
  let res: HotelDetailApiResponse | null = null;
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/api/hotel/detail?hotelID=${hotelID}`
    );
    res = await response.json();
  } catch (error) {
    console.error("Failed to fetch hotel details", error);
    return (
      <div className="min-h-screen mt-5">
        <div className="p-8 max-w-2xl mx-auto bg-white shadow-2xl rounded-lg border border-gray-200 ">
          <div className="space-y-6">
            <p className="text-lg text-gray-700">{"Failed to load details"}</p>
          </div>
        </div>
      </div>
    );
  }

  const { title, description, address } = res?.data?.byHotelId || {};

  return (
    <div>
      <div className="p-8 max-w-2xl mx-auto bg-white shadow-2xl rounded-lg border border-gray-200 ">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg opacity-50"></div>
          <h1 className="relative text-4xl font-extrabold mb-4 text-gray-900 p-5">
            {title}
          </h1>

          {hotelID && (
            <p className="relative text-md font-medium text-gray-500 p-5">
              Hotel ID: {hotelID}
            </p>
          )}
        </div>
        <div className="space-y-6">
          <p className="text-lg text-gray-700">{description}</p>
          <p className="text-md text-gray-500">{address}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailById;
