import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useFormContext, Controller } from "react-hook-form";
import { Menu, Button, useTheme, HelperText } from "react-native-paper";

interface FormSelectProps {
  name: string;
  label: string;
  options: Array<{ label: string; value: string | number }>;
  placeholder?: string;
  defaultValue?: string | number | null;
}

const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  options,
  placeholder = label,
  defaultValue = null,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | number | null>(
    defaultValue
  );
  const [anchorLayout, setAnchorLayout] = useState({ width: 0, height: 0 });

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleAnchorLayout = (event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setAnchorLayout({ width, height });
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
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <>
            <Menu
              contentStyle={{
                backgroundColor: "white",
              }}
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <TouchableOpacity
                  onLayout={handleAnchorLayout}
                  onPress={openMenu}
                >
                  <View
                    style={[
                      styles.input,
                      errors[name] && styles.errorBorder,
                      visible && {
                        borderColor: colors.primary,
                        borderBottomWidth: 2,
                      },
                    ]}
                  >
                    <Text style={styles.label}>{label}</Text>
                    <Text style={[styles.inputText]}>
                      {selectedValue
                        ? options.find(
                            (option) => option.value === selectedValue
                          )?.label
                        : placeholder}
                    </Text>
                  </View>
                </TouchableOpacity>
              }
              anchorPosition="bottom"
            >
              {options.map((option) => (
                <Menu.Item
                  title={option.label}
                  style={[
                    selectedValue === option.value && {
                      backgroundColor: colors.primary,
                    },
                    {
                      borderColor: colors.primary,
                      width: anchorLayout.width,
                      maxWidth: "auto",
                    },
                  ]}
                  key={option.value}
                  onPress={() => {
                    setSelectedValue(option.value);
                    onChange(option.value);
                    closeMenu();
                  }}
                  titleStyle={[
                    selectedValue === option.value && styles.selectedText,
                  ]}
                />
              ))}
            </Menu>
          </>
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
  label: {
    color: "#696969",
    fontSize: 12,
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
  inputText: {
    fontSize: 16,
    color: "black",
  },
  errorBorder: {
    borderBottomColor: "red",
  },
  error: {
    color: "red",
    fontSize: 12,
  },
  menuItem: {
    width: "100%",
  },
  selectedText: {
    color: "white",
    fontSize: 16,
  },
});

export default FormSelect;
