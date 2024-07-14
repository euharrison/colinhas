import { Pressable, Text, View } from "react-native";
import { auth } from "../auth/auth";
import { Sheet } from "../database/types";
import { PencilIcon } from "../icons/PencilIcon";
import { ResetIcon } from "../icons/ResetIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { TrashIcon } from "../icons/TrashIcon";
import { backgroundGray, black, white } from "../theme/colors";
import { dropShadow } from "../theme/shadows";
import { headerHeight } from "../theme/sizes";
import { nonNullable } from "../utils";

export const SheetMenu = ({
  sheet,
  isVisible,
  setIsVisible,
  isEditMode,
  setIsEditMode,
  onPressShare,
  onPressDelete,
}: {
  sheet: Sheet;
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
  onPressShare: () => void;
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

  const hasEditPermission = sheet.userId === auth.currentUser?.uid;
  if (hasEditPermission) {
    if (isEditMode) {
      options.push({
        label: "Cancelar edição",
        icon: <ResetIcon width={18} />,
        onPress: () => {
          setIsEditMode(false);
        },
      });
    } else {
      options.push({
        label: "Editar",
        icon: <PencilIcon width={18} />,
        onPress: () => {
          setIsEditMode(true);
        },
      });
    }

    options.push({
      label: "Apagar",
      icon: <TrashIcon width={18} />,
      onPress: onPressDelete,
    });
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
          right: 0,
          top: headerHeight,
          width: 200,
          borderWidth: 1,
          borderColor: black,
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
