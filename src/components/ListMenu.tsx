import {
  ForwardedRef,
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useState,
} from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { backgroundGray, borderGray, white } from "../theme/colors";
import { dropShadow } from "../theme/shadows";
import { headerHeight } from "../theme/sizes";

export type ListMenuItem = {
  label: string;
  icon: ReactNode;
  onPress: () => void;
};

export type ListMenuRef = {
  open: () => void;
  close: () => void;
};

export type ListMenuProps = {
  options: ListMenuItem[];
};

export const openListMenu = (ref: ForwardedRef<ListMenuRef>) => {
  if (ref && "current" in ref) {
    ref.current?.open();
  }
};

export const closeListMenu = (ref: ForwardedRef<ListMenuRef>) => {
  if (ref && "current" in ref) {
    ref.current?.close();
  }
};

export const ListMenu = forwardRef<ListMenuRef, ListMenuProps>(
  ({ options }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setIsVisible(true),
      close: () => setIsVisible(false),
    }));

    return (
      <Modal
        animationType="none"
        transparent
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      >
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
            {options.map(({ label, icon, onPress }) => (
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
      </Modal>
    );
  },
);
