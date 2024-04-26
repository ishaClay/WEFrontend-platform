import { createSlice } from "@reduxjs/toolkit";

export const CompanySlice = createSlice({
    name: "Company",
    initialState: {
        id: null,
    },
    reducers: {
        setCompanyData: (state, action) => {
            
            state.id = action.payload
        },
    },
});

export const { setCompanyData } = CompanySlice.actions;

export default CompanySlice.reducer;
