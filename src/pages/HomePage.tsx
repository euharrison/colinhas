import { Link } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FAB } from "../components/FAB";
import { useFormatSheet } from "../hooks/useFormatSheet";
import { useInstrument } from "../hooks/useInstrument";
import { useSheetList } from "../hooks/useSheetList";
import { InstrumentIcon } from "../icons/InstrumentIcon";
import { ProfileIcon } from "../icons/ProfileIcon";
import { black, textGray } from "../theme/colors";
import { headerHeight } from "../theme/sizes";

export const HomePage = () => {
  const sheetList = useSheetList();
  const instrument = useInstrument();
  const formatSheet = useFormatSheet();

  return (
    <>
      <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: headerHeight,
            paddingHorizontal: 20,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Colinhas</Text>
          <Link href="/profile" asChild>
            <Pressable style={{ flexDirection: "row", gap: 8 }}>
              <InstrumentIcon instrument={instrument} fill={textGray} />
              <ProfileIcon />
            </Pressable>
          </Link>
        </View>
      </SafeAreaView>
      <FlatList
        style={{ borderTopWidth: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        data={sheetList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/${item.id}`} asChild>
            <Pressable
              style={{
                borderColor: black,
                borderBottomWidth: 1,
                padding: 20,
              }}
            >
              <Text>{item.name}</Text>
              <Text style={{ color: textGray }} numberOfLines={1}>
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
      <Link href="/create" asChild>
        <FAB>
          <Text style={{ fontWeight: "bold", textTransform: "uppercase" }}>
            Nova cola ✏️
          </Text>
        </FAB>
      </Link>
    </>
  );
};
