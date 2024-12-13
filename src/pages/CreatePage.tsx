import { useRef } from "react";
import { DialogRef } from "../components/Dialog";
import { DiscardDialog } from "../components/DiscardDialog";
import { Header } from "../components/Header";
import { KeyboardLayout } from "../components/KeyboardLayout";
import { SheetWriter } from "../components/SheetWriter";
import { goBack } from "../services/navigation";

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
      <SheetWriter />
      <DiscardDialog ref={discardDialogRef} onConfirm={() => goBack()} />
    </KeyboardLayout>
  );
};
