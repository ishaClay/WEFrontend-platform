import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import CompanyReducer from './reducer/CompanyReducer';
import QuestionReducer from './reducer/QuestionReducer';
import PillarReducer from './reducer/PillarReducer';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedCompanyReducer = persistReducer(persistConfig, CompanyReducer);
// const persistedQuestionReducer = persistReducer(persistConfig, QuestionReducer);
// const persistedPillarReducer = persistReducer(persistConfig, PillarReducer);


export const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
    reducer: {
        user: persistedCompanyReducer,
        question: QuestionReducer,
        pillar: PillarReducer
    },
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch