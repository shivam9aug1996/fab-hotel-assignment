import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const googleAutocompleteApi = createApi({
  reducerPath: "googleAutocompleteApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    googleAutocomplete: builder.query({
      query: (query) => ({
        url: "/google/place",
        method: "GET",
        params: query,
      }),
    }),
  }),
});

const googleAutocompleteApiSlice = createSlice({
  name: "googleAutocompleteApiSlice",
  initialState: {},
  reducers: {},
  extraReducers: () => {},
});

export const { useLazyGoogleAutocompleteQuery } = googleAutocompleteApi;

export const {} = googleAutocompleteApiSlice.actions;

export default googleAutocompleteApiSlice.reducer;
