import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../reducers/productReducer";
import cartReducer from "../reducers/cartReducer";
import authReducer from "../reducers/authReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
  },
});
