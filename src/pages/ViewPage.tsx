import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Header } from "../components/Header";
import { getSheet } from "../database/getSheet";
import { Sheet } from "../database/types";
import { auth } from "../services/auth";

export const ViewPage = () => {
  const { sheet } = useLocalSearchParams();

  const [data, setData] = useState<Sheet>();

  useEffect(() => {
    const load = async () => {
      try {
        const d = await getSheet(String(sheet));
        setData(d);
      } catch (error) {
        // TODO
        console.log(error);
      }
    };
    load();
  }, []);

  if (!data) {
    return (
      <View style={{ flex: 1, padding: 8 }}>
        <Text style={{ fontSize: 20 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <Header title={data.name}>
        {data.userId === auth.currentUser?.uid && (
          <Link href={`/${data.id}/edit`} asChild>
            <Pressable
              style={{
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>✏️</Text>
            </Pressable>
          </Link>
        )}
      </Header>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
      >
        <Text style={{ fontSize: 20 }}>{data.data}</Text>
      </ScrollView>
    </>
  );
};
