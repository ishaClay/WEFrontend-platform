import { createSlice } from "@reduxjs/toolkit";


export const PillarSlice = createSlice({
    name: "pillars",
    initialState: {
        maturitypillar: [],
    },
    reducers: {
        setMaturitypillar: (state, action) => {
            state.maturitypillar = action.payload;
        },
        setPillars: (state, action) => {
            console.log("action.payload", action.payload);
            state.maturitypillar.find((i) => i.pillarid === action.payload.id).checked = action.payload.checked

            // state.pillars = action.payload;
        }
    },
})


export const { setPillars, setMaturitypillar } = PillarSlice.actions
export default PillarSlice.reducer  