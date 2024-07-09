import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ILoginDetails } from "../models/model";
import { apiUrl } from "../config";

export const postLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }: ILoginDetails) => {
    const response = await axios.postForm(`${apiUrl}auth/login`, {
      email,
      password,
    });
    return response.data;
  }
);

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(
      "https://api.youngmenu.com/api/items?populate=*"
    );
    return response.data;
  }
);
