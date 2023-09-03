import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import drawings from "./reducers/drawings"
import points from "./reducers/points";
import editor from "./reducers/editor";
import undoable from "redux-undo";

const store = configureStore({
    reducer: {
        drawings: undoable(drawings),
        points: undoable(points),
        editor
    }
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store