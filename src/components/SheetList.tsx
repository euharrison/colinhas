import { Link } from "expo-router";
import { ReactNode, RefObject, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { Sheet } from "../database/types";
import { useFormatSheet } from "../hooks/useFormatSheet";
import { CloseIcon } from "../icons/CloseIcon";
import { LoadingIcon } from "../icons/LoadingIcon";
import { SearchIcon } from "../icons/SearchIcon";
import { SyncIcon } from "../icons/SyncIcon";
import { backgroundGray, borderGray, textGray } from "../theme/colors";
import { pagePadding } from "../theme/sizes";
import { viewSheetUrl } from "../urls";
import { removeAccents } from "../utils";

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

  const computeScore = (item: Sheet) => {
    const itemName = removeAccents(item.name);
    return (
      computeValue(itemName, startsWithRegex, 1000) +
      computeValue(itemName, containRegex, 100) +
      computeValue(itemName, anyWordRegex, 10) +
      computeValue(item.data, anyWordRegex, 5) +
      computeValue(item.instrument, anyWordRegex, 2) +
      (item.key ? computeValue(item.key, anyWordRegex, 1) : 0)
    );
  };

  return data
    .map((item) => ({ ...item, score: computeScore(item) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);
};

export const SheetList = ({
  data,
  bookId,
  scrollRef,
  renderBeforeIcons,
  renderAfterIcons,
  onPress,
}: {
  data?: Sheet[];
  bookId?: string;
  scrollRef?: RefObject<FlatList>;
  renderBeforeIcons?: (item: Sheet, index: number) => ReactNode;
  renderAfterIcons?: (item: Sheet, index: number) => ReactNode;
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
        <FlatList<Sheet>
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
          renderItem={({ item, index }) => (
            <View
              style={{
                height: itemHeight,
                flexDirection: "row",
                alignItems: "center",
                borderColor: borderGray,
                borderBottomWidth: separatorHeight,
              }}
            >
              {renderBeforeIcons?.(item, index)}
              <Link href={viewSheetUrl(item, bookId)} asChild>
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
              {renderAfterIcons?.(item, index)}
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
