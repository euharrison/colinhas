import { Link } from "expo-router";
import { useRef } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CreateBookDialog } from "../components/CreateBookDialog";
import { CreateSheetFAB } from "../components/CreateSheetFAB";
import { DialogRef, openDialog } from "../components/Dialog";
import { LoadingPage } from "../components/LoadingPage";
import { SheetList } from "../components/SheetList";
import { useQueryMyBooks } from "../hooks/useQueryMyBooks";
import { useQuerySheets } from "../hooks/useQuerySheets";
import { useUser } from "../hooks/useUser";
import { LogoIcon } from "../icons/LogoIcon";
import { PlusIcon } from "../icons/PlusIcon";
import { ProfileIcon } from "../icons/ProfileIcon";
import { backgroundGray, black } from "../theme/colors";
import { headerHeight, pagePadding } from "../theme/sizes";
import { bookUrl, mySheetsUrl, profileUrl } from "../urls";

export const HomePage = () => {
  const user = useUser();
  const { data, isLoading } = useQuerySheets();
  const { data: books } = useQueryMyBooks();

  const createBookDialogRef = useRef<DialogRef>(null);

  if (isLoading) {
    return <LoadingPage />;
  }

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
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 8 }}
          contentContainerStyle={{ paddingHorizontal: pagePadding, gap: 4 }}
        >
          {[
            { name: "Minhas colas", url: mySheetsUrl },
            ...books.map((b) => ({ name: b.name, url: bookUrl(b) })),
          ].map(({ name, url }) => (
            <Link key={url} href={url} asChild>
              <Pressable
                style={{
                  height: 40,
                  paddingHorizontal: 16,
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: backgroundGray,
                  borderWidth: 1,
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: black,
                    textAlign: "center",
                  }}
                >
                  {name}
                </Text>
              </Pressable>
            </Link>
          ))}
          <Pressable
            style={{
              height: 40,
              width: 40,
              alignItems: "center",
              justifyContent: "center",
              borderColor: backgroundGray,
              borderWidth: 1,
              borderRadius: 8,
            }}
            onPress={() => {
              openDialog(createBookDialogRef);
            }}
          >
            <PlusIcon height={12} width={12} />
          </Pressable>
        </ScrollView>
      </View>

      <SheetList data={data} />

      <CreateSheetFAB />

      <CreateBookDialog ref={createBookDialogRef} />
    </>
  );
};
