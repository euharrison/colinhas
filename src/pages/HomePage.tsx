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
import { headerHeight, pagePadding } from "../theme/sizes";

const itemHeight = 73;
const separatorHeight = 1;

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
            paddingHorizontal: pagePadding,
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
        getItemLayout={(data, index) => ({
          length: itemHeight + separatorHeight,
          offset: (itemHeight + separatorHeight) * index,
          index,
        })}
        renderItem={({ item }) => (
          <Link href={`/${item.id}`} asChild>
            <Pressable
              style={{
                borderColor: black,
                borderBottomWidth: separatorHeight,
                padding: pagePadding,
                height: itemHeight,
              }}
            >
              <Text>{item.name}</Text>
              <Text style={{ color: textGray }} numberOfLines={1}>
                {formatSheet(item).replaceAll("\n", "   ")}
              </Text>
              {item.syncing && (
                <Text
                  style={{ position: "absolute", top: 30, right: pagePadding }}
                >
                  🔄
                </Text>
              )}
            </Pressable>
          </Link>
        )}
      />
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
