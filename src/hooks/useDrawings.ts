import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../store"

import { DecoratorType, DrawingType, addDrawing, removeDrawing } from "../store/reducers/drawings"

const useDrawings = (type?: DrawingGeometryTypes) => {
    const dispatch = useAppDispatch()

    const features = useSelector(({ drawings }: RootState) => {
        const features = type ? drawings.roots.features.filter(x => x.geometry.type === (type as string)) : drawings.roots.features

        return features.map(x => ({
            root: x,
            decorators: drawings.decorators.features.filter(y => y.properties.owner === x.id)
        }))
    })

    const dispatchAddDrawing = (feature: {
        root: DrawingType
        decorators: DecoratorType[]
    }) => dispatch(addDrawing(feature))

    const dispatchRemoveDrawing = (id: string) => dispatch(removeDrawing(id))

    return {
        features,
        dispatchAddDrawing,
        dispatchRemoveDrawing
    }
}

export default useDrawings