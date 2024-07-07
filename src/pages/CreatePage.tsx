import { EditSheet } from "../components/EditSheet";
import { Header } from "../components/Header";
import { KeyboardLayout } from "../components/KeyboardLayout";

export const CreatePage = () => {
  return (
    <KeyboardLayout>
      <Header title="Nova cola" />
      <EditSheet />
    </KeyboardLayout>
  );
};
