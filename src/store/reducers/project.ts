import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: ProjectState = {
    features: [],
    name: 'New Project'
}

export const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        addFeature: (state, action: PayloadAction<FeatureLayer>) => {
            state.features.push(action.payload)
        },
    }
})

export const { addFeature } = projectSlice.actions

export default projectSlice.reducer