import { Accidental } from "./types";

export const AccidentalInput = ({
  value,
  onChange,
}: {
  value: Accidental;
  onChange: (value: Accidental) => void;
}) => {
  return (
    <div>
      <label>
        <input
          type="radio"
          checked={value === "sharp"}
          onChange={() => onChange("sharp")}
        />{" "}
        #
      </label>
      <label>
        <input
          type="radio"
          checked={value === "flat"}
          onChange={() => onChange("flat")}
        />
        ♭
      </label>
    </div>
  );
};
