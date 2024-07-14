import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { observeSheetCollection } from "../database/sheets";
import { Sheet } from "../database/types";
import { useFormatSheet } from "../hooks/useFormatSheet";
import { LoadingIcon } from "../icons/LoadingIcon";
import { SyncIcon } from "../icons/SyncIcon";
import { black, textGray } from "../theme/colors";
import { pagePadding } from "../theme/sizes";
import { createUrl, sheetUrl } from "../urls";

const itemHeight = 80;
const separatorHeight = 1;

export const SheetList = ({ search }: { search: string }) => {
  const formatSheet = useFormatSheet();
  const [sheetCollection, setSheetCollection] = useState<Sheet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return observeSheetCollection(
      (data) => {
        setSheetCollection(data);
        setIsLoading(false);
      },
      (error) => alert(error.message),
    );
  }, []);

  if (isLoading) {
    return (
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <LoadingIcon />
      </View>
    );
  }

  const data = (() => {
    if (!search) {
      return sheetCollection.sort((a, b) => b.createdAt - a.createdAt);
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
      computeValue(item.key, anyWordRegex, 1);

    return sheetCollection
      .map((item) => ({ ...item, score: computeScore(item) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || b.createdAt - a.createdAt);
  })();

  if (!data.length) {
    return (
      <View
        style={{
          flex: 1,
          padding: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18 }}>Nenhum item encontrado 🥲</Text>
        <Link href={createUrl} style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 16, textDecorationLine: "underline" }}>
            Criar nova cola
          </Text>
        </Link>
      </View>
    );
  }

  return (
    <FlatList
      style={{ borderTopWidth: 1 }}
      contentContainerStyle={{ paddingBottom: 100 }}
      data={data}
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
            borderColor: black,
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
  );
};
