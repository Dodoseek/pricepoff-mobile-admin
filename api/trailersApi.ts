import { api } from "@/api/api";
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
    deleteTrailer: builder.mutation<Trailer, number | string>({
      query: (id) => ({
        url: `trailers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Trailers", id }],
    }),
    createTrailer: builder.mutation<Trailer, Trailer>({
      query: (trailer) => ({
        url: "trailers",
        method: "POST",
        body: trailer,
      }),
      invalidatesTags: [{ type: "Trailers" }],
    }),
    getTrailerById: builder.query<Trailer, number | string>({
      query: (trailerId) => `trailers/${trailerId}`,
      providesTags: (result, error, trailerId) => [
        { type: "Trailers", id: trailerId },
      ],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetTrailersQuery,
  useUpdateTrailerMutation,
  useDeleteTrailerMutation,
  useCreateTrailerMutation,
  useGetTrailerByIdQuery,
} = extendedApi;
