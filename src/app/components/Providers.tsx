"use client";
import React, { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { setSelectedSearchFieldValue } from "../redux/features/hotelSearchApiSlice";
import { store } from "../redux/store";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
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
