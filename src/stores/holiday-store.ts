import { writable } from "svelte/store";
import type { Holiday } from "../types/holiday";

export const holidays = writable([] as Holiday[]);
