import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createIdOf } from "../../util"
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
        addPoints: (state, action: PayloadAction<PointType[]>) => {
            action.payload.forEach(x => {
                x.id = createIdOf(state.features)

                state.features.push(x)
            })
        },
        removePoints: (state, action: PayloadAction<string[]>) => {
            state.features = state.features.filter(x => !action.payload.includes(x.id! as string))
        },
        removePointsGroup: (state, action: PayloadAction<string>) => {
            state.features = state.features.filter(x => x.properties.group !== action.payload)
        }
    }
})

export const { addPoints, removePoints, removePointsGroup } = pointsSlice.actions

export default pointsSlice.reducer