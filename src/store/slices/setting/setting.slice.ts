import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {};

const initialState: TInitialState = {};

const settingSlice = createSlice({
   name: `settingSlice`,
   initialState,
   reducers: {},
});

export const {} = settingSlice.actions;

export default settingSlice.reducer;
