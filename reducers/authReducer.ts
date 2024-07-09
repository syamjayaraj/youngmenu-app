import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { postLogin } from "../services/api-service";

export interface IInitialState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: IInitialState = {
  token: null,
  isAuthenticated: true,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postLogin.fulfilled, async (state, action) => {
        console.log(action?.payload, "error");
        if (action?.payload.error) {
        }
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        await AsyncStorage.setItem("token", action.payload.token);
      })
      .addCase(postLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to login";
      });
  },
});

export const { logout } = authSlice.actions;

export const logoutUser = () => async (dispatch: any) => {
  await AsyncStorage.removeItem("token");
  dispatch(logout());
};

export default authSlice.reducer;
