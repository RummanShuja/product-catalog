import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice.ts";
import feedbackReducer, {
  setStorageError,
} from "../features/feedback/feedbackSlice";
import { saveFeedback } from "../features/feedback/feedbackStorage";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    feedback: feedbackReducer,
  },
});

// Save only when feedback changes, not whenever products or UI state change.
let previousFeedback = store.getState().feedback.items;

store.subscribe(() => {
  const currentFeedback = store.getState().feedback.items;
  if (currentFeedback === previousFeedback) return;

  // Update this before dispatching below to avoid recursive saving.
  previousFeedback = currentFeedback;

  try {
    saveFeedback(currentFeedback);
    store.dispatch(setStorageError(null));
  } catch {
    store.dispatch(
      setStorageError(
        "Your feedback is available for this visit, but could not be saved in this browser. It may disappear after a refresh.",
      ),
    );
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
