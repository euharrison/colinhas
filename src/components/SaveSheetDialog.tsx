import { Link, router } from "expo-router";
import { forwardRef, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { createSheet, editSheet } from "../database/sheets";
import { Sheet } from "../database/types";
import { alert } from "../services/alert";
import { borderGray } from "../theme/colors";
import { sheetUrl, termsUrl } from "../urls";
import { AuthGate } from "./AuthGate";
import { Button } from "./Button";
import { Dialog, DialogRef } from "./Dialog";
import { Disclaimer } from "./Disclaimer";
import { KeySelector } from "./KeySelector";

type Props = {
  id?: string;
  defaultValues: Pick<Sheet, "name" | "data" | "instrument" | "key">;
};

const SaveSheetForm = ({ id, defaultValues }: Props) => {
  const [name, setName] = useState(defaultValues.name);
  const [key, setKey] = useState(defaultValues.key);

  return (
    <View style={{ gap: 16 }}>
      <View>
        <Text>Nome:</Text>
        <TextInput
          style={{
            padding: 8,
            borderWidth: 1,
            borderColor: borderGray,
            borderRadius: 8,
          }}
          autoComplete="off"
          autoCorrect={false}
          autoFocus
          value={name}
          onChangeText={setName}
        />
      </View>
      <View>
        <Text>Tom:</Text>
        <KeySelector onChange={(v) => setKey(v)}>
          <Text
            style={{
              padding: 8,
              borderWidth: 1,
              borderColor: borderGray,
              borderRadius: 8,
            }}
          >
            <Text>{key}</Text>
          </Text>
        </KeySelector>
      </View>
      <Disclaimer>
        Todas as colas são públicas e visíveis por todos. Não viole os{" "}
        <Link href={termsUrl} target="_blank">
          <Text style={{ textDecorationLine: "underline" }}>termos de uso</Text>
        </Link>
        .
      </Disclaimer>
      <Button
        onPress={async () => {
          try {
            if (!name) {
              throw new Error("Dê um nome para sua cola");
            }
            const payload = {
              ...defaultValues,
              name,
              key,
            };
            const redirectId = id
              ? editSheet(id, payload)
              : createSheet(payload);
            router.replace(sheetUrl({ id: redirectId, name: payload.name }));
          } catch (error) {
            alert(String(error));
          }
        }}
      >
        Salvar
      </Button>
    </View>
  );
};

export const SaveSheetDialog = forwardRef<DialogRef, Props>(
  ({ id, defaultValues }, ref) => {
    return (
      <Dialog ref={ref} title="Salvar">
        <AuthGate>
          <SaveSheetForm id={id} defaultValues={defaultValues} />
        </AuthGate>
      </Dialog>
    );
  },
);
