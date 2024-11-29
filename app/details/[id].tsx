import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "react-native-paper";
import {
  useGetTrailersQuery,
  useUpdateTrailerMutation,
} from "@/api/trailersApi";
import { trailerSchema } from "@/schemas/TrailerSchema";
import * as yup from "yup";
import { Stack, useLocalSearchParams } from "expo-router";
import { useRefresh } from "@/hooks/useRefresh";
import FormInput from "@/components/forms/FormInput";
import FormSelect from "@/components/forms/FormSelect";
import FormDatePicker from "@/components/forms/FormDatePicker";

type TrailerFormInputs = yup.InferType<typeof trailerSchema>;

export default function TrailerForm() {
  const { data = [], isLoading: isLoadingGet, refetch } = useGetTrailersQuery();
  const { refreshing, onRefresh } = useRefresh(refetch);
  const { id } = useLocalSearchParams();
  const [trailer, setTrailer] = useState<Trailer | null>(null);

  const methods = useForm<TrailerFormInputs>({
    resolver: yupResolver(trailerSchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    if (data.length > 0) {
      const selectedTrailer = data.find(
        (trailer) => trailer.id.toString() === id
      );
      if (selectedTrailer) {
        setTrailer(selectedTrailer);
        methods.reset({
          id: id as string,
          name: selectedTrailer.name,
          description: selectedTrailer.description,
          height: selectedTrailer.height,
          width: selectedTrailer.width,
          year_of_production: new Date(selectedTrailer.year_of_production),
          color: selectedTrailer.color,
          max_weight: selectedTrailer.max_weight,
          curb_weight: selectedTrailer.curb_weight,
          deposit: selectedTrailer.deposit,
          price_1: selectedTrailer.price_1,
          price_2: selectedTrailer.price_2,
          price_3: selectedTrailer.price_3,
          status: selectedTrailer.status,
        });
      }
    }
  }, [data]);

  const [updateTrailer, { isLoading }] = useUpdateTrailerMutation();

  const onSubmit = async (data: TrailerFormInputs) => {
    console.error(data);
    try {
      await updateTrailer({ id: trailer!.id, ...data } as Trailer).unwrap();
      alert("Данные успешно обновлены!");
    } catch (error) {
      console.error("Ошибка при обновлении данных:", error);
    }
  };

  return (
    <FormProvider {...methods}>
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
        <FormSelect
          name="status"
          label="Наличие прицепа"
          options={[
            { label: "В наличии ", value: "available" },
            { label: "Зарезервирован", value: "reserved" },
            { label: "Отсутствует", value: "unavailable" },
          ]}
        />
        <FormInput name="name" label="Название" />
        <FormInput
          name="height"
          label="Высота прицепа (в мм)"
          keyboardType="numeric"
        />
        <FormInput
          name="width"
          label="Ширина прицепа (в мм)"
          keyboardType="numeric"
        />
        <FormDatePicker name="year_of_production" label="Год выпуска" />
        <FormInput name="color" label="Цвет прицепа" />
        <FormInput
          name="max_weight"
          label="Максимальная масса (кг)"
          keyboardType="numeric"
        />
        <FormInput
          name="curb_weight"
          label="Масса в снаряженном состоянии (кг)"
          keyboardType="numeric"
        />
        <FormInput name="deposit" label="Залог (₽)" keyboardType="numeric" />
        <FormInput
          name="price_1"
          label="Цена от 1 до 2 суток (₽)"
          keyboardType="numeric"
        />
        <FormInput
          name="price_2"
          label="Цена от 3 до 6 суток (₽)"
          keyboardType="numeric"
        />
        <FormInput
          name="price_3"
          label="Цена от 7 суток (₽)"
          keyboardType="numeric"
        />
        <FormInput name="description" label="Описание" multiline={true} />
        <Button
          mode="contained"
          onPress={methods.handleSubmit(onSubmit)}
          loading={isLoading}
          style={styles.button}
        >
          Отправить
        </Button>
      </ScrollView>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    display: "flex",
  },
  error: {
    color: "red",
    fontSize: 12,
  },
  button: {
    marginVertical: 32,
    borderRadius: 10,
  },
});
