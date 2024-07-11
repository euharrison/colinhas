import { Platform } from "react-native";
import { Key } from "../config";
import { nonNullable } from "../utils";

export const KeySelector = ({
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
        { value: Key["Do#"], label: "Do♯ - ♯♯♯♯♯♯♯" },
        { value: Key["Fa#"], label: "Fa♯ - ♯♯♯♯♯♯" },
        { value: Key.Si, label: "Si - ♯♯♯♯♯" },
        { value: Key.Mi, label: "Mi - ♯♯♯♯" },
        { value: Key.La, label: "La - ♯♯♯" },
        { value: Key.Re, label: "Re - ♯♯" },
        { value: Key.Sol, label: "Sol - ♯" },
        { value: Key.Do, label: "Do" },
        { value: Key.Fa, label: "Fa - ♭" },
        { value: Key.Sib, label: "Si♭ - ♭♭" },
        { value: Key.Mib, label: "Mi♭ - ♭♭♭" },
        { value: Key.Lab, label: "La♭ - ♭♭♭♭" },
        { value: Key.Reb, label: "Re♭ - ♭♭♭♭♭" },
        { value: Key.Solb, label: "Sol♭ - ♭♭♭♭♭♭" },
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
