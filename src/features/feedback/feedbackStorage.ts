import type { FeedbackEntry } from "./feedback.types";

const STORAGE_KEY = "catalog-feedback-v1";

function isFeedbackEntry(value: unknown): value is FeedbackEntry {
  if (typeof value !== "object" || value === null) return false;
  const entry = value as Record<string, unknown>;

  return (
    typeof entry.id === "string" &&
    typeof entry.name === "string" &&
    typeof entry.rating === "number" &&
    Number.isInteger(entry.rating) &&
    entry.rating >= 1 &&
    entry.rating <= 5 &&
    typeof entry.message === "string" &&
    typeof entry.createdAt === "string" &&
    !Number.isNaN(Date.parse(entry.createdAt))
  );
}

export function loadFeedback(): FeedbackEntry[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];

    const data: unknown = JSON.parse(saved);
    return Array.isArray(data) ? data.filter(isFeedbackEntry) : [];
  } catch {
    // Missing permissions or corrupted storage should not crash the app.
    return [];
  }
}

export function saveFeedback(items: FeedbackEntry[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}
