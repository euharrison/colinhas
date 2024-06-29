import { useLocalSearchParams } from "expo-router";
import { Editor } from "../components/Editor";
import { Header } from "../components/Header";
import { NotFound } from "../components/NotFound";
import { useSheet } from "../hooks/useSheet";

export const EditPage = () => {
  const params = useLocalSearchParams();
  const sheet = useSheet(String(params.sheet));

  if (!sheet) {
    return <NotFound />;
  }

  return (
    <>
      <Header title={sheet.name} />
      <Editor sheet={sheet} />
    </>
  );
};
