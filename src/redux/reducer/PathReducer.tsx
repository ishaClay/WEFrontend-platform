import { createSlice } from "@reduxjs/toolkit";
export const PathSlice = createSlice({
	name: "Path",
	initialState: {
		paths: [
			{
				label: "Dashboard",
				link: `/dashboard`,
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
