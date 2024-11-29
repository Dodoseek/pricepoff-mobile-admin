import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { useGetTrailersQuery } from "@/api/trailersApi";

export default function TrailerDetails() {
  const { id } = useLocalSearchParams();
  const { data = [], isLoading } = useGetTrailersQuery();
  const [trailer, setTrailer] = useState<Trailer | null>(null);

  useEffect(() => {
    if (data.length > 0) {
      const selectedTrailer = data.find(
        (trailer) => trailer.id.toString() === id
      );
      selectedTrailer && setTrailer(selectedTrailer);
    }
  }, [data]);

  if (isLoading || !trailer) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Загрузка...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          title: trailer.name,
        }}
      />

      {/* Название и кнопка загрузки */}
      <View style={styles.header}>
        <Text style={styles.title}>{trailer.name}</Text>
        <TouchableOpacity style={styles.downloadButton}>
          <Text style={styles.downloadText}>Скачать договор на аренду</Text>
        </TouchableOpacity>
      </View>

      {/* Карусель изображений */}
      <FlatList
        data={trailer.images} // trailer.images — массив ссылок на изображения
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} />
        )}
        contentContainerStyle={styles.imageCarousel}
      />

      {/* Информация об аренде */}
      <View style={styles.rentalInfo}>
        <Text style={styles.rentalPrice}>800 ₽ / сутки</Text>
        <Text style={styles.deposit}>Залог 3000 ₽</Text>
        <View style={styles.rentalDuration}>
          <TouchableOpacity style={styles.durationButton}>
            <Text style={styles.durationText}>1-2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.durationButton}>
            <Text style={styles.durationText}>3-6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.durationButton}>
            <Text style={styles.durationText}>от 7</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Кнопки действия */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.reserveButton}>
          <Text style={styles.reserveText}>Зарезервировать</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Добавить в корзину</Text>
        </TouchableOpacity>
      </View>

      {/* Характеристики */}
      <View style={styles.specifications}>
        <Text style={styles.specificationsTitle}>Характеристики</Text>
        <Text style={styles.specificationItem}>- Высота: 870мм</Text>
        <Text style={styles.specificationItem}>- Ширина: 1230мм</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  downloadButton: {
    alignSelf: "flex-start",
  },
  downloadText: {
    color: "#007BFF",
    fontSize: 14,
  },
  imageCarousel: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  image: {
    width: 250,
    height: 150,
    borderRadius: 8,
    marginRight: 16,
  },
  rentalInfo: {
    padding: 16,
  },
  rentalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  deposit: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  rentalDuration: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  durationButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    flex: 1,
    marginHorizontal: 4,
  },
  durationText: {
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  reserveButton: {
    backgroundColor: "#FF5722",
    padding: 14,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginRight: 8,
  },
  reserveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  addToCartButton: {
    backgroundColor: "#F5F5F5",
    padding: 14,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginLeft: 8,
  },
  addToCartText: {
    color: "#333",
    fontSize: 16,
  },
  specifications: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  specificationsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  specificationItem: {
    fontSize: 16,
    marginBottom: 4,
  },
});
