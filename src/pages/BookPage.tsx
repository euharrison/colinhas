import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { FlatList, Platform, Pressable, Share, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppendSheetToBookDialog } from "../components/AppendSheetToBookDialog";
import { BookMenu } from "../components/BookMenu";
import { ChangeBookNameDialog } from "../components/ChangeBookNameDialog";
import { DeleteBookDialog } from "../components/DeleteBookDialog";
import { DialogRef } from "../components/Dialog";
import { Header } from "../components/Header";
import { LoadingPage } from "../components/LoadingPage";
import { ShareDialog } from "../components/ShareDialog";
import { SheetList } from "../components/SheetList";
import {
  observeBook,
  removeSheetFromBook,
  updateBookSheets,
} from "../database/books";
import { observeSheetCollection } from "../database/sheets";
import { Book, Sheet } from "../database/types";
import { ArrowDownIcon } from "../icons/ArrowDownIcon";
import { ArrowUpIcon } from "../icons/ArrowUpIcon";
import { OptionsIcon } from "../icons/OptionsIcons";
import { PencilIcon } from "../icons/PencilIcon";
import { TrashIcon } from "../icons/TrashIcon";
import { headerHeight, pagePadding } from "../theme/sizes";
import { shareBookUrl } from "../urls";
import { NotFoundPage } from "./NotFoundPage";

export const BookPage = () => {
  const [sheetMap, setSheetMap] = useState<Record<string, Sheet>>({});

  const [book, setBook] = useState<Book | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const [isEditMode, setIsEditMode] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const scrollRef = useRef<FlatList>(null);
  const shareDialogRef = useRef<DialogRef>(null);
  const appendDialogRef = useRef<DialogRef>(null);
  const changeNameDialogRef = useRef<DialogRef>(null);
  const deleteDialogRef = useRef<DialogRef>(null);

  const params = useLocalSearchParams();
  const id = String(params.id);

  useEffect(() => {
    return observeBook(
      id,
      (data) => {
        setBook(data);
        setIsLoading(false);
      },
      (error) => alert(error.message),
    );
  }, [id]);

  useEffect(() => {
    return observeSheetCollection(
      (data) => {
        const map: Record<string, Sheet> = {};
        data.forEach((item) => {
          map[item.id] = item;
        });
        setSheetMap(map);
      },
      (error) => alert(error.message),
    );
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!book) {
    return <NotFoundPage />;
  }

  const data = book.sheets.map((id) => sheetMap[id]).filter(Boolean);

  return (
    <>
      <SafeAreaView>
        <Header
          title={
            isEditMode ? (
              <>
                <Pressable
                  style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
                  onPress={() => {
                    changeNameDialogRef.current?.open();
                  }}
                >
                  <Text>{book.name}</Text>
                  <PencilIcon width={18} />
                </Pressable>
              </>
            ) : (
              book.name
            )
          }
        >
          <Pressable
            style={{
              height: headerHeight,
              paddingHorizontal: pagePadding,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => setIsMenuVisible((v) => !v)}
          >
            <OptionsIcon />
          </Pressable>
        </Header>
      </SafeAreaView>

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

      <BookMenu
        book={book}
        isVisible={isMenuVisible}
        setIsVisible={setIsMenuVisible}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        onPressShare={() => {
          if (Platform.OS === "web") {
            shareDialogRef.current?.open();
          } else {
            Share.share({ url: shareBookUrl(book) });
          }
        }}
        onPressAppend={() => appendDialogRef.current?.open()}
        onPressChangeName={() => changeNameDialogRef.current?.open()}
        onPressDelete={() => deleteDialogRef.current?.open()}
      />

      <ShareDialog ref={shareDialogRef} url={shareBookUrl(book)} />
      <AppendSheetToBookDialog
        ref={appendDialogRef}
        book={book}
        scrollRef={scrollRef}
      />
      <ChangeBookNameDialog ref={changeNameDialogRef} book={book} />
      <DeleteBookDialog ref={deleteDialogRef} book={book} />
    </>
  );
};
