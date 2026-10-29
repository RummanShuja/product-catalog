import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts } from "./productsApi";
import type { Product } from "./product.types";

interface ProductsState {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { state: { products: ProductsState } }
>("products/fetchProducts", async () => getProducts(), {
  // Check the live store, so two components cannot start the same request.
  // A failed request may be retried; a successful request is reused.
  condition: (_, { getState }) => {
    const status = getState().products.status;
    return status === "idle" || status === "failed";
  },
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong.";
      });
  },
});

export default productsSlice.reducer;
