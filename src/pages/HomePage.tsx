import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FAB } from "../components/FAB";
import { observeSheetList } from "../database/sheet";
import { Sheet } from "../database/types";
import { useFormatSheet } from "../hooks/useFormatSheet";
import { useInstrument } from "../hooks/useInstrument";
import { InstrumentIcon } from "../icons/InstrumentIcon";
import { PencilIcon } from "../icons/PencilIcon";
import { ProfileIcon } from "../icons/ProfileIcon";
import { SearchIcon } from "../icons/SearchIcon";
import { black, searchBackground, textGray } from "../theme/colors";
import { headerHeight, pagePadding } from "../theme/sizes";

const itemHeight = 80;
const separatorHeight = 1;

export const HomePage = () => {
  const instrument = useInstrument();
  const formatSheet = useFormatSheet();

  const [sheetList, setSheetList] = useState<Sheet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    return observeSheetList(
      (data) => {
        setSheetList(data.sort((a, b) => b.updatedAt - a.updatedAt));
        setIsLoading(false);
      },
      (error) => alert(error.message),
    );
  }, []);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

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

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: pagePadding,
          paddingHorizontal: 16,
          marginBottom: 16,
          gap: 8,
          backgroundColor: searchBackground,
          borderRadius: 999,
        }}
      >
        <SearchIcon />
        <TextInput
          style={{ paddingVertical: 12, width: "100%" }}
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor={textGray}
          placeholder="Busca"
          value={search}
          onChangeText={setSearch}
        />
      </View>

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
                gap: 4,
              }}
            >
              <Text>{item.name}</Text>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
              >
                <View>
                  <InstrumentIcon
                    instrument={item.instrument}
                    width={18}
                    height={18}
                    fill={textGray}
                  />
                </View>
                <Text style={{ color: textGray }} numberOfLines={1}>
                  {formatSheet(item).replaceAll("\n", "   ")}
                </Text>
              </View>
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
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Text style={{ fontWeight: "bold", textTransform: "uppercase" }}>
              Nova cola
            </Text>
            <PencilIcon width={18} />
          </View>
        </FAB>
      </Link>
    </>
  );
};
