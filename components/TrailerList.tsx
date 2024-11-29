import React, { useState, useCallback } from "react";
import { useGetTrailersQuery } from "@/api/trailersApi";
import { ScrollView, View, StyleSheet, RefreshControl } from "react-native";
import TrailerCard from "./TrailerCard";
import { ActivityIndicator, MD2Colors, Text } from "react-native-paper";
import { useRefresh } from "@/hooks/useRefresh";

export default function TrailerList() {
  const { data = [], isLoading, refetch } = useGetTrailersQuery();
  const { refreshing, onRefresh } = useRefresh(refetch);

  if (isLoading && !refreshing) {
    return <ActivityIndicator animating={true} color={MD2Colors.red800} />;
  }

  if (!data || data.length === 0) {
    return <Text>Нет данных о прицепах</Text>;
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View>
        {data.map((trailer) => (
          <TrailerCard key={trailer.id} trailer={trailer} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    width: "100%",
  },
});
