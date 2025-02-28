import { Accidental } from "../database/types";

const inputMap = {
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
  //
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
  //
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

const allIndexes = Object.keys(inputMap);
const firstIndex = Number(allIndexes[0]);
const lastIndex = Number(allIndexes.at(-1));

export const transpose = (
  data: string,
  offset: number,
  accidental: Accidental,
) => {
  if (offset === 0) {
    return data;
  }

  const transposeNote = (note: string) => {
    const index = inputDictionary[note];
    if (index) {
      let outputIndex = index + offset;
      // se o output index for fora do dicionário, sobe ou desce
      // uma oitava para pelo menos indicar a transposição certa
      if (outputIndex < firstIndex) {
        outputIndex += 12;
      }
      if (outputIndex > lastIndex) {
        outputIndex -= 12;
      }
      const output = outputDictionary[accidental][outputIndex];
      return output ?? `{${note}?}`;
    }
    return undefined;
  };

  return data.replaceAll(/[\p{L}#♯♭]+/gu, (match) => {
    // tenta localizar o match com a nota, é o caso mais comum e mais rápido para a CPU
    let output = transposeNote(match);
    if (output) {
      return output;
    }

    // a palavra é complexa, então vamos analisar ela em blocos
    // de quatro (Sol♯,Sol♭...) a dois caracteres (Do,Re,Mi...)
    const maxNoteLength = 4;
    const minNoteLength = 2;

    let charSequence = match;
    let counter = maxNoteLength;
    output = "";

    // se os caracteres forem menores que o mínimo de duas notas
    // é uma palavra comum, possivelmente "2x", então retorna antes
    if (charSequence.length < minNoteLength * 2) {
      return match;
    }

    while (charSequence.length) {
      // se o bloco for menor que o mínimo necessário para compor uma nota
      if (counter < minNoteLength) {
        // interrompe o fluxo e retorna a palavra normalmente
        // pois não há notas com essa sequencia de caracteres
        return match;
      }

      // fatia os primeiros caracteres
      const subWord = charSequence.substring(0, counter);
      // e tenta localizar uma nota com eles
      const subOutput = transposeNote(subWord);
      // se achar uma nota
      if (subOutput) {
        // salva ela para o output
        output += subOutput;
        // fatia o restante dos caracteres para descartar a primeira nota
        charSequence = charSequence.substring(counter);
        // reseta o contador para reiniciar a analise com a string restante
        counter = maxNoteLength + 1;
      }

      counter--;
    }

    return output;
  });
};
