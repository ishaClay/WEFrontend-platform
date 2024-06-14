import { createSlice } from "@reduxjs/toolkit";

export const QuestionSlice = createSlice({
    name: "Question",
    initialState: {
        activePillar: "",
        allPillar: [],
        temp: null
    },
    reducers: {
        setPillarName: (state: any, action) => {
            state.allPillar = action.payload;
            // action.payload?.map((i: string) => state[i] = { questions: [] })
        },
        setActivePillar: (state, action) => {
            state.activePillar = action.payload
        },
        setQuestion: (state: any, action) => {
            state[action.payload.p] = action.payload.q
        },
        setAnswer: (state: any, action) => {
            state[state.activePillar][action.payload.qId].options[action.payload.oId].checked = true
            action.payload.arr.map((_: any, index: number) => {
                if (action.payload.oId !== index) {
                    state[state.activePillar][action.payload.qId].options[index].checked = false
                }

            })
        },
        setGettedAnswer: (state: any, action) => {
            state[action.payload.name] = action.payload.updatedAnswers
        }


    },
});

export const { setPillarName, setActivePillar, setQuestion, setAnswer, setGettedAnswer } = QuestionSlice.actions;

export default QuestionSlice.reducer;
