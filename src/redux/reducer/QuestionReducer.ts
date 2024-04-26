import { createSlice } from "@reduxjs/toolkit";

export const QuestionSlice = createSlice({
    name: "Question",
    initialState: {
        activePillar: "",
        allPillar: [],
    },
    reducers: {
        setPillarName: (state: any, action) => {
            state.allPillar = action.payload;
            action.payload?.map((i: string) => state[i] = { questions: [] })

        },
        setActivePillar: (state, action) => {
            state.activePillar = action.payload
        },
        setQuestion: (state: any, action) => {
            state[action.payload.p] = action.payload.q
        }
    },
});

export const { setPillarName, setActivePillar, setQuestion } = QuestionSlice.actions;

export default QuestionSlice.reducer;
