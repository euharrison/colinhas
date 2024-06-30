import { createContext } from "react";
import { Sheet } from "../database/types";

export const SheetsContext = createContext<Sheet[]>([]);
