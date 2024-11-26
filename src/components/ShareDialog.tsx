import { Link } from "expo-router";
import { forwardRef, useState } from "react";
import { Text, View } from "react-native";
import { Button } from "../components/Button";
import { Dialog, DialogRef } from "../components/Dialog";
import { WhatsappIcon } from "../icons/WhatsappIcon";
import { alert } from "../services/alert";
import { textGray } from "../theme/colors";

type Props = {
  url: string;
};

export const ShareDialog = forwardRef<DialogRef, Props>(({ url }, ref) => {
  const [hasCopied, setHasCopied] = useState(false);

  return (
    <Dialog ref={ref} title="Compartilhar">
      <Text selectable style={{ color: textGray, marginBottom: 16 }}>
        {url}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "stretch", gap: 8 }}>
        <Button
          style={{ flex: 1 }}
          onPress={async () => {
            try {
              await navigator.clipboard.writeText(url);
              setHasCopied(true);
            } catch (error) {
              alert(String(error));
            }
          }}
        >
          {hasCopied ? "Link Copiado!" : "Copiar Link"}
        </Button>
        <Link
          href={`https://api.whatsapp.com/send?text=${url}`}
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
