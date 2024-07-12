import { Link } from "expo-router";
import { useState } from "react";
import { Platform, Pressable, Text, TextInput, View } from "react-native";
import { createSheet, editSheet } from "../database/sheet";
import { Sheet } from "../database/types";
import { alert } from "../services/alert";
import { dismissAll } from "../services/navigation";
import { buttonFeedback, backgroundGray, textGray } from "../theme/colors";
import { termsUrl } from "../urls";
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
        <View
          style={{
            backgroundColor: backgroundGray,
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 4,
          }}
        >
          <Text style={{ color: textGray, fontStyle: "italic" }}>
            Todas as colas são públicas e visíveis por todos. Não viole os{" "}
            <Link href={termsUrl} target="_blank">
              <Text style={{ textDecorationLine: "underline" }}>
                termos de uso
              </Text>
            </Link>
            .
          </Text>
        </View>
        <Pressable
          style={({ pressed }) => ({
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
