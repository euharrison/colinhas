import * as DocumentPicker from "expo-document-picker";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { Pressable } from "react-native";
import { LoadingIcon } from "../icons/LoadingIcon";
import { SheetIcon } from "../icons/SheetIcon";
import { alert } from "../services/alert";
import { storage } from "../storage/storage";
import { backgroundGray, white } from "../theme/colors";

export const FileUploadButton = ({
  onPress,
}: {
  onPress: (url: string) => void;
}) => {
  const [uploading, setUploading] = useState(false);

  const pickAndUploadFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [".mxl", ".jpg", ".png", ".pdf"],
      });
      const file = result.assets?.[0];
      if (result.canceled || !file) {
        return;
      }
      if (file.mimeType === "application/pdf") {
        alert("PDF ainda não suportado 🥲");
        return;
      }
      const { uri, name } = file;
      const response = await fetch(uri);
      const blob = await response.blob();

      const storageRef = ref(storage, `${Date.now()}_${name}`);
      const uploadTask = uploadBytesResumable(storageRef, blob);

      setUploading(true);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
          alert(error.message);
          setUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            onPress(downloadURL);
            setUploading(false);
          });
        },
      );
    } catch (error) {
      alert(error instanceof Error ? error.message : String(error));
    } finally {
      setUploading(false);
    }
  };

  return (
    <Pressable
      onPress={pickAndUploadFile}
      disabled={uploading}
      style={({ pressed }) => ({
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        paddingHorizontal: 16,
        borderRadius: 999,
        backgroundColor: pressed ? backgroundGray : white,
      })}
    >
      {uploading ? <LoadingIcon width={18} height={18} /> : <SheetIcon />}
    </Pressable>
  );
};
