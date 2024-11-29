import { api } from "@/api/api";
// TODO: Разобраться с providesTags и invalidatesTags
const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTrailers: builder.query<Trailer[], void>({
      query: () => "trailers",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Trailers" as const,
                id: id,
              })),
              { type: "Trailers" },
            ]
          : ["Trailers"],
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
    updateTrailer: builder.mutation<void, Trailer>({
      query: (trailer) => ({
        url: `trailers/${trailer.id}`,
        method: "PUT",
        body: trailer,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Trailers", id }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetTrailersQuery, useUpdateTrailerMutation } = extendedApi;
