"use client";
import { AtomEffect, atom, selector } from "recoil";
import { CustomSession } from "@/auth";
import { PostLinkDataZod } from "@/app/api/v1/link/client";

const localStorageEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    if (typeof window === "undefined") return;

    // Retrieve the value stored at the specified key
    const stored = localStorage.getItem(key);
    if (stored !== null) {
      try {
        // Parse the stored string back into its original type
        const parsed = JSON.parse(stored) as T;
        // Initialize the atom value with the parsed data
        setSelf(parsed);
      } catch (error) {
        console.error(`Error parsing localStorage item "${key}":`, error);
      }
    }

    // Creates the callback triggered when the atom is changed
    onSet((newValue, _, isReset) => {
      if (isReset) {
        // If atom has been reset, remove it from local storage
        localStorage.removeItem(key);
      } else {
        // If value has changed, store the new value in local storage
        try {
          // Stringify and store the new value
          const serialized = JSON.stringify(newValue);
          localStorage.setItem(key, serialized);
        } catch (error) {
          console.error(
            `Error serializing value for localStorage key "${key}":`,
            error,
          );
        }
      }
    });
  };

export const userInfo = atom<CustomSession | Partial<CustomSession>>({
  key: "userInfo", // unique ID (with respect to other atoms/selectors)
  default: {
    user: undefined,
  }, // default value (aka initial value)
  effects_UNSTABLE: [
    localStorageEffect<CustomSession | Partial<CustomSession>>("userInfo"),
  ],
});

export const userLinks = atom<PostLinkDataZod[]>({
  key: "userLinks",
  default: [],
  effects_UNSTABLE: [
    localStorageEffect<PostLinkDataZod[]>("userLinks"),
  ]
})