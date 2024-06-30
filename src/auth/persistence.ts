import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence } from "firebase/auth";

export const persistence = getReactNativePersistence(ReactNativeAsyncStorage);
