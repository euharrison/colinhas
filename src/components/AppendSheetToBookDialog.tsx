import { forwardRef, RefObject } from "react";
import { FlatList, useWindowDimensions, View } from "react-native";
import { closeDialog, Dialog, DialogRef } from "./Dialog";
import { appendSheetToBook } from "../database/books";
import { Book, Sheet } from "../database/types";
import { useQuerySheetCollecion } from "../hooks/useSheetCollection";
import { LoadingPage } from "./LoadingPage";
import { SheetList } from "./SheetList";

type Props = {
  book: Book;
  scrollRef?: RefObject<FlatList>;
};

export const AppendSheetToBookDialog = forwardRef<DialogRef, Props>(
  ({ book, scrollRef }, ref) => {
    const { data, isLoading } = useQuerySheetCollecion();
    const { height } = useWindowDimensions();

    if (isLoading) {
      return <LoadingPage />;
    }

    return (
      <Dialog ref={ref} title="Adicionar">
        <View
          style={{
            marginHorizontal: -20,
            marginBottom: -20,
            height: height - 103,
          }}
        >
          <SheetList
            data={data}
            onPress={(sheet: Sheet) => {
              appendSheetToBook(book.id, sheet.id);
              closeDialog(ref);
              setTimeout(() => {
                scrollRef?.current?.scrollToEnd();
              }, 100);
            }}
          />
        </View>
      </Dialog>
    );
  },
);
