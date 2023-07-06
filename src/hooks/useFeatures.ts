import { useSelector } from "react-redux"
import { IsohypseFeatureCategories, LineFeatureCategories, PointFeatureCategories, PolygonFeatureCategories } from "../constants"
import { RootState, useAppDispatch } from "../store"

import { addFeature } from "../store/reducers/project"

const useFeatures = (category?: typeof PointFeatureCategories | typeof LineFeatureCategories | typeof PolygonFeatureCategories | typeof IsohypseFeatureCategories) => {
    const dispatch = useAppDispatch()

    const features = useSelector((state: RootState) => category ? state.project.features.filter(x => x.category in category) : state.project.features)

    const handleAddFeature = (feature: FeatureLayer) => dispatch(addFeature(feature))

    return {
        features,
        handleAddFeature
    }
}

export default useFeatures