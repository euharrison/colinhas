import { Pressable, Text, View } from "react-native";
import { auth } from "../auth/auth";
import { Book } from "../database/types";
import { PencilIcon } from "../icons/PencilIcon";
import { PlusIcon } from "../icons/PlusIcon";
import { ResetIcon } from "../icons/ResetIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { TrashIcon } from "../icons/TrashIcon";
import { backgroundGray, borderGray, white } from "../theme/colors";
import { dropShadow } from "../theme/shadows";
import { headerHeight } from "../theme/sizes";
import { nonNullable } from "../utils";

export const BookMenu = ({
  book,
  isVisible,
  setIsVisible,
  isEditMode,
  setIsEditMode,
  onPressShare,
  onPressAppend,
  onPressChangeName,
  onPressDelete,
}: {
  book: Book;
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
  onPressShare: () => void;
  onPressAppend: () => void;
  onPressChangeName: () => void;
  onPressDelete: () => void;
}) => {
  if (!isVisible) {
    return <></>;
  }

  const options = [
    {
      label: "Compartilhar",
      icon: <ShareIcon width={16} />,
      onPress: onPressShare,
    },
  ];

  const hasEditPermission = book.userId === auth.currentUser?.uid;
  if (hasEditPermission) {
    options.push(
      {
        label: "Adicionar música",
        icon: <PlusIcon width={18} />,
        onPress: onPressAppend,
      },
      isEditMode
        ? {
            label: "Terminar edição",
            icon: <ResetIcon width={18} />,
            onPress: () => {
              setIsEditMode(false);
            },
          }
        : {
            label: "Editar",
            icon: <PencilIcon width={18} />,
            onPress: () => {
              setIsEditMode(true);
            },
          },
      {
        label: "Apagar",
        icon: <TrashIcon width={18} />,
        onPress: onPressDelete,
      },
    );
  }

  return (
    <>
      <Pressable
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        onPress={() => setIsVisible(false)}
      />
      <View
        style={{
          position: "absolute",
          right: 8,
          top: headerHeight,
          width: 200,
          borderWidth: 1,
          borderColor: borderGray,
          borderRadius: 8,
          paddingVertical: 8,
          backgroundColor: white,
          ...dropShadow,
        }}
      >
        {options.filter(nonNullable).map(({ label, icon, onPress }) => (
          <Pressable
            key={label}
            style={({ pressed }) => ({
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              paddingHorizontal: 16,
              paddingVertical: 8,
              backgroundColor: pressed ? backgroundGray : white,
            })}
            onPress={() => {
              onPress();
              setIsVisible(false);
            }}
          >
            <View style={{ width: 20, alignItems: "center" }}>{icon}</View>
            <Text style={{ fontSize: 16 }}>{label}</Text>
          </Pressable>
        ))}
      </View>
    </>
  );
};
