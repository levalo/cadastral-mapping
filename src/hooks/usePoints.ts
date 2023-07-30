import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../store"

import { PointType, addPoints, removePoints, removePointsGroup } from "../store/reducers/points"

const usePoints = () => {
    const dispatch = useAppDispatch()

    const { features } = useSelector(({ points }: RootState) => points)

    const groups = () => features.reduce<Record<string, Array<PointType & { index: number }>>>((acc, x, i) => ({ ...acc, [x.properties.group]: [...(acc[x.properties.group] || []), { ...x, index: i }] }), {})

    const filterByUid = (ids: string[]) => features.filter(x => ids.includes(x.id! as string))

    const dispatchAddPoints = (points: PointType[]) => dispatch(addPoints(points))

    const dispatchRemovePoints = (ids: string[]) => dispatch(removePoints(ids))

    const dispatchRemovePointsGroup = (group: string) => dispatch(removePointsGroup(group))

    return {
        features,
        groups,
        filterByUid,
        dispatchAddPoints,
        dispatchRemovePoints,
        dispatchRemovePointsGroup
    }
}

export default usePoints