import { createContext, useContext, useEffect, useState } from "react"

type DrawingCategoriesContextType = Record<string, DrawingCategory>

const DrawingCategoriesContext = createContext<DrawingCategoriesContextType | null>(null)

export const useDrawingCategoriesContextValue = () => {
    const [ features, setFeatures ] = useState<DrawingCategoriesContextType>()
    
    useEffect(() => {
        let subscribed = true

        fetch('/cadastral-mapping/drawing-categories.json').then(res => res.json()).then((data: DrawingCategoriesContextType) => subscribed && setFeatures(data))

        return () => { subscribed = false }
    }, [])

    return features
}

export const useDrawingCategories = () => {
    const data = useContext(DrawingCategoriesContext)

    if (!data) {
        throw Error('Wrap component inside provider!')
    }

    return data
}

export default DrawingCategoriesContext