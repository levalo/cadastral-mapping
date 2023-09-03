import { RootState, useAppDispatch } from "../store"
import { useSelector } from "react-redux"
import { ToolTypes, addCreatedPointAction, createPointAction, setActiveToolAction, addSelectedPointAction, removeSelectedPointAction, clearSelectedPointsAction, setSelectedPointAction } from "../store/reducers/editor"
import { useMap } from "react-leaflet"
import { LeafletMouseEventHandlerFn } from "leaflet"
import { PointType, removePointsAction } from "../store/reducers/points"
import { useEffect } from "react"

const useTools = () => {
    const dispatch = useAppDispatch()
    const { activeTool, selectedPoints, editingPoint } = useSelector(({ editor }: RootState) => editor)
    const map = useMap()

    const setActiveTool = (newTool: typeof activeTool) => dispatch(setActiveToolAction(newTool))

    const mapClickHandler: LeafletMouseEventHandlerFn = ({ latlng, originalEvent }) => {
        // do nothing if not clicked on map
        if (originalEvent.target !== map.getContainer()) return
        
        if (activeTool === ToolTypes.ADD) dispatch(createPointAction(latlng))
    }

    const addCreatedPoint = (point: PointType) => dispatch(addCreatedPointAction(point))

    const removePoint = (point: PointType) => dispatch(removePointsAction([ point ]))

    const addSelectedPoint = (point: PointType) => dispatch(addSelectedPointAction(point))

    const removeSelectedPoint = (point: PointType)  => dispatch(removeSelectedPointAction(point))

    const togglePointSelection = (point: PointType) => isPointSelected(point) ? removeSelectedPoint(point) : addSelectedPoint(point)

    const isPointSelected = (point: PointType) => !!selectedPoints.find(x => x.id === point.id)

    const clearSelectedPoints = () => dispatch(clearSelectedPointsAction())

    const setSelectedPoints = (points: PointType[]) => dispatch(setSelectedPointAction(points))

    useEffect(() => {
        map.on('click', mapClickHandler)

        return () => {
            map.off('click', mapClickHandler)
        }
    }, [ mapClickHandler ])

    useEffect(() => {
        map.getContainer().style.cursor = ""

        if (activeTool === ToolTypes.ADD) map.getContainer().style.cursor = "crosshair"
    }, [ activeTool ])

    return {
        activeTool,
        selectedPoints,
        editingPoint,
        setActiveTool,
        addCreatedPoint,
        removePoint,
        addSelectedPoint,
        removeSelectedPoint,
        togglePointSelection,
        isPointSelected,
        clearSelectedPoints,
        setSelectedPoints
    }
}

export default useTools