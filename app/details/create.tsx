import TrailerDetailForm from "@/components/TrailerDetailForm";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

export default function TrailerDetail() {
  return (
    <ScrollView style={[styles.container, { paddingTop: 16 }]}>
      <Stack.Screen
        options={{
          title: "Создание прицепа",
        }}
      />
      <TrailerDetailForm />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    display: "flex",
  },
});
