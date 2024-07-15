"use client";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useOutsideClick from "../../hooks/useOutsideClick";
import useUpdateSelectedSearchField from "../../hooks/useUpdateSelectedSearchField";
import { useLazyGoogleAutocompleteQuery } from "../../redux/features/googleAutocompleteApiSlice";
import { useLazyHotelSearchQuery } from "../../redux/features/hotelSearchApiSlice";
import { debounce } from "../../utils/functions";
import Input from "./Input";
import SearchResults from "./SearchResults";

const SearchField: React.FC = () => {
  const selectedSearchFieldValue = useSelector(
    (state: any) => state?.hotelSearch?.selectedSearchFieldValue
  );
  const [input, setInput] = useState<string>("");
  const [queryInput, setQueryInput] = useState<string>("");

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
  useUpdateSelectedSearchField();

  useEffect(() => {
    if (queryInput !== "") {
      googleAutocomplete({ query: queryInput }, true);
      hotelSearch({ query: queryInput }, true);
    }
  }, [queryInput, googleAutocomplete, hotelSearch]);

  useEffect(() => {
    setInput(selectedSearchFieldValue);
  }, [selectedSearchFieldValue]);

  const debouncedCb = useCallback(
    debounce((data: string) => {
      setQueryInput(data);
    }, 500),
    []
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      setInput(text);
      debouncedCb(text);
      if (text === "") {
        setQueryInput("");
      }
    },
    [debouncedCb]
  );

  const handleSelect = useCallback((data: string) => {
    setInput(data);
    setQueryInput("");
  }, []);

  const handleClear = useCallback(() => {
    setInput("");
    setQueryInput("");
  }, []);

  return (
    <div ref={searchFieldRef} className="relative min-w-60">
      <Input
        input={input}
        handleChange={handleChange}
        handleClear={handleClear}
      />
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
