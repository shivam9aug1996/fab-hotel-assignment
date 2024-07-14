import { configureStore } from "@reduxjs/toolkit";
import googleAutocompleteApiSlice, {
  googleAutocompleteApi,
} from "./features/googleAutocompleteApiSlice";
import hotelSearchApiSlice, {
  hotelSearchApi,
} from "./features/hotelSearchApiSlice";

export const store = configureStore({
  reducer: {
    googleApi: googleAutocompleteApiSlice,
    [googleAutocompleteApi.reducerPath]: googleAutocompleteApi.reducer,
    hotelSearch: hotelSearchApiSlice,
    [hotelSearchApi.reducerPath]: hotelSearchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(googleAutocompleteApi.middleware)
      .concat(hotelSearchApi.middleware),
});
