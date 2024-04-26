import { createSlice } from "@reduxjs/toolkit";

export const PathSlice = createSlice({
	name: "Path",
	initialState: {
		paths: [
			{
				name: "Home",
				link: "/",
			},
		],
	},
	reducers: {
		setPath: (state, action) => {
			state.paths = action.payload;
		},
		removeLastPath: (state) => {
			state.paths.pop();
		},
	},
});

export const { setPath } = PathSlice.actions;

export default PathSlice.reducer;
