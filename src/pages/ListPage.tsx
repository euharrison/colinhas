import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FAB } from "../components/FAB";
import { Header } from "../components/Header";
import { SheetList } from "../components/SheetList";
import { observeSheetCollection } from "../database/sheets";
import { Sheet } from "../database/types";
import { OptionsIcon } from "../icons/OptionsIcons";
import { PencilIcon } from "../icons/PencilIcon";
import { headerHeight, pagePadding } from "../theme/sizes";
import { createUrl } from "../urls";

export const ListPage = () => {
  const [sheetCollection, setSheetCollection] = useState<Sheet[] | undefined>(
    undefined,
  );

  useEffect(() => {
    return observeSheetCollection(
      (data) => {
        // TODO sort
        setSheetCollection(data.sort((a, b) => b.createdAt - a.createdAt));
      },
      (error) => alert(error.message),
    );
  }, []);

  return (
    <>
      <SafeAreaView>
        <Header title="Minhas colas">
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

      <SheetList data={sheetCollection} />

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
