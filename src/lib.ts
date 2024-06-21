import { Accidental } from "./types";

const inputMap = {
  // starting on 15 means the note C2 saving space for future low octaves
  15: ["do"],
  16: ["do#", "reb", "re♭"],
  17: ["re"],
  18: ["re#", "mib", "mi♭"],
  19: ["mi"],
  20: ["fa"],
  21: ["fa#", "solb", "sol♭"],
  22: ["sol"],
  23: ["sol#", "lab", "la♭"],
  24: ["la"],
  25: ["la#", "sib", "si♭"],
  26: ["si"],
  27: ["Do"],
  28: ["Do#", "Reb", "Re♭"],
  29: ["Re"],
  30: ["Re#", "Mib", "Mi♭"],
  31: ["Mi"],
  32: ["Fa"],
  33: ["Fa#", "Solb", "Sol♭"],
  34: ["Sol"],
  35: ["Sol#", "Lab", "La♭"],
  36: ["La"],
  37: ["La#", "Sib", "Si♭"],
  38: ["Si"],
  39: ["DO"],
  40: ["DO#", "REb", "REB", "RE♭"],
  41: ["RE"],
  42: ["RE#", "MIb", "MIB", "MI♭"],
  43: ["MI"],
  44: ["FA"],
  45: ["FA#", "SOLb", "SOLB", "SOL♭"],
  46: ["SOL"],
  47: ["SOL#", "LAb", "LAB", "LA♭"],
  48: ["LA"],
  49: ["LA#", "SIb", "SIB", "SI♭"],
  50: ["SI"],
};

const inputDictionary: Record<string, number> = {};

const outputDictionary: {
  flat: Record<string, string>;
  sharp: Record<string, string>;
} = {
  flat: {},
  sharp: {},
};

const buildDictionaries = () => {
  Object.entries(inputMap).forEach(([id, options]) => {
    const index = Number(id);

    // input
    options.forEach((option) => {
      inputDictionary[option] = index;
    });

    // output
    outputDictionary.sharp[index] = options[0];
    outputDictionary.flat[index] =
      options.find((o) => o.includes("b")) || options[0];
  });
};
buildDictionaries();

export const getSheet = (value: string, offset: number) =>
  value.replaceAll(/[a-zA-Z#♭]+/g, (match) => {
    return inputDictionary[match]
      ? String(inputDictionary[match] + offset)
      : match;
  });

export const getOutput = (
  sheet: string,
  offset: number,
  accidental: Accidental,
) =>
  sheet.replaceAll(/\d+/g, (match) => {
    const index = Number(match) - offset;
    return outputDictionary[accidental][index] ?? match;
  });
