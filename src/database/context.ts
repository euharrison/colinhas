import { createContext } from "react";
import { Sheet } from "../database/types";

export type DataValue = Sheet[];

export const DataContext = createContext<DataValue>([]);
