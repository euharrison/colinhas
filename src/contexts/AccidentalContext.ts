import { createContext } from "react";

export type Accidental = "sharp" | "flat";

export const defaultAccidental: Accidental = "sharp";

export const AccidentalContext = createContext<{
  accidental: Accidental;
  updateAccidental: (value: Accidental) => void;
}>({
  accidental: defaultAccidental,
  updateAccidental: () => {},
});
