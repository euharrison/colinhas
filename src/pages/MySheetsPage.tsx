import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../auth/auth";
import { FAB } from "../components/FAB";
import { Header } from "../components/Header";
import { LoadingPage } from "../components/LoadingPage";
import { SheetList } from "../components/SheetList";
import { observeSheetCollection } from "../database/sheets";
import { Sheet } from "../database/types";
import { PencilIcon } from "../icons/PencilIcon";
import { headerHeight, pagePadding } from "../theme/sizes";
import { createUrl } from "../urls";

export const MySheetsPage = () => {
  const [sheetCollection, setSheetCollection] = useState<Sheet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return observeSheetCollection(
      (data) => {
        setSheetCollection(data.sort((a, b) => b.createdAt - a.createdAt));
        setIsLoading(false);
      },
      (error) => alert(error.message),
    );
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  const data = sheetCollection.filter(
    (i) => i.userId === auth.currentUser?.uid,
  );

  return (
    <>
      <SafeAreaView>
        <Header title="Minhas Colas">
          <Pressable
            style={{
              height: headerHeight,
              paddingHorizontal: pagePadding,
              alignItems: "center",
              justifyContent: "center",
            }}
          />
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
