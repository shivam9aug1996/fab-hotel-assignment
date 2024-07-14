"use client";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { setSelectedSearchFieldValue } from "../redux/features/hotelSearchApiSlice";
import { store } from "../redux/store";

const Providers = ({ children }: any) => {
  useEffect(() => {
    const selectedSearchFieldValue = localStorage.getItem(
      "selectedSearchFieldValue"
    );
    if (selectedSearchFieldValue) {
      store.dispatch(setSelectedSearchFieldValue(selectedSearchFieldValue));
    }
  }, []);
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
