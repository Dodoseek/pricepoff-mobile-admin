import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "react-native-paper";
import {
  useCreateTrailerMutation,
  useDeleteTrailerMutation,
  useUpdateTrailerMutation,
} from "@/api/trailersApi";
import { trailerSchema } from "@/schemas/TrailerSchema";
import * as yup from "yup";
import FormInput from "@/components/forms/FormInput";
import FormSelect from "@/components/forms/FormSelect";
import FormDatePicker from "@/components/forms/FormDatePicker";
import showAlert from "@/services/showAlert";
import { useRouter } from "expo-router";
import TrailerDeleteDialog from "./TrailerDeleteDialog";

type TrailerFormInputs = yup.InferType<typeof trailerSchema>;

export default function TrailerForm({
  trailer = undefined,
}: {
  trailer?: Trailer | undefined;
}) {
  const methods = useForm<TrailerFormInputs>({
    resolver: yupResolver(trailerSchema),
    mode: "onSubmit",
  });

  const router = useRouter();

  useEffect(() => {
    if (trailer) {
      methods.reset({
        id: trailer.id as string,
        name: trailer.name,
        description: trailer.description,
        height: trailer.height,
        width: trailer.width,
        year_of_production: new Date(trailer.year_of_production),
        color: trailer.color,
        max_weight: trailer.max_weight,
        curb_weight: trailer.curb_weight,
        deposit: trailer.deposit,
        price_1: trailer.price_1,
        price_2: trailer.price_2,
        price_3: trailer.price_3,
        status: trailer.status,
      });
    }
  }, [trailer]);

  const [updateTrailer, { isLoading: isLoadingUpdate }] =
    useUpdateTrailerMutation();
  const [createTrailer, { isLoading: isLoadingCreate }] =
    useCreateTrailerMutation();

  const onSubmit = async (data: TrailerFormInputs) => {
    const trailer_data = {
      ...data,
      year_of_production: data.year_of_production.toISOString().split("T")[0],
    };

    try {
      const trailerAction = trailer_data.id ? updateTrailer : createTrailer;
      const actionMessage = trailer_data.id ? "обновлены" : "сохранены";

      await trailerAction({
        id: trailer_data.id,
        ...trailer_data,
      } as Trailer).unwrap();

      showAlert("Успешный успех!", `Данные успешно ${actionMessage}`, () => {
        router.push({ pathname: "/" });
      });
    } catch (error) {
      console.error("Ошибка при обработке данных:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <View style={{ marginBottom: 30 }}>
        <FormSelect
          name="status"
          label="Наличие прицепа"
          defaultValue={trailer?.status}
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
          loading={isLoadingUpdate || isLoadingCreate}
          style={[styles.button, { marginVertical: 4, marginTop: 20 }]}
        >
          {trailer && trailer.id ? "Обновить данные" : "Сохранить прицеп"}
        </Button>
        {trailer && trailer.id && <TrailerDeleteDialog trailer={trailer} />}
      </View>
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
    borderRadius: 10,
  },
});
function alert(arg0: string) {
  throw new Error("Function not implemented.");
}
