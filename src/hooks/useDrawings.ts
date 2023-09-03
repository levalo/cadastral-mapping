import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../store"

import { DrawingGeometries, DrawingProperties, addDrawingAction, removeDrawingAction } from "../store/reducers/drawings"
import { FeatureCollection } from "geojson"

const useDrawings = () => {
    const dispatch = useAppDispatch()

    const drawings = useSelector(({ drawings }: RootState) => Object.keys(drawings.present).map(x => ({ id: x, value: drawings.present[x] })))

    const removeDrawing = (id: string) => dispatch(removeDrawingAction(id))

    const addDrawing = (data: FeatureCollection<DrawingGeometries, DrawingProperties>[]) => dispatch(addDrawingAction(data))

    return {
        drawings,
        addDrawing,
        removeDrawing,
    }
}

export default useDrawings