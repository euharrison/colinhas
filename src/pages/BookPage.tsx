import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FAB } from "../components/FAB";
import { Header } from "../components/Header";
import { LoadingPage } from "../components/LoadingPage";
import { SheetList } from "../components/SheetList";
import { observeBook } from "../database/books";
import { observeSheetCollection } from "../database/sheets";
import { Book, Sheet } from "../database/types";
import { OptionsIcon } from "../icons/OptionsIcons";
import { PencilIcon } from "../icons/PencilIcon";
import { headerHeight, pagePadding } from "../theme/sizes";
import { createUrl } from "../urls";
import { NotFoundPage } from "./NotFoundPage";

export const BookPage = () => {
  const [sheetMap, setSheetMap] = useState<Record<string, Sheet>>({});

  const [book, setBook] = useState<Book | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const params = useLocalSearchParams();
  const id = String(params.id);

  useEffect(() => {
    return observeBook(
      id,
      (data) => {
        setBook(data);
        setIsLoading(false);
      },
      (error) => alert(error.message),
    );
  }, [id]);

  useEffect(() => {
    return observeSheetCollection(
      (data) => {
        const map: Record<string, Sheet> = {};
        data.forEach((item) => {
          map[item.id] = item;
        });
        setSheetMap(map);
      },
      (error) => alert(error.message),
    );
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!book) {
    return <NotFoundPage />;
  }

  const data = book.sheets.map((id) => sheetMap[id]).filter(Boolean);

  return (
    <>
      <SafeAreaView>
        <Header title={book?.name}>
          <Pressable
            style={{
              height: headerHeight,
              paddingHorizontal: pagePadding,
              alignItems: "center",
              justifyContent: "center",
            }}
            // TODO
            // onPress={() => setIsMenuVisible((v) => !v)}
          >
            <OptionsIcon />
          </Pressable>
        </Header>
      </SafeAreaView>

      <SheetList data={data} />

      <Link href={createUrl} asChild>
        <FAB>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
              marginHorizontal: 8,
            }}
          >
            <Text style={{ fontWeight: "700", textTransform: "uppercase" }}>
              Nova cola
            </Text>
            <PencilIcon width={18} />
          </View>
        </FAB>
      </Link>
    </>
  );
};
