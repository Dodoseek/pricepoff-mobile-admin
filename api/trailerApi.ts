import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const trailerApi = createApi({
  reducerPath: "trailerApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_BASE_API_URL }),
  endpoints: (builder) => ({
    getTrailers: builder.query<Trailer[], void>({
      query: () => "trailers",
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const websocket = new WebSocket(
          process.env.EXPO_PUBLIC_BASE_WS_URL + "trailers"
        );

        try {
          await cacheDataLoaded;

          websocket.onmessage = (event) => {
            const data = JSON.parse(event.data) as Trailer[];
            if (data) {
              updateCachedData((draft) => {
                draft = data;
              });
            }
          };

          websocket.onerror = (error) => {
            console.error("WebSocket error:", error);
          };
        } catch {
          console.error("Error initializing WebSocket");
        }

        await cacheEntryRemoved;
        websocket.close();
      },
    }),
  }),
});

export const { useGetTrailersQuery } = trailerApi;
