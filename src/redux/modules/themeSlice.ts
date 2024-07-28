import { createSlice } from "@reduxjs/toolkit";
import { ThemeState } from "@/redux/interface/index";

const initialState: ThemeState = {
  mode: "light",
};
export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});
export const { changeMode } = themeSlice.actions;

export default themeSlice.reducer;
