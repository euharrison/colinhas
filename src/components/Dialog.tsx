import {
  ForwardedRef,
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useState,
} from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { CloseIcon } from "../icons/CloseIcon";
import { backgroundGray, modalOverlay, white } from "../theme/colors";
import { pagePadding } from "../theme/sizes";
import { KeyboardLayout } from "./KeyboardLayout";

export type DialogRef = {
  open: () => void;
  close: () => void;
};

export type DialogProps = {
  title: string;
  children: ReactNode;
};

export const openDialog = (ref: ForwardedRef<DialogRef>) => {
  if (ref && "current" in ref) {
    ref.current?.open();
  }
};

export const closeDialog = (ref: ForwardedRef<DialogRef>) => {
  if (ref && "current" in ref) {
    ref.current?.close();
  }
};

export const Dialog = forwardRef<DialogRef, DialogProps>(
  ({ title, children }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setIsVisible(true),
      close: () => setIsVisible(false),
    }));

    return (
      <Modal
        animationType="fade"
        transparent
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      >
        <KeyboardLayout>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 20,
            }}
          >
            <Pressable
              style={{
                backgroundColor: modalOverlay,
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              onPress={() => setIsVisible(false)}
            />
            <ScrollView
              style={{
                flexGrow: 0,
                maxHeight: "100%",
                width: "100%",
                maxWidth: 360,
              }}
              contentContainerStyle={{
                backgroundColor: white,
                borderRadius: 8,
                padding: pagePadding,
              }}
            >
              <Text style={{ fontSize: 20, marginBottom: 20 }}>{title}</Text>
              <Pressable
                style={({ pressed }) => ({
                  position: "absolute",
                  top: 10,
                  right: 10,
                  borderRadius: 999,
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "flex-end",
                  backgroundColor: pressed ? backgroundGray : undefined,
                })}
                onPress={() => setIsVisible(false)}
              >
                <CloseIcon />
              </Pressable>
              {children}
            </ScrollView>
          </View>
        </KeyboardLayout>
      </Modal>
    );
  },
);
