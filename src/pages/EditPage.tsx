import { useLocalSearchParams } from "expo-router";
import { Editor } from "../components/Editor";
import { Header } from "../components/Header";

export const EditPage = () => {
  const { sheet } = useLocalSearchParams();

  return (
    <>
      <Header title={String(sheet)} />
      <Editor />
    </>
  );
};
