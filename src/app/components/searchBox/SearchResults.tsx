"use client";
import React, { memo } from "react";
import { SearchResultsProps } from "../../types";
import ResultItem from "./ResultItem";

const SearchResults = ({
  googleData,
  hotelData,
  isFetchingGooglePlaceData,
  isFetchingHotelData,
  handleSelect,
  input,
}: SearchResultsProps) => {
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
                href={`/hotel/detail/byPlace/${item.description}?queryInput=${item.description}`}
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
                href={`/hotel/detail/byHotelId/${item.hotelID}?queryInput=${item.item}`}
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
