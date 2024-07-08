import { useState } from "react";
import { Platform, Pressable, Text, TextInput, View } from "react-native";
import { Instrument, KeySignatures } from "../config";
import { createSheet, editSheet } from "../database/sheet";
import { Sheet } from "../database/types";
import { alert } from "../services/alert";
import { dismissAll } from "../services/navigation";
import { buttonFeedback } from "../theme/colors";
import { AuthGate } from "./AuthGate";

export const SaveSheetForm = ({
  id,
  defaultValues,
}: {
  id?: string;
  defaultValues: Partial<Sheet>;
}) => {
  const [name, setName] = useState(defaultValues?.name ?? "");
  const [keySignature, setKeySignature] = useState(
    defaultValues?.keySignature ?? "",
  );
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
            <select
              style={{ padding: 8 }}
              value={keySignature}
              onChange={(e) => setKeySignature(e.currentTarget.value)}
            >
              {[
                { value: KeySignatures["Do#"], label: "Do♯ - ♯♯♯♯♯♯♯" },
                { value: KeySignatures["Fa#"], label: "Fa♯ - ♯♯♯♯♯♯" },
                { value: KeySignatures.Si, label: "Si - ♯♯♯♯♯" },
                { value: KeySignatures.Mi, label: "Mi - ♯♯♯♯" },
                { value: KeySignatures.La, label: "La - ♯♯♯" },
                { value: KeySignatures.Re, label: "Re - ♯♯" },
                { value: KeySignatures.Sol, label: "Sol - ♯" },
                { value: KeySignatures.Do, label: "Do" },
                { value: KeySignatures.Fa, label: "Fa - ♭" },
                { value: KeySignatures.Sib, label: "Si♭ - ♭♭" },
                { value: KeySignatures.Mib, label: "Mi♭ - ♭♭♭" },
                { value: KeySignatures.Lab, label: "La♭ - ♭♭♭♭" },
                { value: KeySignatures.Reb, label: "Re♭ - ♭♭♭♭♭" },
                { value: KeySignatures.Solb, label: "Sol♭ - ♭♭♭♭♭♭" },
                { value: "", label: "Não especificado" },
              ].map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </View>
        )}
        {Platform.OS === "web" && (
          <View>
            <Text>Instrumento:</Text>
            <select
              style={{ padding: 8 }}
              value={instrument}
              onChange={(e) => setInstrument(e.currentTarget.value)}
            >
              {[
                { value: Instrument.Sax, label: "Sax" },
                { value: Instrument.Trumpet, label: "Trompete" },
                { value: Instrument.Trombone, label: "Trombone" },
                { value: Instrument.Tuba, label: "Tuba" },
                { value: "", label: "Não especificado" },
              ].map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
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
                keySignature,
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
