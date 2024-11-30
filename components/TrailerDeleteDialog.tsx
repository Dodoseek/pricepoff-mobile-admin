import React, { useState } from "react";
import { Button, Dialog, Portal, Text, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import { useDeleteTrailerMutation } from "@/api/trailersApi";
import showAlert from "@/services/showAlert";

export default function TrailerDeleteDialog({
  trailer,
}: {
  trailer?: Trailer;
}) {
  const [visible, setVisible] = useState(false);
  const [deleteTrailer, { isLoading: isLoadingDelete }] =
    useDeleteTrailerMutation();
  const router = useRouter();

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const { colors } = useTheme();

  const handleDelete = async () => {
    try {
      await deleteTrailer(trailer!.id).unwrap();
      showAlert("Успешный успех!", `Данные успешно удалены`, () => {
        router.push({ pathname: "/" });
      });
    } catch (error) {
      console.error("Ошибка при удалении трейлера:", error);
    } finally {
      hideDialog();
    }
  };

  return (
    <>
      <Button
        mode="contained"
        style={{ backgroundColor: "red", marginVertical: 4, borderRadius: 10 }}
        onPress={showDialog}
        loading={isLoadingDelete}
      >
        Удалить прицеп
      </Button>

      <Portal>
        <Dialog
          style={{ backgroundColor: "white", borderRadius: 10 }}
          visible={visible}
          onDismiss={hideDialog}
        >
          <Dialog.Title>Подтверждение удаления</Dialog.Title>
          <Dialog.Content>
            <Text>Вы уверены, что хотите удалить этот прицеп?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Отмена</Button>
            <Button
              onPress={handleDelete}
              style={{
                backgroundColor: colors.primary,
                borderRadius: 10,
                paddingHorizontal: 5,
              }}
              textColor="white"
            >
              Удалить
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}
