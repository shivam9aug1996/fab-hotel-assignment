"use client";
import Link from "next/link";
import React, { memo } from "react";
import { SearchResultsProps } from "../types";

const ResultItem: React.FC<{
  href: string;
  onClick: () => void;
  text: string;
  input: string;
}> = ({ href, onClick, text, input }) => {
  const highlightText = (part: string) => {
    const regex = new RegExp(`(${input})`, "gi");
    const parts = part.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === input.toLowerCase() ? (
        <span key={index} style={{ color: "black", fontWeight: "bold" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const [firstPart, ...restParts] = text.split(",");

  return (
    <Link href={href} onClick={onClick}>
      <div className="p-4 hover:bg-gray-100 cursor-pointer transition duration-300 ease-in-out">
        <p className="text-gray-700 text-sm">
          {highlightText(firstPart)}
          {restParts.length > 0 && (
            <span className="text-gray-400">
              {","}
              {highlightText(restParts.join(","))}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
};

const SearchResults: React.FC<SearchResultsProps> = ({
  googleData,
  hotelData,
  isFetchingGooglePlaceData,
  isFetchingHotelData,
  handleSelect,
  input,
}) => {
  const isLoading = isFetchingGooglePlaceData || isFetchingHotelData;
  const noResults =
    !isLoading && !googleData?.data.length && !hotelData?.data.length;

  return (
    <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-80 overflow-y-auto">
      {isLoading && (
        <div className="p-4 text-center text-gray-500   items-center">
          Loading...
        </div>
      )}

      {!isLoading && noResults && (
        <div className="p-4 text-center text-gray-500">No results found</div>
      )}

      <div className={`${isLoading ? "opacity-50 pointer-events-none" : ""}`}>
        {googleData?.data?.length > 0 && (
          <>
            <div className="font-semibold mb-2 p-2 bg-gray-100">Locations</div>
            {googleData.data.map((item) => (
              <ResultItem
                key={item.place_id}
                href={`/hotel/detail/byPlace/${item.description}`}
                onClick={() => handleSelect(item.description)}
                text={item.description}
                input={input}
              />
            ))}
          </>
        )}

        {hotelData?.data?.length > 0 && (
          <>
            <div className="font-semibold mb-2 p-2 bg-gray-100">Hotels</div>
            {hotelData.data.map((item) => (
              <ResultItem
                key={item.hotelID}
                href={`/hotel/detail/byHotelId/${item.hotelID}`}
                onClick={() => handleSelect(item.item)}
                text={item.item}
                input={input}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default memo(SearchResults);
