import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { StateStorage } from "zustand/middleware";

const memoryStorage = new Map<string, string>();

function hasBrowserStorage() {
  return (
    typeof window !== "undefined" &&
    typeof window.localStorage?.getItem === "function" &&
    typeof window.localStorage?.setItem === "function" &&
    typeof window.localStorage?.removeItem === "function"
  );
}

function getWebStorage(): StateStorage {
  return {
    getItem: (name) => {
      if (!hasBrowserStorage()) {
        return memoryStorage.get(name) ?? null;
      }

      return window.localStorage.getItem(name);
    },
    setItem: (name, value) => {
      if (!hasBrowserStorage()) {
        memoryStorage.set(name, value);
        return;
      }

      window.localStorage.setItem(name, value);
    },
    removeItem: (name) => {
      if (!hasBrowserStorage()) {
        memoryStorage.delete(name);
        return;
      }

      window.localStorage.removeItem(name);
    },
  };
}

export const appStorage: StateStorage =
  process.env.NODE_ENV === "test"
    ? getWebStorage()
    : Platform.OS === "web"
    ? getWebStorage()
    : {
        getItem: (name) => AsyncStorage.getItem(name),
        setItem: (name, value) => AsyncStorage.setItem(name, value),
        removeItem: (name) => AsyncStorage.removeItem(name),
      };
