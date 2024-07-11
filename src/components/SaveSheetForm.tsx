import { useState } from "react";
import { Platform, Pressable, Text, TextInput, View } from "react-native";
import { Instrument } from "../config";
import { createSheet, editSheet } from "../database/sheet";
import { Sheet } from "../database/types";
import { alert } from "../services/alert";
import { dismissAll } from "../services/navigation";
import { buttonFeedback } from "../theme/colors";
import { AuthGate } from "./AuthGate";
import { KeySelector } from "./KeySelector";

export const SaveSheetForm = ({
  id,
  defaultValues,
}: {
  id?: string;
  defaultValues: Partial<Sheet>;
}) => {
  const [name, setName] = useState(defaultValues?.name ?? "");
  const [key, setKey] = useState(defaultValues?.key ?? "");
  const [instrument, setInstrument] = useState(defaultValues?.instrument ?? "");

  return (
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
        {Platform.OS === "web" && (
          <View>
            <Text>Tom:</Text>
            <KeySelector value={key} onChange={(v) => setKey(v)} />
          </View>
        )}
        <Pressable
          style={({ pressed }) => ({
            marginTop: 16,
            padding: 8,
            borderRadius: 4,
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: pressed ? buttonFeedback : undefined,
          })}
          onPress={async () => {
            try {
              const payload = {
                ...defaultValues,
                name,
                instrument,
                key,
              };
              if (id) {
                editSheet(id, payload);
              } else {
                createSheet(payload);
              }
              dismissAll();
            } catch (error) {
              alert(String(error));
            }
          }}
        >
          <Text>Salvar</Text>
        </Pressable>
      </View>
    </AuthGate>
  );
};
