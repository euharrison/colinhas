import { ReactNode } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { CloseIcon } from "../icons/CloseIcon";
import { buttonFeedback, modalOverlay, white } from "../theme/colors";
import { pagePadding } from "../theme/sizes";
import { KeyboardLayout } from "./KeyboardLayout";

export const Dialog = ({
  title,
  children,
  visible,
  onRequestClose,
}: {
  title: string;
  children: ReactNode;
  visible: boolean;
  onRequestClose: () => void;
}) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <KeyboardLayout>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
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
            onPress={onRequestClose}
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Text style={{ fontSize: 20 }}>{title}</Text>
              <Pressable
                style={({ pressed }) => ({
                  width: 30,
                  height: 30,
                  borderRadius: 30,
                  borderWidth: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "flex-end",
                  backgroundColor: pressed ? buttonFeedback : undefined,
                })}
                onPress={onRequestClose}
              >
                <CloseIcon />
              </Pressable>
            </View>
            {children}
          </ScrollView>
        </View>
      </KeyboardLayout>
    </Modal>
  );
};
