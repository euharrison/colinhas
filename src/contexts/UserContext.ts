import { User } from "firebase/auth";
import { createContext } from "react";

export const UserContext = createContext<User | undefined>(undefined);
