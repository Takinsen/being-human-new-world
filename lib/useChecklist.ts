"use client";

import { useCallback, useSyncExternalStore } from "react";

// Starter Checklist progress lives only in this browser (docs/adr/0003).
const KEY = "tanglak:checklist:v1";
const listeners = new Set<() => void>();

function read(): string {
  try {
    return window.localStorage.getItem(KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function write(ids: string[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(ids));
  } catch {
    // Storage blocked: ticks last until the page closes.
    memory = JSON.stringify(ids);
  }
  listeners.forEach((l) => l());
}

let memory: string | null = null;

function subscribe(l: () => void) {
  listeners.add(l);
  const onStorage = (e: StorageEvent) => e.key === KEY && l();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", onStorage);
  };
}

function snapshot(): string {
  return memory ?? read();
}

export function useChecklist() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => "[]");
  let done: string[];
  try {
    done = JSON.parse(raw);
  } catch {
    done = [];
  }
  const toggle = useCallback(
    (id: string) => {
      write(done.includes(id) ? done.filter((d) => d !== id) : [...done, id]);
    },
    [done],
  );
  return { done, toggle };
}
