import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Text,
  HelperText,
  Button,
  Switch,
  IconButton,
  MD3Colors,
  useTheme,
} from "react-native-paper";
import { StyleSheet, View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

interface FormImageTrailerProps {
  name: string;
  label: string;
  placeholder?: string;
}

const FormImageTrailer: React.FC<FormImageTrailerProps> = ({
  name,
  label,
  placeholder = label,
}) => {
  const { colors } = useTheme();
  const {
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext();

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "livePhotos"],
      allowsEditing: true,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const images = result.assets.map((asset) => ({
        file_path: asset.uri,
        is_main: false,
      }));
      setValue(name, [...(getValues(name) || []), ...images]);
    }
  };

  const toggleMainImage = (index: number) => {
    const currentImages = getValues(name) || [];
    const updatedImages = currentImages.map((img: any, idx: number) => ({
      ...img,
      is_main: idx === index ? !img.is_main : false,
    }));
    setValue(name, updatedImages);
  };

  return (
    <View style={{ marginVertical: 4 }}>
      <Controller
        name={name}
        control={control}
        render={({ field: { value } }) => (
          <>
            {value?.length > 0 ? (
              value.map((image: any, index: number) => (
                <View key={index} style={styles.imageContainer}>
                  <IconButton
                    style={{
                      position: "absolute",
                      right: 5,
                      top: 5,
                      zIndex: 50,
                    }}
                    icon="window-close"
                    iconColor={colors.primary}
                    mode="contained"
                    size={15}
                    onPress={() => {
                      const updatedImages = value.filter(
                        (_: any, i: number) => i !== index
                      );
                      setValue(name, updatedImages);
                    }}
                  />
                  <Image
                    source={{ uri: image.file_path }}
                    style={styles.image}
                  />
                  <View style={styles.switchContainer}>
                    <Switch
                      value={image.is_main}
                      onValueChange={() => toggleMainImage(index)}
                    />
                    <Text>Сделать главным?</Text>
                  </View>
                </View>
              ))
            ) : (
              <Text style={{ textAlign: "center" }}>
                Изображения отсутствуют
              </Text>
            )}
            <Button style={{ borderRadius: 10 }} onPress={pickImageAsync}>
              Выбрать изображения
            </Button>
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
  imageContainer: {
    marginBottom: 8,
    alignItems: "center",
    position: "relative",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 8,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default FormImageTrailer;
