import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const hotelDetailApi = createApi({
  reducerPath: "hotelDetailApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    hotelDetail: builder.query({
      query: (query) => ({
        url: "/hotel/detail",
        method: "GET",
        params: query,
      }),
    }),
  }),
});

const hotelDetailSlice = createSlice({
  name: "hotelDetailSlice",
  initialState: {},
  reducers: {},
  extraReducers: () => {},
});

export const { useHotelDetailQuery } = hotelDetailApi;

export const {} = hotelDetailSlice.actions;

export default hotelDetailSlice.reducer;
