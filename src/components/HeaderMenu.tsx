import { Pressable } from "react-native";
import { ListMenuRef, openListMenu } from "../components/ListMenu";
import { OptionsIcon } from "../icons/OptionsIcons";
import { headerHeight, pagePadding } from "../theme/sizes";

export const HeaderMenu = ({
  listMenuRef,
}: {
  listMenuRef: React.RefObject<ListMenuRef>;
}) => {
  return (
    <Pressable
      style={{
        height: headerHeight,
        paddingHorizontal: pagePadding,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={() => openListMenu(listMenuRef)}
    >
      <OptionsIcon />
    </Pressable>
  );
};
