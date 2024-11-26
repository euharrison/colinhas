import { Text, View } from "react-native";
import { Instrument } from "../database/types";
import { InstrumentIcon } from "../icons/InstrumentIcon";
import { backgroundGray, textGray } from "../theme/colors";
import { Button } from "./Button";

const items = [
  { name: "Flauta", pitch: "C" },
  { name: "Clarinete", pitch: "B♭" },
  { name: "Sax Soprano", pitch: "B♭" },
  { name: "Sax Alto", pitch: "Mi♭" },
  { name: "Sax Tenor", pitch: "B♭" },
  { name: "Trompete", pitch: "B♭" },
  { name: "Trombone", pitch: "C" },
  { name: "Eufônio", pitch: "C" },
  { name: "Tuba", pitch: "C" },
] as const;

export const InstrumentList = ({
  selectedItem,
  onSelect,
}: {
  selectedItem?: Instrument;
  onSelect: (instrument: Instrument) => void;
}) => {
  return (
    <View style={{ gap: 8 }}>
      {items.map(({ name, pitch }) => (
        <Button
          key={name}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingVertical: 12,
            paddingLeft: 20,
            backgroundColor: name === selectedItem ? backgroundGray : undefined,
          }}
          onPress={() => {
            onSelect(name);
          }}
        >
          <InstrumentIcon instrument={name} />
          <Text style={{ fontSize: 20, alignItems: "center", marginLeft: 20 }}>
            {name}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: textGray,
              marginLeft: 8,
              top: 2,
            }}
          >
            {pitch !== "C" && pitch}
          </Text>
        </Button>
      ))}
    </View>
  );
};
