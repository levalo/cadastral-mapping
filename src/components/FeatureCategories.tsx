import { createContext, FC, PropsWithChildren } from "react"
import { FeatureCategory } from "leaflet"
import useFeatureCategories from "../hooks/useFeatureCategories"

interface FeatureCategoriesProps extends PropsWithChildren { }

export const featureCategoriesContext = createContext<Record<string, FeatureCategory>>({})

const FeatureCategories: FC<FeatureCategoriesProps> = ({ children }) => {
    const categories = useFeatureCategories()

    if (!categories) return <></>

    return (
        <featureCategoriesContext.Provider value={categories}>
            { children }
        </featureCategoriesContext.Provider>
    )
}

export default FeatureCategories