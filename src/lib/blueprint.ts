"use client";
import { useSyncExternalStore } from "react";

// Shared on/off state for Blueprint mode. The switch lives in the Navbar (rendered per page)
// while the overlay lives in the root layout, so they share this tiny store instead of props.

const STORAGE_KEY = "ak-blueprint";
const listeners = new Set<() => void>();
let on = false;

export const blueprint = {
    get: () => on,
    set(next: boolean) {
        if (next === on) return;
        on = next;
        try { localStorage.setItem(STORAGE_KEY, next ? "1" : "0"); } catch { /* storage unavailable */ }
        listeners.forEach((l) => l());
    },
    toggle() { blueprint.set(!on); },
    /** Restores the viewer's last choice (a per-viewer convenience only) */
    restore() {
        try { blueprint.set(localStorage.getItem(STORAGE_KEY) === "1"); } catch { /* storage unavailable */ }
    },
    subscribe(listener: () => void) {
        listeners.add(listener);
        return () => { listeners.delete(listener); };
    },
};

export const useBlueprint = () => useSyncExternalStore(blueprint.subscribe, blueprint.get, () => false);
