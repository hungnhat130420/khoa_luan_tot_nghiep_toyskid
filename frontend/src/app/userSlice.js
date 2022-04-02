import signInAPI from "../api/signInAPI";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const signin = createAsyncThunk("user/signin", async (payload) => {
  const data = await signInAPI.signIn(payload);
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
  localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));
  return data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem("user")),
  },
  reducers: {},
  extraReducers: {
    [signin.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { reducer } = userSlice;
export default reducer;
