import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import drawings from "./reducers/drawings"
import points from "./reducers/points";

const store = configureStore({
    reducer: {
        drawings,
        points
    }
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store