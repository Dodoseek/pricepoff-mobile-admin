import { StyleSheet, View } from "react-native";
import React from "react";

import { Button, Card, Text, Avatar, useTheme } from "react-native-paper";

export default function TrailerCard({ trailer }: { trailer: Trailer }) {
  const theme = useTheme();

  const getStatus = () => {
    switch (trailer.status.toUpperCase()) {
      case "AVAILABLE":
        return (
          <>
            <Text>В наличии</Text>
            <Avatar.Icon style={styles.indicator} size={14} icon="check" />
          </>
        );
      case "RESERVED":
        return (
          <>
            <Text>Отсутствует</Text>
            <Avatar.Icon style={styles.indicator} size={24} icon="lock" />
          </>
        );
      case "UNAVAILABLE":
        return (
          <>
            <Text>Отсутствует</Text>
            <Avatar.Icon style={styles.indicator} size={24} icon="close-box" />
          </>
        );
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Cover
        style={[
          styles.cover,
          { borderTopLeftRadius: 15, borderTopRightRadius: 15 },
        ]}
        source={{ uri: "https://picsum.photos/700" }}
      />
      <Card.Title title={trailer.name} />
      <Card.Content style={{ marginBottom: 20 }}>
        <View style={[styles.statusBox, { marginBottom: 10 }]}>
          {getStatus()}
        </View>
        <Text>Цена: от {trailer.price_3} рублей</Text>
      </Card.Content>
      <Button
        labelStyle={{ color: "white" }}
        style={{
          backgroundColor: theme.colors.primary,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
      >
        Смотреть больше
      </Button>
    </Card>
  );
}

const styles = StyleSheet.create({
  statusBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  indicator: {
    marginLeft: 5,
  },
  card: {
    marginVertical: 10,
    width: "100%",
    borderRadius: 15,
  },
  cover: {
    borderRadius: 0,
  },
});
