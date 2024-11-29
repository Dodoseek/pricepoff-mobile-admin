import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useFormContext, Controller } from "react-hook-form";
import { Dropdown } from "react-native-element-dropdown";
import { useTheme } from "react-native-paper";

interface FormSelectProps {
  name: string;
  label: string;
  options: Array<{ label: string; value: string | number }>;
  placeholder?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  options,
  placeholder = "Выберите значение",
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [isFocused, setIsFocused] = useState(false);
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, isFocused && { color: colors.primary }]}>
        {label}
      </Text>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Dropdown
            style={[
              styles.input,
              errors[name] && styles.errorBorder,
              isFocused && {
                borderBottomColor: colors.primary,
                borderBottomWidth: 2,
              },
            ]}
            data={options}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={placeholder}
            value={value}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(item) => onChange(item.value)}
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
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 4,
    fontSize: 16,
  },
  input: {
    backgroundColor: "white",
    borderBottomColor: "#ccc",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0.5,
    borderRadius: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    paddingHorizontal: 8,
    height: 56,
    justifyContent: "center",
    paddingLeft: 16,
    paddingRight: 16,
  },
  errorBorder: {
    borderBottomColor: "red",
  },
  error: {
    color: "red",
    fontSize: 12,
  },
});

export default FormSelect;
