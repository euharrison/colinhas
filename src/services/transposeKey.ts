import { Key } from "../config";

const orderedKeys = [
  Key.Dob,
  Key.Solb,
  Key.Reb,
  Key.Lab,
  Key.Mib,
  Key.Sib,
  Key.Fa,
  Key.Do,
  Key.Sol,
  Key.Re,
  Key.La,
  Key.Mi,
  Key.Si,
  Key["Fa#"],
  Key["Do#"],
];

export const transposeKey = (key: string, offset: number) => {
  const index = orderedKeys.findIndex((v) => v === key);
  return orderedKeys[index + offset];
};
