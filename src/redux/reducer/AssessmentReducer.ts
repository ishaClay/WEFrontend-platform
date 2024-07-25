import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AssessmentState {
  selectedQuestionType: string[];
  questionOption: any[];
}

const initialState: AssessmentState = {
  selectedQuestionType: [],
  questionOption: [],
};

const AssessmentSlice = createSlice({
  name: "Assessment",
  initialState,
  reducers: {
    setQuestionType: (state, action: PayloadAction<any>) => {
      state.selectedQuestionType.push(action.payload);
    },
    addQuestion: (
      state,
      action: PayloadAction<{ index: number; question: string; type: string }>
    ) => {
      while (state.questionOption.length <= action.payload.index) {
        state.questionOption.push({});
      }

      const item = state.questionOption[action.payload.index];
      if (item) {
        item.question = action.payload.question;
        item.type = action.payload.type;
      }
    },
    addPoint: (
      state,
      action: PayloadAction<{ index: number; point: number }>
    ) => {
      while (state.questionOption.length <= action.payload.index) {
        state.questionOption.push({});
      }

      const item = state.questionOption[action.payload.index];
      if (item) {
        item.point = action.payload.point;
      }
    },
    addOption: (
      state,
      action: PayloadAction<{ option: any; i: number; iIndex: number }>
    ) => {
      while (state.questionOption.length <= action.payload.i) {
        state.questionOption.push({});
      }

      const item = state.questionOption[action.payload.i];
      if (item) {
        if (!item.option) {
          item.option = [];
        }

        while (item.option.length <= action.payload.iIndex) {
          item.option.push("");
        }

        item.option[action.payload.iIndex] = action.payload.option;
      }
    },
    addAnswer: (state, action: PayloadAction<{ answer: any; i: number }>) => {
      while (state.questionOption.length <= action.payload.i) {
        state.questionOption.push({});
      }

      const item = state.questionOption[action.payload.i];
      if (item) {
        item.answer = action.payload.answer;
      }
    },
    removeOption: (
      state,
      action: PayloadAction<{ i: number; iIndex: number }>
    ) => {
      const item = state.questionOption[action.payload.i];
      if (item && item.option) {
        item.option.splice(action.payload.iIndex, 1);
      }
    },
  },
});

export const {
  setQuestionType,
  addQuestion,
  addPoint,
  addOption,
  addAnswer,
  removeOption,
} = AssessmentSlice.actions;

export default AssessmentSlice.reducer;
