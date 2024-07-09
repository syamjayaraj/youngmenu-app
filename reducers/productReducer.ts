import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../services/api-service";
import { IProduct } from "../models/model";

export interface IInitialState {
  items: IProduct[];
  status: string;
  error: string | null;
}

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state: IInitialState) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state: IInitialState, action: any) => {
        state.status = "succeeded";
        state.items = action?.payload;
      })
      .addCase(fetchProducts.rejected, (state: IInitialState, action: any) => {
        state.status = "failed";
        state.error = action?.error?.message;
      });
  },
});

export default productsSlice.reducer;
