import { Link } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";
import { useFormatSheet } from "../hooks/useFormatSheet";
import { useInstrument } from "../hooks/useInstrument";
import { useSheetList } from "../hooks/useSheetList";

export const HomePage = () => {
  const sheetList = useSheetList();
  const instrument = useInstrument();
  const formatSheet = useFormatSheet();

  return (
    <>
      <View style={{ padding: 20, gap: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Colinhas</Text>
          <Link href="/settings">
            <Text>{instrument}</Text>
          </Link>
        </View>
        <Link href="/create" asChild>
          <Pressable
            style={{
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 4,
              paddingVertical: 20,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", textTransform: "uppercase" }}>
              Nova cola ✏️
            </Text>
          </Pressable>
        </Link>
      </View>
      <FlatList
        style={{ borderTopWidth: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        data={sheetList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/${item.id}`} asChild>
            <Pressable
              style={{
                borderColor: "black",
                borderBottomWidth: 1,
                padding: 20,
              }}
            >
              <Text>{item.name}</Text>
              <Text style={{ color: "#999" }} numberOfLines={1}>
                {formatSheet(item).replaceAll("\n", "   ")}
              </Text>
              {item.syncing && (
                <Text style={{ position: "absolute", top: 30, right: 20 }}>
                  🔄
                </Text>
              )}
            </Pressable>
          </Link>
        )}
      ></FlatList>
    </>
  );
};
