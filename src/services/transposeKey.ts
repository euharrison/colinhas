import { KeySignatures } from "../config";

const orderedKeys = [
  KeySignatures.Dob,
  KeySignatures.Solb,
  KeySignatures.Reb,
  KeySignatures.Lab,
  KeySignatures.Mib,
  KeySignatures.Sib,
  KeySignatures.Fa,
  KeySignatures.Do,
  KeySignatures.Sol,
  KeySignatures.Re,
  KeySignatures.La,
  KeySignatures.Mi,
  KeySignatures.Si,
  KeySignatures["Fa#"],
  KeySignatures["Do#"],
];

export const transposeKey = (key: string, offset: number) => {
  const index = orderedKeys.findIndex((v) => v === key);
  return orderedKeys[index + offset];
};
