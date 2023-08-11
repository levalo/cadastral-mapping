import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Feature, FeatureCollection, LineString, MultiPoint } from "geojson"
import { PolylineOptions, ImageMarkerOptions } from "leaflet"
import { createIdOf } from "../../tools/utils"

type DrawingProperties = (PolylineOptions | ImageMarkerOptions) & { title: string }

type DecoratorProperties = (PolylineOptions | ImageMarkerOptions) & { owner?: string }

type IsolineProperties = PolylineOptions & { owner?: string }

type DrawingGeometries = MultiPoint | LineString

export type DrawingType = Feature<DrawingGeometries, DrawingProperties>

export type DecoratorType = Feature<DrawingGeometries, DecoratorProperties>

export type IsolineType = Feature<LineString, IsolineProperties>

interface DrawingsState {
    roots: FeatureCollection<DrawingGeometries, DrawingProperties>
    decorators: FeatureCollection<DrawingGeometries, DecoratorProperties>
    isolines: FeatureCollection<LineString, IsolineProperties>
}

const initialState: DrawingsState = {
    roots: {
        type: 'FeatureCollection',
        features: []
    },
    decorators: {
        type: 'FeatureCollection',
        features: []
    },
    isolines: {
        type: 'FeatureCollection',
        features: []
    }
}

export const drawingsSlice = createSlice({
    name: "drawing",
    initialState,
    reducers: {
        addDrawingAction: (state, action: PayloadAction<{ root: DrawingType, decorators?: DecoratorType[], isolines?: IsolineType[] }>) => {
            const root = { ...action.payload.root, id: createIdOf(state.roots.features) }

            state.roots.features.push(root)

            action.payload.decorators?.forEach(x => {
                x.id = createIdOf(state.decorators.features)
                x.properties.owner = root.id

                state.decorators.features.push(x)
            })

            action.payload.isolines?.forEach(x => {
                x.id = createIdOf(state.isolines.features)
                x.properties.owner = root.id

                state.isolines.features.push(x)
            })
        },
        removeDrawingAction: (state, action: PayloadAction<string>) => {
            state.roots.features = state.roots.features.filter(x => x.id !== action.payload)
            state.decorators.features = state.decorators.features.filter(x => x.properties.owner !== action.payload)
            state.isolines.features = state.isolines.features.filter(x => x.properties.owner !== action.payload)
        }
    }
})

export const { addDrawingAction, removeDrawingAction } = drawingsSlice.actions

export default drawingsSlice.reducer