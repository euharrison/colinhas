import { useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppendSheetToBookDialog } from "../components/AppendSheetToBookDialog";
import { BookMenu } from "../components/BookMenu";
import { DialogRef, openDialog } from "../components/Dialog";
import { Header } from "../components/Header";
import { HeaderMenu } from "../components/HeaderMenu";
import { ListMenuRef } from "../components/ListMenu";
import { LoadingPage } from "../components/LoadingPage";
import { RenameBookDialog } from "../components/RenameBookDialog";
import { SheetList } from "../components/SheetList";
import { removeSheetFromBook, updateBookSheets } from "../database/books";
import { Sheet } from "../database/types";
import { useQueryBook } from "../hooks/useQueryBook";
import { useQuerySheets } from "../hooks/useQuerySheets";
import { ArrowDownIcon } from "../icons/ArrowDownIcon";
import { ArrowUpIcon } from "../icons/ArrowUpIcon";
import { OptionsIcon } from "../icons/OptionsIcons";
import { PencilIcon } from "../icons/PencilIcon";
import { TrashIcon } from "../icons/TrashIcon";
import { pagePadding } from "../theme/sizes";
import { NotFoundPage } from "./NotFoundPage";

const getMockSheet = (id: string): Sheet => ({
  id,
  name: "🗑️ Música apagada",
  data: `🗑️ ${id}`,
  instrument: "Trombone", // TODO Piano
  key: "Do Maior",
  unlisted: true,
  userId: "",
  updatedAt: Date.now(),
  createdAt: Date.now(),
  syncing: false,
});

export const BookPage = () => {
  const params = useLocalSearchParams();
  const id = String(params.id);

  const { data: book, isLoading: isLoadingBook } = useQueryBook(id);
  const { data: sheets, isLoading: isLoadingSheets } = useQuerySheets();

  const [isEditMode, setIsEditMode] = useState(false);

  const listMenuRef = useRef<ListMenuRef>(null);
  const scrollRef = useRef<FlatList>(null);
  const appendDialogRef = useRef<DialogRef>(null);
  const changeNameDialogRef = useRef<DialogRef>(null);

  if (isLoadingBook || isLoadingSheets) {
    return <LoadingPage />;
  }

  if (!book) {
    return <NotFoundPage />;
  }

  const sheetMap: Record<string, Sheet> = {};
  sheets.forEach((item) => {
    sheetMap[item.id] = item;
  });

  const data = book.sheets.map((id) => sheetMap[id] ?? getMockSheet(id));

  return (
    <>
      <SafeAreaView>
        <Header
          title={
            isEditMode ? (
              <Pressable
                style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
                onPress={() => {
                  openDialog(changeNameDialogRef);
                }}
              >
                <Text>{book.name}</Text>
                <PencilIcon width={18} />
              </Pressable>
            ) : (
              book.name
            )
          }
          onPressBack={isEditMode ? () => setIsEditMode(false) : undefined}
        >
          <HeaderMenu listMenuRef={listMenuRef} />
          <BookMenu
            ref={listMenuRef}
            book={book}
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            onPressAppend={() => openDialog(appendDialogRef)}
          />
        </Header>
      </SafeAreaView>

      {data.length ? (
        <SheetList
          data={data}
          scrollRef={scrollRef}
          renderBeforeIcons={
            isEditMode
              ? (item, index) => {
                  const upArrowEnabled = index > 0;
                  const downArrowEnabled = index < book.sheets.length - 1;
                  return (
                    <>
                      <Pressable
                        style={{
                          marginLeft: pagePadding - 8,
                          paddingHorizontal: 8,
                          height: "100%",
                          justifyContent: "center",
                          opacity: downArrowEnabled ? 1 : 0.1,
                        }}
                        disabled={!downArrowEnabled}
                        onPress={() => {
                          const sheets = [...book.sheets];
                          const elem = sheets[index];
                          sheets[index] = sheets[index + 1];
                          sheets[index + 1] = elem;
                          updateBookSheets(book.id, sheets);
                        }}
                      >
                        <ArrowDownIcon width={12} />
                      </Pressable>
                      <Pressable
                        style={{
                          paddingHorizontal: 8,
                          height: "100%",
                          justifyContent: "center",
                          opacity: upArrowEnabled ? 1 : 0.1,
                        }}
                        disabled={!upArrowEnabled}
                        onPress={() => {
                          const sheets = [...book.sheets];
                          const elem = sheets[index];
                          sheets[index] = sheets[index - 1];
                          sheets[index - 1] = elem;
                          updateBookSheets(book.id, sheets);
                        }}
                      >
                        <ArrowUpIcon width={12} />
                      </Pressable>
                    </>
                  );
                }
              : undefined
          }
          renderAfterIcons={
            isEditMode
              ? (item) => (
                  <Pressable
                    style={{ padding: pagePadding }}
                    onPress={() => {
                      removeSheetFromBook(book.id, item.id);
                    }}
                  >
                    <TrashIcon width={18} />
                  </Pressable>
                )
              : undefined
          }
        />
      ) : (
        <View style={{ padding: 40 }}>
          <Text style={{ fontSize: 18, lineHeight: 30, textAlign: "center" }}>
            Para adicionar músicas na lista, utilize o botão de opções{" "}
            <OptionsIcon width={16} height={16} /> acima.
          </Text>
        </View>
      )}

      <AppendSheetToBookDialog
        ref={appendDialogRef}
        book={book}
        scrollRef={scrollRef}
      />
      <RenameBookDialog ref={changeNameDialogRef} book={book} />
    </>
  );
};
