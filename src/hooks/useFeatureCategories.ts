import { FeatureCategory } from "leaflet"
import { useEffect, useState } from "react"

const useFeatureCategories = () => {
    const [ categories, setCategories ] = useState<Record<string, FeatureCategory>>()

    useEffect(() => {
        let subscribed = true

        fetch('https://levalo.github.io/cadastral-mapping/feature-categories.json').then(res => res.json()).then((data: Record<string, FeatureCategory>) => subscribed && setCategories(data))

        return () => { subscribed = false }
    }, [])

    return categories
}

export default useFeatureCategories