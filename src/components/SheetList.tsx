import { Link } from "expo-router";
import { RefObject, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { Sheet } from "../database/types";
import { useFormatSheet } from "../hooks/useFormatSheet";
import { CloseIcon } from "../icons/CloseIcon";
import { LoadingIcon } from "../icons/LoadingIcon";
import { SearchIcon } from "../icons/SearchIcon";
import { SyncIcon } from "../icons/SyncIcon";
import { backgroundGray, borderGray, textGray } from "../theme/colors";
import { pagePadding } from "../theme/sizes";
import { sheetUrl } from "../urls";

const itemHeight = 80;
const separatorHeight = 1;

const getSearchResult = (data: Sheet[], search: string) => {
  if (!search) {
    return data;
  }

  const startsWithRegex = new RegExp(`^${search}`, "i");
  const containRegex = new RegExp(search, "i");
  const anyWordRegex = new RegExp(`${search.replaceAll(" ", "|")}`, "i");

  const computeValue = (value: string, regex: RegExp, points: number) =>
    value.match(regex) ? points : 0;

  const computeScore = (item: Sheet) =>
    computeValue(item.name, startsWithRegex, 1000) +
    computeValue(item.name, containRegex, 100) +
    computeValue(item.name, anyWordRegex, 10) +
    computeValue(item.data, anyWordRegex, 5) +
    computeValue(item.instrument, anyWordRegex, 2) +
    (item.key ? computeValue(item.key, anyWordRegex, 1) : 0);

  return data
    .map((item) => ({ ...item, score: computeScore(item) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);
};

export const SheetList = ({
  data,
  scrollRef,
  onPress,
}: {
  data?: Sheet[];
  scrollRef?: RefObject<FlatList>;
  onPress?: (item: Sheet) => void;
}) => {
  const formatSheet = useFormatSheet();
  const [search, setSearch] = useState("");

  if (data === undefined) {
    return (
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <LoadingIcon />
      </View>
    );
  }

  const dataResult = search ? getSearchResult(data, search) : data;

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: pagePadding,
          paddingHorizontal: 16,
          marginBottom: 16,
          gap: 8,
          backgroundColor: backgroundGray,
          borderRadius: 8,
        }}
      >
        <View>
          <SearchIcon width={18} height={18} />
        </View>
        <TextInput
          style={{ paddingVertical: 12, width: "100%" }}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Busca"
          placeholderTextColor={textGray}
          value={search}
          onChangeText={setSearch}
        />
        {!!search && (
          <Pressable onPress={() => setSearch("")}>
            <CloseIcon />
          </Pressable>
        )}
      </View>
      {dataResult.length ? (
        <FlatList
          ref={scrollRef}
          style={{ borderTopWidth: 1, borderColor: borderGray }}
          contentContainerStyle={{ paddingBottom: 100 }}
          data={dataResult}
          keyExtractor={(item) => item.id}
          getItemLayout={(data, index) => ({
            length: itemHeight + separatorHeight,
            offset: (itemHeight + separatorHeight) * index,
            index,
          })}
          renderItem={({ item }) => (
            <View
              style={{
                height: itemHeight,
                flexDirection: "row",
                alignItems: "center",
                borderColor: borderGray,
                borderBottomWidth: separatorHeight,
              }}
            >
              <Link href={sheetUrl(item)} asChild>
                <Pressable
                  style={{
                    flex: 1,
                    gap: 4,
                    padding: pagePadding,
                  }}
                  onPress={
                    onPress
                      ? (e) => {
                          e.preventDefault();
                          onPress(item);
                        }
                      : undefined
                  }
                >
                  <Text>{item.name}</Text>
                  <Text style={{ color: textGray }} numberOfLines={1}>
                    {formatSheet(item).replaceAll("\n", "   ")}
                  </Text>
                </Pressable>
              </Link>
              {item.syncing && (
                <View style={{ marginRight: pagePadding }}>
                  <SyncIcon />
                </View>
              )}
            </View>
          )}
        />
      ) : (
        <View
          style={{
            flex: 1,
            padding: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18 }}>Nenhuma cola encontrada 🥲</Text>
        </View>
      )}
    </>
  );
};
