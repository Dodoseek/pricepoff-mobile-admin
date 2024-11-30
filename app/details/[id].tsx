import { useGetTrailerByIdQuery } from "@/api/trailersApi";
import TrailerDetailForm from "@/components/TrailerDetailForm";
import { useRefresh } from "@/hooks/useRefresh";
import { Stack, useLocalSearchParams } from "expo-router";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

export default function TrailerDetail() {
  const { id } = useLocalSearchParams();
  const {
    data: trailer,
    isLoading: isLoading,
    refetch,
  } = useGetTrailerByIdQuery(id as string, {
    skip: !id,
  });

  const { refreshing, onRefresh } = useRefresh(refetch);

  if (isLoading || !trailer) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator animating={true} color={MD2Colors.red800} />
      </View>
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={[styles.container, { paddingTop: 16 }]}
    >
      <Stack.Screen
        options={{
          title: trailer?.name,
        }}
      />
      <TrailerDetailForm trailer={trailer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    display: "flex",
  },
});
