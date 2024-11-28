import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { useGetTrailersQuery } from "@/api/trailersApi";
import { useEffect, useState } from "react";

export default function TrailerDetails() {
  const { id } = useLocalSearchParams();
  const { data = [], isLoading, refetch } = useGetTrailersQuery();
  const [trailer, setTrailer] = useState<Trailer | null>(null);

  useEffect(() => {
    if (data.length > 0) {
      const trailer = data.find((trailer) => trailer.id.toString() === id);
      trailer && setTrailer(trailer);
    }
    return () => {};
  }, [data]);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: trailer?.name,
        }}
      />
      <Text style={styles.title}>Детальная информация</Text>
      <Text style={styles.subtitle}>ID трейлера: {id}</Text>
    </View>
  );
}

export const options = ({
  route,
}: {
  route: { params: { name: string } };
}) => ({
  title: route.params?.name || "Детали прицепа",
  headerStyle: {
    backgroundColor: "#FF4C00",
  },
  headerTitleStyle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
  },
});
