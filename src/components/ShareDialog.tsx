import { Link } from "expo-router";
import { forwardRef, useState } from "react";
import { Text, View } from "react-native";
import { Button } from "../components/Button";
import { Dialog, DialogRef } from "../components/Dialog";
import { Sheet } from "../database/types";
import { WhatsappIcon } from "../icons/WhatsappIcon";
import { alert } from "../services/alert";
import { textGray } from "../theme/colors";
import { shareSheetUrl } from "../urls";

type Props = {
  sheet: Sheet;
};

export const ShareDialog = forwardRef<DialogRef, Props>(({ sheet }, ref) => {
  const [hasCopied, setHasCopied] = useState(false);

  return (
    <Dialog ref={ref} title="Share">
      <Text
        selectable
        numberOfLines={1}
        style={{ color: textGray, marginBottom: 16 }}
      >
        {shareSheetUrl(sheet)}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "stretch", gap: 8 }}>
        <Button
          style={{ flex: 1 }}
          onPress={async () => {
            try {
              await navigator.clipboard.writeText(shareSheetUrl(sheet));
              setHasCopied(true);
            } catch (error) {
              alert(String(error));
            }
          }}
        >
          {hasCopied ? "Link Copiado!" : "Copiar Link"}
        </Button>
        <Link
          href={`https://api.whatsapp.com/send?text=${shareSheetUrl(sheet)}`}
          target="_blank"
        >
          <Button>
            <WhatsappIcon />
          </Button>
        </Link>
      </View>
    </Dialog>
  );
});
