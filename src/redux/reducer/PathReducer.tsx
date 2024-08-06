import { UserRole } from "@/types/UserRole";
import { createSlice } from "@reduxjs/toolkit";
const userData = JSON.parse(localStorage.getItem("user") as string);
console.log(UserRole[userData?.query?.role]);

export const PathSlice = createSlice({
  name: "Path",
  initialState: {
    paths: [
      {
        label: "Dashboard",
        link: `/${UserRole[
          userData?.query?.role
        ].toLocaleLowerCase()}/dashboard`,
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
