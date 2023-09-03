import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FeatureCollection, LineString, MultiPoint } from "geojson"
import { PolylineOptions, ImageMarkerOptions } from "leaflet"
import { createIdOf } from "../../tools/utils"

export type DrawingProperties = (PolylineOptions | ImageMarkerOptions) & { title: string, category: string }

export type DrawingGeometries = MultiPoint | LineString

const initialState: Record<string, FeatureCollection<DrawingGeometries, DrawingProperties>> = {}

export const drawingsSlice = createSlice({
    name: "drawing",
    initialState,
    reducers: {
        addDrawingAction: (state, action: PayloadAction<FeatureCollection<DrawingGeometries, DrawingProperties>[]>) => {
            action.payload.forEach(x => state[createIdOf(Object.keys(state).map(y => ({ id: y })))] = x)
            
        },
        removeDrawingAction: (state, action: PayloadAction<string>) => {
            delete state[action.payload]
        }
    }
})

export const { addDrawingAction, removeDrawingAction } = drawingsSlice.actions

export default drawingsSlice.reducer