import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { FeedbackEntry } from "./feedback.types";
import { loadFeedback } from "./feedbackStorage";

interface FeedbackState {
  items: FeedbackEntry[];
  storageError: string | null;
}

const initialState: FeedbackState = {
  items: loadFeedback(),
  storageError: null,
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    addFeedback: (state, action: PayloadAction<FeedbackEntry>) => {
      // Redux Toolkit uses Immer, so this produces an immutable update.
      state.items.push(action.payload);
    },
    setStorageError: (state, action: PayloadAction<string | null>) => {
      state.storageError = action.payload;
    },
  },
});

export const { addFeedback, setStorageError } = feedbackSlice.actions;
export default feedbackSlice.reducer;
