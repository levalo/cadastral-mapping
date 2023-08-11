import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../store"

import { DecoratorType, DrawingType, IsolineType, addDrawingAction, removeDrawingAction } from "../store/reducers/drawings"
import { DrawingCategory } from "../components/DrawingCategories"
import { Feature, Point } from "geojson"
import { createContourMap } from "../tools/geo"

const useDrawings = (type?: DrawingGeometryTypes) => {
    const dispatch = useAppDispatch()

    const features = useSelector(({ drawings }: RootState) => {
        const features = type ? drawings.roots.features.filter(x => x.geometry.type === (type as string)) : drawings.roots.features

        return features.map(x => ({
            root: x,
            decorators: drawings.decorators.features.filter(y => y.properties.owner === x.id),
            isolines: drawings.isolines.features.filter(y => y.properties.owner === x.id)
        }))
    })

    const removeDrawing = (id: string) => dispatch(removeDrawingAction(id))

    const addDrawing = (name: string, category: DrawingCategory, points: Feature<Point, PointProperties>[]) => {
        const root: DrawingType = {
            type: 'Feature',
            geometry: category.type === 'MultiLineString' ? {
                type: 'LineString',
                coordinates: []
            } : {
                type: category.type,
                coordinates: points.map(x => x.geometry.coordinates)
            },
            properties: {
                ...category.options,
                title: name
            }
        }

        const decorators: DecoratorType[] = []

        if (category.decorators) {
            decorators.push(...category.decorators.map(x => ({
                type: 'Feature',
                geometry: {
                    type: x.type,
                    coordinates: points.map(x => x.geometry.coordinates)
                },
                properties: {
                    ...x.options
                }
            }) as DecoratorType))
        }

        const isolines: IsolineType[] = []

        if (category.type === 'MultiLineString') {
            isolines.push(...createContourMap(points))
        }

        dispatch(addDrawingAction({ root, decorators, isolines }))
    }

    return {
        features,
        addDrawing,
        removeDrawing,
    }
}

export default useDrawings