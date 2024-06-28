import { useLocalSearchParams } from "expo-router";
import { Editor } from "../components/Editor";
import { Header } from "../components/Header";

// TODO
const sampleData = `P trombone fica….

Base.
Do Do Re# Re#
Repete até a segunda parte

Do Do
Sib Lab Sib Sib
Lab Sib Do
Sib Lab Sib Sib
Lab Sib Do….

Lab Sol Fa
5x

Volta tudo`;

export const EditPage = () => {
  const { sheet } = useLocalSearchParams();

  return (
    <>
      <Header title={String(sheet)} />
      <Editor defaultValue={sampleData} />
    </>
  );
};
