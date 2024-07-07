import { ScrollView, Text, View } from "react-native";
import { AccidentalInput } from "../components/AccidentalInput";
import { Sheet } from "../database/types";
import { useFormatSheet } from "../hooks/useFormatSheet";
import { useInstrument } from "../hooks/useInstrument";
import { InstrumentIcon } from "../icons/InstrumentIcon";
import { textGray } from "../theme/colors";

export const ViewSheet = ({ sheet }: { sheet: Sheet }) => {
  const instrument = useInstrument();
  const formatSheet = useFormatSheet();

  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
    >
      <View style={{ marginTop: 8, marginBottom: 16, gap: 16 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ color: textGray }}>
            Escrito para {sheet.instrument}{" "}
          </Text>
          <InstrumentIcon
            instrument={sheet.instrument}
            width={18}
            height={18}
            fill={textGray}
          />
        </View>
        <Text style={{ color: textGray }}>Tom: {sheet.keySignature}</Text>
        {sheet.instrument !== instrument && (
          <View>
            <Text style={{ color: textGray }}>Transposição automática.</Text>
            <AccidentalInput />
          </View>
        )}
      </View>
      <Text style={{ fontSize: 20 }}>{formatSheet(sheet)}</Text>
    </ScrollView>
  );
};
