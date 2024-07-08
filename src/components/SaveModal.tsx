import { useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { Instrument, KeySignatures } from "../config";
import { createSheet, editSheet } from "../database/sheet";
import { Sheet } from "../database/types";
import { useInstrument } from "../hooks/useInstrument";
import { CloseIcon } from "../icons/CloseIcon";
import { alert } from "../services/alert";
import { dismissAll } from "../services/navigation";
import { buttonFeedback, modalOverlay, white } from "../theme/colors";
import { pagePadding } from "../theme/sizes";
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
  const defaultInstrument = useInstrument();

  const [name, setName] = useState(sheet?.name || "");
  const [keySignature, setKeySignature] = useState(
    sheet?.keySignature || KeySignatures.Do,
  );
  const [instrument, setInstrument] = useState(
    sheet?.instrument || defaultInstrument,
  );

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
          <View
            style={{
              width: 300,
              backgroundColor: white,
              borderRadius: 8,
              padding: pagePadding,
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
                  backgroundColor: pressed ? buttonFeedback : undefined,
                })}
                onPress={onRequestClose}
              >
                <CloseIcon />
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
                        name,
                        data,
                        instrument,
                        keySignature,
                      };
                      if (sheet?.id) {
                        editSheet(sheet.id, payload);
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
          </View>
        </View>
      </KeyboardLayout>
    </Modal>
  );
};
