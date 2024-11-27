import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";

import { Text } from "react-native-paper";
import TrailerCard from "./TrailerCard";

export default function TrailerList() {
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const websocket = new WebSocket(
      "ws://192.168.0.46:8000/api/v1/ws/trailers"
    );

    websocket.onopen = () => {
      console.log("Connected to WebSocket");
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.trailers) {
        setTrailers((prevTrailers) => {
          const newTrailers = data.trailers;
          return [...newTrailers];
        });
        setLoading(false);
      }
    };

    websocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    websocket.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      websocket.close();
    };
  }, []);

  if (loading) {
    return <Text>Загрузка данных о прицепах...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        {trailers.map((trailer, index) => (
          <TrailerCard key={trailer.id | index} trailer={trailer} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    gap: 10,
  },
});
