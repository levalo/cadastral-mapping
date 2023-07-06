import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import project from "./reducers/project"

const store = configureStore({
    reducer: {
        project,
    }
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store