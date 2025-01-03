import { Book, Sheet } from "./database/types";
import { slugify } from "./utils";

export const appUrl = __DEV__
  ? `http://localhost:8081`
  : `https://colinhas.com`;

export const termsUrl = `${appUrl}/legal/termos-de-uso.html`;
export const privacyPolicyUrl = `${appUrl}/legal/politica-de-privacidade.html`;

export const homeUrl = "/";

export const profileUrl = "/profile";

export const createSheetUrl = "/musica/nova";

export const viewSheetUrl = (sheet: Partial<Sheet>) =>
  `/musica/${sheet.id}/${slugify(sheet.name)}`;

export const updateSheetUrl = (sheet: Partial<Sheet>) =>
  `/musica/${sheet.id}/${slugify(sheet.name)}/update`;

export const bookUrl = (book: Partial<Book>) =>
  `/lista/${book.id}/${slugify(book.name)}`;

export const mySheetsUrl = "/lista/minhas";

export const shareSheetUrl = (sheet: Partial<Sheet>) =>
  `${appUrl}${viewSheetUrl(sheet)}`;

export const shareBookUrl = (book: Partial<Book>) =>
  `${appUrl}${bookUrl(book)}`;

export const supportEmail = "contato@colinhas.com";
