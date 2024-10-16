import { Link } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FAB } from "../components/FAB";
import { SheetList } from "../components/SheetList";
import { useUser } from "../hooks/useUser";
import { CloseIcon } from "../icons/CloseIcon";
import { LogoIcon } from "../icons/LogoIcon";
import { PencilIcon } from "../icons/PencilIcon";
import { ProfileIcon } from "../icons/ProfileIcon";
import { SearchIcon } from "../icons/SearchIcon";
import {
  backgroundGray,
  black,
  borderGray,
  textGray,
  white,
} from "../theme/colors";
import { headerHeight, pagePadding } from "../theme/sizes";
import { createUrl, profileUrl } from "../urls";
import { useLocalSettings } from "../hooks/useLocalSettings";
import { PlusIcon } from "../icons/PlusIcon";

export const HomePage = () => {
  const user = useUser();
  const [tab, setTab] = useState("Todas");
  const [search, setSearch] = useState("");
  const { settings } = useLocalSettings();

  return (
    <>
      <SafeAreaView style={{ backgroundColor: backgroundGray }}>
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

      <View style={{ backgroundColor: backgroundGray }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: pagePadding,
            height: 28,
            gap: 2,
          }}
        >
          {[
            { label: "Todas" },
            { label: "Minhas" },
            { label: settings.instrument ?? "" },
            // { label: "Marimbondo" },
            // { label: "Summer" },
            // { label: "AAAA" },
            // { label: "BBBB" },
            // { label: "CCCC" },
            { label: "+" },
          ].map(({ label }) => {
            const selected = label === tab;
            const isCreateNew = label === "+";

            // , children: <PlusIcon width={12} fill={textGray}/>, onPress: () => {}
            return (
              <Pressable
                key={label}
                onPress={
                  isCreateNew
                    ? () => {
                        //
                      }
                    : () => setTab(label)
                }
                style={{
                  paddingHorizontal: 12,
                  justifyContent: "center",
                  borderColor: borderGray,
                  borderWidth: selected ? undefined : 1,
                  borderBottomWidth: 0,
                  backgroundColor: selected ? white : undefined,
                  borderTopLeftRadius: 6,
                  borderTopRightRadius: 6,
                }}
              >
                {isCreateNew ? (
                  <PlusIcon width={8} height={8} fill={textGray} />
                ) : (
                  <Text
                    numberOfLines={1}
                    style={{ fontSize: 12, color: selected ? black : textGray }}
                  >
                    {label}
                  </Text>
                )}
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: pagePadding,
          paddingHorizontal: 16,
          marginTop: 16,
          marginBottom: 16,
          gap: 8,
          backgroundColor: backgroundGray,
          // backgroundColor: white,
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

      <SheetList search={search.trim()} filterMyOwn={tab === "Minhas"} />

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
