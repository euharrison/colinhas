import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { FlatList, Platform, Pressable, Share } from "react-native";
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
import { observeBook } from "../database/books";
import { observeSheetCollection } from "../database/sheets";
import { Book, Sheet } from "../database/types";
import { OptionsIcon } from "../icons/OptionsIcons";
import { PencilIcon } from "../icons/PencilIcon";
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
                  {book.name}
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

      <SheetList data={data} scrollRef={scrollRef} />

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
