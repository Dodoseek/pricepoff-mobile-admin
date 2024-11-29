import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextInput, Text, useTheme, HelperText } from "react-native-paper";
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
    <View
      style={{
        marginVertical: 4,
      }}
    >
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label={label}
            value={
              value !== undefined && value !== null ? value.toString() : ""
            }
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
        <HelperText type="error" visible={!!errors[name]}>
          {errors[name]?.message as string}
        </HelperText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: { backgroundColor: "white" },
  error: { color: "red", fontSize: 12 },
});

export default FormInput;
