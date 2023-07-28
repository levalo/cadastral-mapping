import { useContext } from "react"
import { useSelector } from "react-redux"
import { featureCategoriesContext } from "../components/FeatureCategories"
import { RootState, useAppDispatch } from "../store"

import { addFeature, removeFeature } from "../store/reducers/project"

const useFeatures = (type?: FeatureType) => {
    const categories = useContext(featureCategoriesContext)

    const dispatch = useAppDispatch()

    const features = useSelector((state: RootState) => type ? state.project.features.filter(x => categories[x.category].type === type) : state.project.features)

    const dispatchAddFeature = (feature: Feature) => dispatch(addFeature(feature))

    const dispatchRemoveFeature = (featureIndex: number) => dispatch(removeFeature(featureIndex))

    return {
        features,
        dispatchAddFeature,
        dispatchRemoveFeature
    }
}

export default useFeatures