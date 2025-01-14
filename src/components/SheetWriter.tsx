import { useRef, useState } from "react";
import { TextInput, View } from "react-native";
import { Key, Sheet } from "../database/types";
import { useFormatKey } from "../hooks/useFormatKey";
import { useFormatSheet } from "../hooks/useFormatSheet";
import { useLocalSettings } from "../hooks/useLocalSettings";
import { ArrowForwardIcon } from "../icons/ArrowForwardIcon";
import { alert } from "../services/alert";
import { textGray } from "../theme/colors";
import { pagePadding } from "../theme/sizes";
import { DialogRef, openDialog } from "./Dialog";
import { FAB } from "./FAB";
import { NotesKeyboard, specialChars } from "./NotesKeyboard";
import { SaveSheetDialog } from "./SaveSheetDialog";

export const SheetWriter = ({ sheet }: { sheet?: Sheet }) => {
  const { settings } = useLocalSettings();
  const formatSheet = useFormatSheet();
  const formatKey = useFormatKey();

  const [key, setKey] = useState(sheet ? formatKey(sheet) : undefined);
  const [value, setValue] = useState(sheet?.data ? formatSheet(sheet) : "");
  const [selection, setSelection] = useState({
    start: sheet?.data.length ?? 0,
    end: sheet?.data.length ?? 0,
  });

  const inputRef = useRef<TextInput>(null);
  const saveDialogRef = useRef<DialogRef>(null);

  const onPressNote = (note: string) => {
    let { start, end } = selection;

    const hasSelectionRange = end - start !== 0;
    const isCursorAtTheEnd = !hasSelectionRange && end >= value.trim().length;
    const isPreviousCharAnEmptyString = value[start - 1] === " ";
    const isAddingSpecialChar = specialChars.includes(note);

    const shouldRemovePreviousChar =
      isCursorAtTheEnd && isPreviousCharAnEmptyString && isAddingSpecialChar;
    if (shouldRemovePreviousChar) {
      start--;
    }
    const valueBeforeCursor = value.slice(0, start);
    const valueAfterCursor = value.slice(end);

    let charsToAdd = note;
    if (isCursorAtTheEnd) {
      charsToAdd += " ";
    }

    setValue(`${valueBeforeCursor}${charsToAdd}${valueAfterCursor}`);

    const newPosition = start + charsToAdd.length;
    setSelection({ start: newPosition, end: newPosition });

    inputRef.current?.focus();
  };

  const onChangeKey = (value?: Key) => {
    setKey(value);
    inputRef.current?.focus();
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <TextInput
          ref={inputRef}
          style={{
            padding: pagePadding,
            flex: 1,
            fontSize: 20,
            fontWeight: "500",
          }}
          placeholder="Do Re Mi Fa..."
          placeholderTextColor={textGray}
          multiline
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          autoFocus
          textAlignVertical="top"
          value={value}
          selection={selection}
          onSelectionChange={(e) => {
            setSelection(e.nativeEvent.selection);
          }}
          onChangeText={(newValue) => {
            setValue(newValue);
          }}
        />
        <FAB
          onPress={() => {
            if (!value) {
              alert("Escreva sua cola antes de salvar");
            } else {
              openDialog(saveDialogRef);
            }
          }}
        >
          <ArrowForwardIcon />
        </FAB>
      </View>
      <NotesKeyboard
        keyValue={key}
        onChangeKey={onChangeKey}
        onPressNote={onPressNote}
      />
      <SaveSheetDialog
        ref={saveDialogRef}
        id={sheet?.id}
        defaultValues={{
          name: sheet?.name ?? "",
          data: value,
          instrument: settings.instrument!, // TODO
          key,
          unlisted: sheet?.unlisted,
        }}
      />
    </>
  );
};
