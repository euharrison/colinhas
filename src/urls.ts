import { Sheet } from "./database/types";
import { slugify } from "./utils";

const appUrl = `https://colinhas.com`;

export const homeUrl = "/";
export const createUrl = "/create";
export const profileUrl = "/profile";
export const sheetUrl = (sheet: Sheet) => `/${sheet.id}/${slugify(sheet.name)}`;

export const shareSheetUrl = (sheet: Sheet) => `${appUrl}${sheetUrl(sheet)}`;
