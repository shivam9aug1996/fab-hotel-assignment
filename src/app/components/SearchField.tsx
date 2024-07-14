"use client";
import { usePathname } from "next/navigation";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useOutsideClick from "../hooks/useOutsideClick";
import { useLazyGoogleAutocompleteQuery } from "../redux/features/googleAutocompleteApiSlice";
import {
  setSelectedSearchFieldValue,
  useLazyHotelSearchQuery,
} from "../redux/features/hotelSearchApiSlice";
import { debounce } from "../utils/functions";
import SearchResults from "./SearchResults";

const SearchField: React.FC = () => {
  const selectedSearchFieldValue = useSelector(
    (state: any) => state?.hotelSearch?.selectedSearchFieldValue
  );
  const dispatch = useDispatch();
  const [input, setInput] = useState<string>("");
  const [queryInput, setQueryInput] = useState<string>("");
  const pathname = usePathname();

  const [
    googleAutocomplete,
    { data: googleData, isFetching: isFetchingGooglePlaceData },
  ] = useLazyGoogleAutocompleteQuery();

  const [hotelSearch, { data: hotelData, isFetching: isFetchingHotelData }] =
    useLazyHotelSearchQuery();

  const handleClickOutside = () => {
    setQueryInput("");
  };

  const searchFieldRef = useOutsideClick(handleClickOutside, queryInput !== "");

  useEffect(() => {
    if (queryInput !== "") {
      googleAutocomplete({ query: queryInput }, true);
      hotelSearch({ query: queryInput }, true);
    }
  }, [queryInput]);

  useEffect(() => {
    setInput(selectedSearchFieldValue);
  }, [selectedSearchFieldValue]);
  useEffect(() => {
    if (pathname == "/") {
      dispatch(setSelectedSearchFieldValue(""));
    }
  }, [pathname]);

  const handleQueryInput = (data: string) => {
    setQueryInput(data);
  };

  const debouncedCb = useCallback(debounce(handleQueryInput), []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInput(text);
    debouncedCb(text);
    if (text === "") {
      setQueryInput("");
    }
  }, []);

  const handleSelect = useCallback((data: string) => {
    setInput(data);
    setQueryInput("");
    dispatch(setSelectedSearchFieldValue(data));
  }, []);

  const handleClear = () => {
    setInput("");
    setQueryInput("");
  };

  return (
    <div ref={searchFieldRef} className="relative min-w-60">
      <div className="relative">
        <input
          value={input}
          onChange={handleChange}
          placeholder="Search hotels..."
          className="w-full border p-2 rounded-lg shadow pr-7"
        />
        {input && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            &#x2715;
          </button>
        )}
      </div>

      {queryInput && (
        <SearchResults
          googleData={googleData}
          hotelData={hotelData}
          isFetchingGooglePlaceData={isFetchingGooglePlaceData}
          isFetchingHotelData={isFetchingHotelData}
          handleSelect={handleSelect}
          input={input}
        />
      )}
    </div>
  );
};

export default memo(SearchField);
