import { Link, router } from "expo-router";
import { forwardRef, useState } from "react";
import { Platform, Text, TextInput, View } from "react-native";
import { createSheet, editSheet } from "../database/sheets";
import { Sheet } from "../database/types";
import { alert } from "../services/alert";
import { sheetUrl, termsUrl } from "../urls";
import { AuthGate } from "./AuthGate";
import { Button } from "./Button";
import { Disclaimer } from "./Disclaimer";
import { KeySelector } from "./KeySelector";
import { Dialog, DialogRef } from "./Dialog";

export const SaveSheetForm = forwardRef<
  DialogRef,
  {
    id?: string;
    defaultValues: Pick<Sheet, "name" | "data" | "instrument" | "key">;
  }
>(({ id, defaultValues }, ref) => {
  const [name, setName] = useState(defaultValues.name);
  const [key, setKey] = useState(defaultValues.key);

  return (
    <Dialog ref={ref} title="Salvar">
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
          <Disclaimer>
            Todas as colas são públicas e visíveis por todos. Não viole os{" "}
            <Link href={termsUrl} target="_blank">
              <Text style={{ textDecorationLine: "underline" }}>
                termos de uso
              </Text>
            </Link>
            .
          </Disclaimer>
          <Button
            onPress={async () => {
              try {
                const payload = {
                  ...defaultValues,
                  name,
                  key,
                };
                const redirectId = id
                  ? editSheet(id, payload)
                  : createSheet(payload);
                router.replace(
                  sheetUrl({ id: redirectId, name: payload.name }),
                );
              } catch (error) {
                alert(String(error));
              }
            }}
          >
            Salvar
          </Button>
        </View>
      </AuthGate>
    </Dialog>
  );
});
