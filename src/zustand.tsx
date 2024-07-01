import { create } from "zustand";
import { Action, State } from "./typing";

export const useNotif = create<State & Action>((set) => ({
  text: '',
  success: true,
  setText: (value) => set({ text: value }),
  setSuccess: (value) => set({ success: value })
}))
