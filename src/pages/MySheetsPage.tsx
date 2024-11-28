import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../auth/auth";
import { CreateSheetFAB } from "../components/CreateSheetFAB";
import { Header } from "../components/Header";
import { LoadingPage } from "../components/LoadingPage";
import { SheetList } from "../components/SheetList";
import { useQuerySheets } from "../hooks/useQuerySheets";
import { headerHeight, pagePadding } from "../theme/sizes";

export const MySheetsPage = () => {
  const { data, isLoading } = useQuerySheets();

  if (isLoading) {
    return <LoadingPage />;
  }

  const filteredData = data.filter((i) => i.userId === auth.currentUser?.uid);

  return (
    <>
      <SafeAreaView>
        <Header title="Minhas Colas">
          <Pressable
            style={{
              height: headerHeight,
              paddingHorizontal: pagePadding,
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </Header>
      </SafeAreaView>

      <SheetList data={filteredData} />

      <CreateSheetFAB />
    </>
  );
};
