import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useQueryBook } from "../hooks/useQueryBook";
import { useQuerySheet } from "../hooks/useQuerySheet";
import { borderGray, textGray } from "../theme/colors";
import { pagePadding } from "../theme/sizes";
import { viewSheetUrl } from "../urls";

const MusicButton = ({ id, bookId }: { id: string; bookId: string }) => {
  const { data: sheet } = useQuerySheet(id);

  if (!sheet) {
    return <></>;
  }

  return (
    <View style={{ padding: pagePadding }}>
      <Link href={viewSheetUrl(sheet, bookId)} asChild>
        <Pressable
          style={{
            borderWidth: 1,
            borderColor: borderGray,
            padding: 12,
            borderRadius: 8,
          }}
        >
          <Text style={{ fontSize: 12, color: textGray }}>Próxima Música:</Text>
          <Text style={{ fontSize: 14 }}>{sheet.name}</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export const NextMusicButton = ({
  sheetId,
  bookId,
}: {
  sheetId: string;
  bookId: string;
}) => {
  const { data: book } = useQueryBook(bookId);

  if (!book) {
    return <></>;
  }

  const index = book.sheets.findIndex((id) => id === sheetId);
  if (index === -1 || index === book.sheets.length - 1) {
    return <></>;
  }

  const nextMusicId = book.sheets[index + 1];

  return <MusicButton id={nextMusicId} bookId={bookId} />;
};
