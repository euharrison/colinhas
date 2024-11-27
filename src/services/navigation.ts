import { router } from "expo-router";
import { homeUrl } from "../urls";

export const dismissAll = () => {
  if (router.canDismiss()) {
    router.dismissAll();
  } else {
    router.replace(homeUrl);
  }
};

export const goBack = () => {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.push(homeUrl);
  }
};
