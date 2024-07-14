import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const hotelSearchApi = createApi({
  reducerPath: "hotelSearchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    hotelSearch: builder.query({
      query: (query) => ({
        url: "/hotel/search",
        method: "GET",
        params: query,
      }),
    }),
  }),
});

const hotelSearchApiSlice = createSlice({
  name: "hotelSearchApiSlice",
  initialState: {
    selectedSearchFieldValue: "",
  },
  reducers: {
    setSelectedSearchFieldValue: (state, action) => {
      state.selectedSearchFieldValue = action.payload;
      console.log(action.payload);
      localStorage.setItem("selectedSearchFieldValue", action.payload);
    },
  },
  extraReducers: () => {},
});

export const { useLazyHotelSearchQuery } = hotelSearchApi;

export const { setSelectedSearchFieldValue } = hotelSearchApiSlice.actions;

export default hotelSearchApiSlice.reducer;
