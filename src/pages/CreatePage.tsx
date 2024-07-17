import { useRef } from "react";
import { DialogRef } from "../components/Dialog";
import { DiscardDialog } from "../components/DiscardDialog";
import { EditSheet } from "../components/EditSheet";
import { Header } from "../components/Header";
import { KeyboardLayout } from "../components/KeyboardLayout";

export const CreatePage = () => {
  const discardDialogRef = useRef<DialogRef>(null);

  return (
    <KeyboardLayout>
      <Header
        title="Nova cola"
        onPressBack={() => {
          discardDialogRef.current?.open();
        }}
      />
      <EditSheet />
      <DiscardDialog ref={discardDialogRef} />
    </KeyboardLayout>
  );
};
