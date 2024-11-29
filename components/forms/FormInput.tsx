import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextInput, Text, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";

interface FormInputProps {
  name: string;
  label: string;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  multiline?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  keyboardType,
  multiline = false,
}) => {
  const theme = useTheme();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <View style={styles.container}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label={label}
            value={value ? value.toString() : ""}
            keyboardType={keyboardType}
            onChangeText={onChange}
            error={!!errors[name]}
            style={styles.input}
            underlineColor="#ccc"
            activeUnderlineColor={theme.colors.primary}
            multiline={multiline}
          />
        )}
      />
      {errors[name] && (
        <Text style={styles.error}>{errors[name]?.message as string}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  input: { backgroundColor: "white" },
  error: { color: "red", fontSize: 12 },
});

export default FormInput;
