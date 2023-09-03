import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createIdOf } from "../../tools/utils"
import { Feature, FeatureCollection, Point } from "geojson"

export type PointType = Feature<Point, PointProperties>

const initialState: FeatureCollection<Point, PointProperties> = {
    type: 'FeatureCollection',
    features: []
}

export const pointsSlice = createSlice({
    name: "points",
    initialState,
    reducers: {
        addPointsAction: (state, action: PayloadAction<PointType[]>) => {
            action.payload.forEach(x => {
                x.id = createIdOf(state.features)

                state.features.push(x)
            })
        },
        removePointsAction: (state, action: PayloadAction<PointType[]>) => {
            state.features = state.features.filter(x => !action.payload.find(y => y.id === x.id!))
        },
        removePointsByGroupAction: (state, action: PayloadAction<string>) => {
            state.features = state.features.filter(x => x.properties.group !== action.payload)
        }
    }
})

export const { addPointsAction, removePointsAction, removePointsByGroupAction } = pointsSlice.actions

export default pointsSlice.reducer