import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { observeSheetCollection } from "../database/sheet";
import { Sheet } from "../database/types";
import { useFormatSheet } from "../hooks/useFormatSheet";
import { InstrumentIcon } from "../icons/InstrumentIcon";
import { black, textGray } from "../theme/colors";
import { pagePadding } from "../theme/sizes";

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
    return <Text>Loading...</Text>;
  }

  const data = (() => {
    if (!search) {
      return sheetCollection.sort((a, b) => b.updatedAt - a.updatedAt);
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
      computeValue(item.keySignature, anyWordRegex, 1);

    return sheetCollection
      .map((item) => ({ ...item, score: computeScore(item) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || b.updatedAt - a.updatedAt);
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
        <Text style={{ fontSize: 20 }}>Nenhum item encontrado 🤦</Text>
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
            <Text>
              {item.name} {item.score}
            </Text>
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
  );
};
