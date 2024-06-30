import { Pressable, Text, View } from "react-native";

export const InstrumentSelector = ({
  onSelect,
}: {
  onSelect: (instrument: string) => void;
}) => {
  return (
    <View style={{ gap: 8 }}>
      {["Sax", "Trompete", "Trombone", "Tuba"].map((item) => (
        <Pressable
          key={item}
          style={({ pressed }) => ({
            borderRadius: 4,
            borderWidth: 1,
            paddingVertical: 20,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: pressed ? "#ccc" : undefined,
          })}
          onPress={() => {
            onSelect(item);
          }}
        >
          <Text>{item}</Text>
        </Pressable>
      ))}
    </View>
  );
};
