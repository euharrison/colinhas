import { useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const SaveSheetModal = ({
  sheet,
  visible,
  onRequestClose,
}: {
  sheet: string;
  visible: boolean;
  onRequestClose: () => void;
}) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onRequestClose}
    >
      {/* TODO SafeAreaView não está funcionando no modal */}
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ padding: 20 }}>
          <View>
            <Pressable
              style={({ pressed }) => ({
                width: 40,
                height: 40,
                borderRadius: 20,
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
            <Text style={{ fontSize: 20 }}>Salvar</Text>
            <Text style={{ fontSize: 10, marginVertical: 20 }}>{sheet}</Text>

            <View style={{ gap: 16 }}>
              <View>
                <Text>Nome:</Text>
                <TextInput
                  style={{ padding: 8, borderWidth: 1, borderRadius: 4 }}
                  autoFocus
                  value={name}
                  onChangeText={setName}
                />
              </View>
              <View>
                <Text>Slug:</Text>
                <TextInput
                  style={{ padding: 8, borderWidth: 1, borderRadius: 4 }}
                  value={slug}
                  onChangeText={setSlug}
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
                onPress={() => {
                  //
                }}
              >
                <Text>Salvar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
