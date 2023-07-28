import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createUidOf } from "../../util"

const initialState: ProjectState = {
    points: [],
    features: [],
    name: 'New Project'
}

export const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        addFeature: (state, action: PayloadAction<Feature>) => {
            state.features.push(action.payload)
        },
        removeFeature: (state, action: PayloadAction<number>) => {
            state.features = state.features.filter((_, i) => i !== action.payload)
        },
        addPoints: (state, action: PayloadAction<Point[]>) => {
            action.payload.forEach(x => {
                x.uid = createUidOf(state.points)

                state.points.push(x)
            })
        },
        removePoints: (state, action: PayloadAction<Uid[]>) => {
            state.points = state.points.filter(x => !action.payload.find(y => y.uid === x.uid))
        },
        removePointsGroup: (state, action: PayloadAction<string>) => {
            state.points = state.points.filter(x => x.group !== action.payload)
        }
    }
})

export const { addFeature, removeFeature, addPoints, removePoints, removePointsGroup } = projectSlice.actions

export default projectSlice.reducer