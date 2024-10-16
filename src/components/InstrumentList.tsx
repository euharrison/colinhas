import { Text, View } from "react-native";
import { Instrument } from "../database/types";
import { InstrumentIcon } from "../icons/InstrumentIcon";
import { backgroundGray } from "../theme/colors";
import { Button } from "./Button";

const items = [
  "Flauta",
  "Clarinete",
  "Sax Soprano",
  "Sax Alto",
  "Sax Tenor",
  "Trompete",
  "Trombone",
  "Eufônio",
  "Tuba",
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
      {items.map((item) => (
        <Button
          key={item}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingVertical: 12,
            paddingLeft: 20,
            gap: 20,
            backgroundColor: item === selectedItem ? backgroundGray : undefined,
          }}
          onPress={() => {
            onSelect(item);
          }}
        >
          <InstrumentIcon instrument={item} />
          <Text style={{ fontSize: 20 }}>{item}</Text>
        </Button>
      ))}
    </View>
  );
};
