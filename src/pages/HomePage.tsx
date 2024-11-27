import { Link } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../auth/auth";
import { FAB } from "../components/FAB";
import { LoadingPage } from "../components/LoadingPage";
import { SheetList } from "../components/SheetList";
import { useQuerySheetCollecion } from "../hooks/useSheetCollection";
import { useUser } from "../hooks/useUser";
import { LogoIcon } from "../icons/LogoIcon";
import { PencilIcon } from "../icons/PencilIcon";
import { ProfileIcon } from "../icons/ProfileIcon";
import { backgroundGray, black, borderGray, textGray } from "../theme/colors";
import { headerHeight, pagePadding } from "../theme/sizes";
import { createUrl, profileUrl } from "../urls";

export const HomePage = () => {
  const user = useUser();
  const [filterMyOwn, setFilterMyOwn] = useState(false);
  const { data, isLoading } = useQuerySheetCollecion();

  const filteredData = filterMyOwn
    ? data.filter((i) => i.userId === auth.currentUser?.uid)
    : data;

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

      <View
        style={{
          flexDirection: "row",
          marginHorizontal: pagePadding,
          marginBottom: 20,
          borderColor: backgroundGray,
          borderWidth: 1,
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        {[
          { label: "Todas as colas", value: false },
          { label: "Minhas colas", value: true },
        ].map(({ label, value }) => {
          const selected = filterMyOwn === value;
          return (
            <Pressable
              key={label}
              onPress={() => setFilterMyOwn(value)}
              style={{
                flex: 1,
                padding: 4,
                alignItems: "center",
                justifyContent: "center",
                borderColor: borderGray,
                backgroundColor: selected ? backgroundGray : undefined,
              }}
            >
              <Text
                style={{ fontSize: 12, color: selected ? black : textGray }}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
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
