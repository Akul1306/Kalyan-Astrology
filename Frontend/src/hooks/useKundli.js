"use client";
import { useKundliStore } from "@/lib/store";
export function useKundli() {
    const store = useKundliStore();
    return store;
}
