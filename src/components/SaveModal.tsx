import { useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";
import { createSheet } from "../database/createSheet";
import { editSheet } from "../database/editSheet";
import { Sheet } from "../database/types";
import { useInstrument } from "../hooks/useInstrument";
import { alert } from "../services/alert";
import { dismissAll } from "../services/navigation";
import { AuthGate } from "./AuthGate";
import { KeyboardLayout } from "./KeyboardLayout";

export const SaveModal = ({
  sheet,
  data,
  visible,
  onRequestClose,
}: {
  sheet?: Sheet;
  data: string;
  visible: boolean;
  onRequestClose: () => void;
}) => {
  const [name, setName] = useState(sheet?.name ?? "");
  const [saving, setSaving] = useState(false);

  const instrument = useInstrument();

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
              backgroundColor: "#00000077",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            onPress={onRequestClose}
          />
          <View
            style={{
              width: 300,
              backgroundColor: "white",
              borderRadius: 8,
              padding: 20,
              gap: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20 }}>Salvar</Text>
              <Pressable
                style={({ pressed }) => ({
                  width: 30,
                  height: 30,
                  borderRadius: 30,
                  borderWidth: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "flex-end",
                  backgroundColor: pressed ? "#ccc" : undefined,
                })}
                onPress={onRequestClose}
              >
                <Text>X</Text>
              </Pressable>
            </View>
            <AuthGate>
              <View style={{ gap: 16 }}>
                <View>
                  <Text>Nome:</Text>
                  <TextInput
                    style={{ padding: 8, borderWidth: 1, borderRadius: 4 }}
                    autoComplete="off"
                    autoCorrect={false}
                    autoFocus
                    value={name}
                    onChangeText={setName}
                  />
                </View>
                <Pressable
                  style={({ pressed }) => ({
                    marginTop: 16,
                    padding: 8,
                    borderRadius: 4,
                    borderWidth: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: pressed ? "#ccc" : undefined,
                  })}
                  disabled={saving}
                  onPress={async () => {
                    setSaving(true);
                    try {
                      if (sheet?.id) {
                        await editSheet(sheet.id, { name, data, instrument });
                      } else {
                        await createSheet({ name, data, instrument });
                      }
                    } catch (error) {
                      alert(String(error));
                    }
                    dismissAll();
                    setSaving(false);
                  }}
                >
                  <Text>{saving ? "Salvando..." : "Salvar"}</Text>
                </Pressable>
              </View>
            </AuthGate>
          </View>
        </View>
      </KeyboardLayout>
    </Modal>
  );
};
