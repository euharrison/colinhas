import { useLocalSearchParams } from "expo-router";
import { useRef } from "react";
import { Header } from "../components/Header";
import { HeaderMenu } from "../components/HeaderMenu";
import { KeyboardLayout } from "../components/KeyboardLayout";
import { ListMenuRef } from "../components/ListMenu";
import { LoadingPage } from "../components/LoadingPage";
import { OgTags } from "../components/OgTags";
import { SheetWriter } from "../components/SheetWriter";
import { UpdateSheetMenu } from "../components/UpdateSheetMenu";
import { useQuerySheet } from "../hooks/useQuerySheet";
import { NotFoundPage } from "./NotFoundPage";

export const UpdateSheetPage = () => {
  const params = useLocalSearchParams();
  const id = String(params.id);

  const { data, isLoading } = useQuerySheet(id);

  const listMenuRef = useRef<ListMenuRef>(null);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!data) {
    return <NotFoundPage />;
  }

  return (
    <KeyboardLayout>
      <OgTags title={data.name} />
      <Header title={data.name}>
        <HeaderMenu listMenuRef={listMenuRef} />
        <UpdateSheetMenu ref={listMenuRef} sheet={data} />
      </Header>
      <SheetWriter sheet={data} />
    </KeyboardLayout>
  );
};
