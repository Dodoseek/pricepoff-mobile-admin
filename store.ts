import { configureStore } from "@reduxjs/toolkit";
import { trailerApi } from "./api/trailerApi";

export const store = configureStore({
  reducer: {
    [trailerApi.reducerPath]: trailerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(trailerApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
