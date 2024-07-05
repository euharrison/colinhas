import { router } from "expo-router";

export const dismissAll = () => {
  if (router.canDismiss()) {
    router.dismissAll();
  } else {
    router.replace("/");
  }
};

export const goBack = () => {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace("/");
  }
};
