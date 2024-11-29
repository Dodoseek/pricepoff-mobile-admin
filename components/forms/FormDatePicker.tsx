import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme, HelperText, TextInput } from "react-native-paper";

interface FormDatePickerProps {
  name: string;
  label: string;
}

const FormDatePicker: React.FC<FormDatePickerProps> = ({ name, label }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const theme = useTheme();
  const [isPickerVisible, setPickerVisible] = useState(false);

  const showPicker = () => setPickerVisible(true);
  const hidePicker = () => setPickerVisible(false);

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-GB"); // Формат DD/MM/YYYY
  };

  return (
    <View
      style={{
        marginVertical: 4,
      }}
    >
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <TouchableOpacity onPress={showPicker}>
              <TextInput
                label={label}
                value={value ? formatDate(new Date(value)) : ""}
                style={styles.input}
                editable={false}
                error={!!errors[name]}
                underlineColor="#ccc"
                activeUnderlineColor={theme.colors.primary}
                right={<TextInput.Icon icon="calendar" />}
              />
            </TouchableOpacity>

            {isPickerVisible && (
              <DateTimePicker
                value={value ? new Date(value) : new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(event, selectedDate) => {
                  hidePicker();
                  if (selectedDate) onChange(selectedDate.toISOString());
                }}
              />
            )}
            {errors[name] && (
              <HelperText type="error" visible={!!errors[name]}>
                {errors[name]?.message as string}
              </HelperText>
            )}
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: { backgroundColor: "white" },
});

export default FormDatePicker;
