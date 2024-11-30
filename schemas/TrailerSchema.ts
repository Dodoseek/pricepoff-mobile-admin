import * as yup from "yup";

export const trailerSchema = yup.object().shape({
  id: yup.string().notRequired().nullable(),
  name: yup
    .string()
    .max(200, "Название слишком длинное")
    .required("Название обязательно")
    .typeError("Ошибка типа данных"),
  description: yup
    .string()
    .required("Описание обязательно")
    .typeError("Ошибка типа данных"),
  height: yup
    .number()
    .min(0, "Высота должна быть положительным числом")
    .integer("Высота должна быть целым числом")
    .required("Высота обязательна")
    .typeError("Ошибка типа данных"),
  width: yup
    .number()
    .min(0, "Ширина должна быть положительным числом")
    .integer("Ширина должна быть целым числом")
    .required("Ширина обязательна")
    .typeError("Ошибка типа данных"),
  year_of_production: yup
    .date()
    .required("Год производства обязателен")
    .typeError("Некорректная дата"),
  color: yup
    .string()
    .max(120, "Цвет слишком длинный")
    .required("Цвет обязателен")
    .typeError("Ошибка типа данных"),
  max_weight: yup
    .number()
    .min(0, "Максимальная масса должна быть положительной")
    .integer("Максимальная масса должна быть целым числом")
    .required("Максимальная масса обязательна")
    .typeError("Ошибка типа данных"),
  curb_weight: yup
    .number()
    .min(0, "Масса должна быть положительной")
    .integer("Масса должна быть целым числом")
    .required("Масса обязательна")
    .typeError("Ошибка типа данных"),
  deposit: yup
    .number()
    .min(0, "Залог должен быть положительным")
    .integer("Залог должен быть целым числом")
    .required("Залог обязателен")
    .typeError("Ошибка типа данных"),
  price_1: yup
    .number()
    .required("Базовая цена обязательна")
    .integer("Цена должна быть целым числом")
    .typeError("Ошибка типа данных"),
  price_2: yup
    .number()
    .integer("Цена должна быть целым числом")
    .required("Цена от 3 суток обязательна")
    .typeError("Ошибка типа данных"),
  price_3: yup
    .number()
    .integer("Цена должна быть целым числом")
    .required("Цена от 7 суток обязательна")
    .typeError("Ошибка типа данных"),
  status: yup
    .string()
    .oneOf(["available", "reserved", "unavailable"], "Некорректный статус")
    .required("Статус обязателен")
    .typeError("Ошибка типа данных"),
});
