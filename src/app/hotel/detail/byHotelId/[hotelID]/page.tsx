export const dynamic = "force-dynamic";
import DetailLayout from "@/app/components/DetailLayout";
import { HotelDetailApiResponse, DetailByIdProps } from "@/app/types";
import React from "react";

const DetailById = async ({ params: { hotelID } }: DetailByIdProps) => {
  const data = await fetchHotelDetails(hotelID);
  const { title, description, address } = data?.data?.byHotelId || {};

  if (!data?.data?.byHotelId) {
    return (
      <DetailLayout title="Failed to load data">
        <p className="relative text-md font-medium text-gray-500 p-5">
          {"Failed to load data"}
        </p>
      </DetailLayout>
    );
  }

  return (
    <DetailLayout title={title || "Hotel Details"}>
      {hotelID && (
        <p className="relative text-md font-medium text-gray-500 p-5">
          Hotel ID: {hotelID}
        </p>
      )}
      <p className="text-lg text-gray-700">{description}</p>
      <p className="text-md text-gray-500">{address}</p>
    </DetailLayout>
  );
};

export default DetailById;

const fetchHotelDetails = async (
  hotelID: string | undefined
): Promise<HotelDetailApiResponse> => {
  const apiUrl = `${process.env.API_BASE_URL}/api/hotel/detail?hotelID=${hotelID}`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data", error);
    return { data: { byHotelId: undefined } };
  }
};
