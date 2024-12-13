import { Book, Sheet } from "./database/types";
import { slugify } from "./utils";

export const appUrl = __DEV__
  ? `http://localhost:8081`
  : `https://colinhas.com`;

export const termsUrl = `${appUrl}/legal/termos-de-uso.html`;
export const privacyPolicyUrl = `${appUrl}/legal/politica-de-privacidade.html`;

export const homeUrl = "/";
export const profileUrl = "/profile";

export const createUrl = "/create";
export const viewSheetUrl = (sheet: { id: string; name: string }) =>
  `/musica/${sheet.id}/${slugify(sheet.name)}`;
export const updateSheetUrl = (sheet: { id: string; name: string }) =>
  `/musica/${sheet.id}/${slugify(sheet.name)}/update`;

export const bookUrl = (book: { id: string; name: string }) =>
  `/lista/${book.id}/${slugify(book.name)}`;
export const mySheetsUrl = "/lista/minhas";

export const shareSheetUrl = (sheet: Sheet) =>
  `${appUrl}${viewSheetUrl(sheet)}`;
export const shareBookUrl = (book: Book) => `${appUrl}${bookUrl(book)}`;

export const supportEmail = "contato@colinhas.com";
