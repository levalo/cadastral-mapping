import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../store"

import { addPoints, removePoints, removePointsGroup } from "../store/reducers/project"

const usePoints = () => {
    const dispatch = useAppDispatch()

    const points = useSelector((state: RootState) => state.project.points)

    const groups = () => points.reduce<Record<string, Array<Point & { index: number }>>>((acc, x, i) => ({ ...acc, [x.group]: [...(acc[x.group] || []), { ...x, index: i }] }), {})

    const filterByUid = (uids: string[]) => points.filter(x => uids.includes(x.uid!))

    const dispatchAddPoints = (points: Point[]) => dispatch(addPoints(points))

    const dispatchRemovePoints = (points: Uid[]) => dispatch(removePoints(points))

    const dispatchRemovePointsGroup = (group: string) => dispatch(removePointsGroup(group))

    return {
        points,
        groups,
        filterByUid,
        dispatchAddPoints,
        dispatchRemovePoints,
        dispatchRemovePointsGroup
    }
}

export default usePoints