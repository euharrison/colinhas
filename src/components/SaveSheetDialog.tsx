import { Link, router } from "expo-router";
import { forwardRef, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { createSheet, editSheet } from "../database/sheets";
import { Key, Sheet } from "../database/types";
import { alert } from "../services/alert";
import { borderGray, textGray } from "../theme/colors";
import { termsUrl, viewSheetUrl } from "../urls";
import { AuthGate } from "./AuthGate";
import { Button } from "./Button";
import { Checkbox } from "./Checkbox";
import { Dialog, DialogRef } from "./Dialog";
import { Disclaimer } from "./Disclaimer";
import { KeySelector } from "./KeySelector";

type Props = {
  id?: string;
  defaultValues: Pick<Sheet, "name" | "data" | "instrument" | "key">;
};

const SaveSheetForm = ({ id, defaultValues }: Props) => {
  const [name, setName] = useState(defaultValues.name);
  const [key, setKey] = useState<Key | undefined>(defaultValues.key);
  const [unlisted, setUnlisted] = useState<boolean>(false);

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
            <Text>{key ?? "Desconhecido"}</Text>
          </Text>
        </KeySelector>
      </View>

      <View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Checkbox
            label="Não listado"
            value={unlisted}
            onChange={(v) => setUnlisted(v)}
          />
        </View>
        <Text
          style={{
            color: textGray,
            fontStyle: "italic",
            fontSize: 12,
            marginTop: 2,
            marginLeft: 2,
          }}
        >
          Músicas serão visíveis para todos, a menos que você marque "Não
          listado". Nesse caso, só serão visíveis para você e quem possuir o
          link de compartilhamento.
        </Text>
      </View>

      <Disclaimer>
        Não viole os{" "}
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
              unlisted,
            };
            const redirectId = id
              ? editSheet(id, payload)
              : createSheet(payload);
            router.replace(
              viewSheetUrl({ id: redirectId, name: payload.name }),
            );
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
