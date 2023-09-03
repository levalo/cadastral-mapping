import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { LatLng } from "leaflet"
import { PointType, addPointsAction } from "./points"

export enum DrawerTypes  {
    DRAWING = "drawing",
    POINTS = "points",
    CONTOUR = "contour",
    POINT = "point"
}

export enum ToolTypes {
    NONE = "none",
    DOT = "dot",
    LINE = "line",
    POLYGON = "polygon",
    ADD = "add",
    REMOVE = "remove"
}

interface EditorState {
    showDrawer?: DrawerTypes
    activeTool: ToolTypes
    editingPoint?: PointType
    selectedPoints: PointType[]
}

const initialState: EditorState = {
    activeTool: ToolTypes.NONE,
    selectedPoints: []
}

export const createPointAction = createAsyncThunk(
    "editor/createPoint",
    async (payload: LatLng, { dispatch }) => {
        dispatch(setEditingPointAction({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [ payload.lat, payload.lng ]
            },
            properties: {
                group: 'new'
            }
        }))
    }
)

export const addCreatedPointAction = createAsyncThunk(
    "editor/addCreatedPoint",
    async (payload: PointType, { dispatch }) => {
        dispatch(addPointsAction([ payload ]))
    }
)

export const editorSlice = createSlice({
    name: "editor",
    initialState,
    reducers: {
        setShowDrawerAction: (state, action: PayloadAction<DrawerTypes | undefined>) => {
            state.showDrawer = action.payload
        },
        setEditingPointAction: (state, action: PayloadAction<PointType | undefined>) => {
            state.editingPoint = action.payload
        },
        addSelectedPointAction: (state, action: PayloadAction<PointType>) => {
            state.selectedPoints.push(action.payload)
        },
        removeSelectedPointAction: (state, action: PayloadAction<PointType>) => {
            state.selectedPoints = state.selectedPoints.filter(x => x.id !== action.payload.id)
        },
        setActiveToolAction: (state, action: PayloadAction<ToolTypes>) => {
            state.activeTool = action.payload
            state.editingPoint = undefined
        },
        clearSelectedPointsAction: (state) => {
            state.selectedPoints = []
        },
        setSelectedPointAction: (state, action: PayloadAction<PointType[]>) => {
            state.selectedPoints = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addCreatedPointAction.fulfilled, state => {
            state.editingPoint = undefined
        })
        
        builder.addCase(createPointAction.fulfilled, state => {
            state.showDrawer = DrawerTypes.POINT
        })
    }
})

export const { 
    setShowDrawerAction,
    setEditingPointAction,
    addSelectedPointAction, 
    removeSelectedPointAction,
    setActiveToolAction,
    clearSelectedPointsAction,
    setSelectedPointAction,
} = editorSlice.actions

export default editorSlice.reducer