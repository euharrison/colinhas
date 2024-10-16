import { Timestamp } from "firebase/firestore";

export const getMillis = (value: unknown): number =>
  value instanceof Timestamp ? value.toMillis() : Date.now();
