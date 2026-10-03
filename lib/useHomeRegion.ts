"use client";

import { useCallback, useSyncExternalStore } from "react";
import { isRegion } from "@/content/regions";
import type { Region } from "@/content/types";

// The region a Newcomer picked on Home Taste lives only in this browser, like the
// Starter Checklist (docs/adr/0003; .scratch/more-know-how/spec.md Q10).
const KEY = "tanglak:home-region:v1";
const listeners = new Set<() => void>();
let memory: string | null = null;

function read(): string {
  try {
    return window.localStorage.getItem(KEY) ?? "";
  } catch {
    return "";
  }
}

function subscribe(l: () => void) {
  listeners.add(l);
  const onStorage = (e: StorageEvent) => e.key === KEY && l();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", onStorage);
  };
}

export function useHomeRegion() {
  const raw = useSyncExternalStore(subscribe, () => memory ?? read(), () => "");
  const region: Region | undefined = isRegion(raw) ? raw : undefined;
  const setRegion = useCallback((next: Region) => {
    try {
      window.localStorage.setItem(KEY, next);
    } catch {
      // Storage blocked: the choice lasts until the page closes.
      memory = next;
    }
    listeners.forEach((l) => l());
  }, []);
  return { region, setRegion };
}
