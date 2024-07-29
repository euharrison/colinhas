import { Sheet } from "./database/types";
import { slugify } from "./utils";

export const appUrl = __DEV__
  ? `http://localhost:8081`
  : `https://colinhas.com`;

export const termsUrl = `${appUrl}/legal/termos-de-uso.html`;
export const privacyPolicyUrl = `${appUrl}/legal/politica-de-privacidade.html`;

export const homeUrl = "/";
export const createUrl = "/create";
export const profileUrl = "/profile";
export const sheetUrl = (sheet: { id: string; name: string }) =>
  `/${sheet.id}/${slugify(sheet.name)}`;

export const shareSheetUrl = (sheet: Sheet) => `${appUrl}${sheetUrl(sheet)}`;

export const supportEmail = "contato@colinhas.com";
