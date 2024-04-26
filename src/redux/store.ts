import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import UserReducer from './reducer/UserReducer';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, UserReducer)


export const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
    reducer: {
        company: persistedReducer,
    },
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch