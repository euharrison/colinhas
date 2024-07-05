const inputMap = {
  // starting on 15 means the note C2 saving space for future low octaves
  15: ["do"],
  16: ["do♯", "do#", "re♭", "reb"],
  17: ["re"],
  18: ["re♯", "re#", "mi♭", "mib"],
  19: ["mi", "fa♭", "fab"],
  20: ["fa", "mi♯", "mi#"],
  21: ["fa♯", "fa#", "sol♭", "solb"],
  22: ["sol"],
  23: ["sol♯", "sol#", "la♭", "lab"],
  24: ["la"],
  25: ["la♯", "la#", "si♭", "sib"],
  26: ["si", "Do♭", "Dob"],
  27: ["Do", "si♯", "si#"],
  28: ["Do♯", "Do#", "Re♭", "Reb"],
  29: ["Re"],
  30: ["Re♯", "Re#", "Mi♭", "Mib"],
  31: ["Mi", "Fa♭", "Fab"],
  32: ["Fa", "Mi♯", "Mi#"],
  33: ["Fa♯", "Fa#", "Sol♭", "Solb"],
  34: ["Sol"],
  35: ["Sol♯", "Sol#", "La♭", "Lab"],
  36: ["La"],
  37: ["La♯", "La#", "Si♭", "Sib"],
  38: ["Si", "DO♭", "DOb", "DOB"],
  39: ["DO", "Si♯", "Si#"],
  40: ["DO♯", "DO#", "RE♭", "REb", "REB"],
  41: ["RE"],
  42: ["RE♯", "RE#", "MI♭", "MIb", "MIB"],
  43: ["MI", "FA♭", "FAb"],
  44: ["FA", "MI♯", "MI#"],
  45: ["FA♯", "FA#", "SOL♭", "SOLb", "SOLB"],
  46: ["SOL"],
  47: ["SOL♯", "SOL#", "LA♭", "LAb", "LAB"],
  48: ["LA"],
  49: ["LA♯", "LA#", "SI♭", "SIb", "SIB"],
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
    outputDictionary.flat[index] = options[0].includes("♯")
      ? options[2]
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

  return data.replaceAll(/[a-zA-Z#♯♭]+/g, (match) => {
    const inputIndex = inputDictionary[match];
    if (inputIndex === undefined) {
      return match;
    }
    const outputIndex = inputIndex + offset;
    const output = outputDictionary[accidental][outputIndex];
    return output ?? `{${match}?}`;
  });
};
