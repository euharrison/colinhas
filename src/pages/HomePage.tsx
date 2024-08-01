import { Link } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FAB } from "../components/FAB";
import { SheetList } from "../components/SheetList";
import { useUser } from "../hooks/useUser";
import { CloseIcon } from "../icons/CloseIcon";
import { LogoIcon } from "../icons/LogoIcon";
import { PencilIcon } from "../icons/PencilIcon";
import { ProfileIcon } from "../icons/ProfileIcon";
import { SearchIcon } from "../icons/SearchIcon";
import { backgroundGray, black, borderGray, textGray } from "../theme/colors";
import { headerHeight, pagePadding } from "../theme/sizes";
import { createUrl, profileUrl } from "../urls";

export const HomePage = () => {
  const user = useUser();
  const [search, setSearch] = useState("");
  const [filterMyOwn, setFilterMyOwn] = useState(false);

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
          alignItems: "center",
          marginHorizontal: pagePadding,
          paddingHorizontal: 16,
          marginBottom: 8,
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

      <SheetList search={search.trim()} filterMyOwn={filterMyOwn} />

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
