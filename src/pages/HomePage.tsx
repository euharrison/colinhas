import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../auth/auth";
import { FAB } from "../components/FAB";
import { SheetList } from "../components/SheetList";
import { observeSheetCollection } from "../database/sheets";
import { Sheet } from "../database/types";
import { useUser } from "../hooks/useUser";
import { LogoIcon } from "../icons/LogoIcon";
import { PencilIcon } from "../icons/PencilIcon";
import { ProfileIcon } from "../icons/ProfileIcon";
import { backgroundGray, black, borderGray, textGray } from "../theme/colors";
import { headerHeight, pagePadding } from "../theme/sizes";
import { bookUrl, createUrl, mySheetsUrl, profileUrl, sheetUrl } from "../urls";
import { Button } from "../components/Button";

export const HomePage = () => {
  const user = useUser();
  const [filterMyOwn, setFilterMyOwn] = useState(false);
  const [sheetCollection, setSheetCollection] = useState<Sheet[]>([]);

  useEffect(() => {
    return observeSheetCollection(
      (data) => {
        setSheetCollection(data.sort((a, b) => b.createdAt - a.createdAt));
      },
      (error) => alert(error.message),
    );
  }, []);

  const filteredData = filterMyOwn
    ? sheetCollection.filter((i) => i.userId === auth.currentUser?.uid)
    : sheetCollection;

  return (
    <>
      <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            height: headerHeight,
            paddingHorizontal: pagePadding,
          }}
        >
          <LogoIcon />
          <Text style={{ fontSize: 20, fontWeight: "500", flex: 1 }}>
            Colinhas
          </Text>
          <Link href={profileUrl}>
            {user?.photoURL ? (
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 999,
                  overflow: "hidden",
                }}
              >
                <Image
                  source={{ uri: user.photoURL }}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
            ) : (
              <ProfileIcon />
            )}
          </Link>
        </View>
      </SafeAreaView>

      <View>
        {/* TODO grid com botão de criar cola */}
        <Link href={mySheetsUrl} asChild>
          <Pressable
            style={{
              borderColor: borderGray,
              borderWidth: 1,
              borderRadius: 4,
              height: 140,
              width: 140,
              margin: 20,
            }}
          >
            <Text>Minhas Colas</Text>
          </Pressable>
        </Link>
      </View>

      <SheetList data={filteredData} />

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
