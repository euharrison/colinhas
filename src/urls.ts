import { Sheet } from "./database/types";
import { slugify } from "./utils";

export const appUrl = `https://colinhas.com`;
export const termsUrl = `${appUrl}/legal/termos-de-uso.html`;

export const homeUrl = "/";
export const createUrl = "/create";
export const profileUrl = "/profile";
export const sheetUrl = (sheet: Sheet) => `/${sheet.id}/${slugify(sheet.name)}`;

export const shareSheetUrl = (sheet: Sheet) => `${appUrl}${sheetUrl(sheet)}`;
