import { Platform } from "react-native";
import { KeySignatures } from "../config";
import { nonNullable } from "../utils";

export const KeySignatureSelect = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  // TODO native platform
  if (Platform.OS !== "web") {
    return null;
  }
  return (
    <select
      style={{ padding: 8 }}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
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
      ]
        .filter(nonNullable)
        .map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
    </select>
  );
};
