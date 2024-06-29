import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Editor } from "../components/Editor";
import { Header } from "../components/Header";
import { getSheet } from "../database/getSheet";
import { Sheet } from "../database/types";

export const EditPage = () => {
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
      <Header title={String(sheet)} />
      <Editor sheet={data} />
    </>
  );
};
