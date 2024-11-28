import { StyleSheet, View } from "react-native";
import React from "react";

import { Avatar, Button, Card, Text } from "react-native-paper";

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />;

export default function TrailerCard({ trailer }: { trailer: Trailer }) {
  return (
    <Card style={styles.card}>
      <Card.Title
        title={trailer.name}
        subtitle={trailer.color}
        left={LeftContent}
      />
      <Card.Content>
        <Text
          ellipsizeMode="tail"
          numberOfLines={3}
          style={styles.textDesc}
          variant="bodyMedium"
        >
          {trailer.description}
        </Text>
        <View style={styles.statusBox}>
          <Text>Статус:</Text>
          {trailer.status.toUpperCase() === "AVAILABLE" && (
            <View style={styles.green} />
          )}
          {trailer.status.toUpperCase() === "RESERVED" && (
            <View style={styles.yellow} />
          )}
          {trailer.status.toUpperCase() === "UNAVAILABLE" && (
            <View style={styles.red} />
          )}
        </View>
        <Text variant="bodySmall">Цена: от {trailer.price_3} рублей</Text>
      </Card.Content>
      <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
      <Card.Actions>
        <Button>Смотреть больше</Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  statusBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  textDesc: {
    textAlign: "justify",
  },
  red: {
    width: 15,
    height: 15,
    backgroundColor: "red",
    borderRadius: "50%",
  },
  green: {
    width: 15,
    height: 15,
    backgroundColor: "green",
    borderRadius: "50%",
  },
  yellow: {
    width: 15,
    height: 15,
    backgroundColor: "yellow",
    borderRadius: "50%",
  },
  card: {
    marginVertical: 20,
  },
});
