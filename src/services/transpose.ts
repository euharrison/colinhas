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
  26: ["si", "Dob", "Do♭"],
  27: ["Do", "si#"],
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
  38: ["Si", "DOb", "DOB", "DO♭"],
  39: ["DO", "Si#"],
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
  flat: Record<number, string>;
  sharp: Record<number, string>;
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
    outputDictionary.flat[index] = options[0].includes("#")
      ? options[1]
      : options[0];
  });
};
buildDictionaries();

export const transpose = (
  data: string,
  offset: number,
  accidental: "sharp" | "flat",
) => {
  if (offset === 0) {
    return data;
  }

  return data.replaceAll(/[a-zA-Z#♭]+/g, (match) => {
    const inputIndex = inputDictionary[match];
    if (inputIndex === undefined) {
      return match;
    }
    const outputIndex = inputIndex + offset;
    const output = outputDictionary[accidental][outputIndex];
    return output ?? `{${match}?}`;
  });
};
