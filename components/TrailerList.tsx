import { useGetTrailersQuery } from "@/api/trailerApi";
import { ScrollView, View, StyleSheet } from "react-native";
import TrailerCard from "./TrailerCard";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

import { Text } from "react-native-paper";

export default function TrailerList() {
  const { data = [], isLoading } = useGetTrailersQuery();

  if (isLoading) {
    return <ActivityIndicator animating={true} color={MD2Colors.red800} />;
  }

  if (!data || data.length === 0) {
    return <Text>Нет данных о прицепах</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        {data?.map((trailer) => (
          <TrailerCard key={trailer.id} trailer={trailer} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});
