import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../store"

import { PointType, addPointsAction, removePointsAction, removePointsByGroupAction } from "../store/reducers/points"
import { Feature, Point } from "geojson"

const usePoints = () => {
    const dispatch = useAppDispatch()

    const { features: points } = useSelector(({ points }: RootState) => points.present)

    const groups = () => points.reduce<Record<string, Array<PointType & { index: number }>>>((acc, x, i) => ({ ...acc, [x.properties.group]: [...(acc[x.properties.group] || []), { ...x, index: i }] }), {})

    const filterByUid = (ids: string[]) => ids.map(x => points.find(y => y.id === x)).filter(x => x !== undefined) as Feature<Point, PointProperties>[]

    const addPoints = (points: PointType[]) => dispatch(addPointsAction(points))

    const removePoints = (points: PointType[]) => dispatch(removePointsAction(points))

    const removePointsByGroup = (group: string) => dispatch(removePointsByGroupAction(group))

    return {
        points,
        groups,
        filterByUid,
        addPoints,
        removePoints,
        removePointsByGroup
    }
}

export default usePoints