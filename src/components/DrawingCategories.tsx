import { createContext, FC, PropsWithChildren } from "react"
import useDrawingCategories from "../hooks/useDrawingCategories"
import { PolylineOptions, ImageMarkerOptions } from "leaflet"

interface DrawingCategoriesProps extends PropsWithChildren { }

export interface DrawingCategory {
    type: DrawingGeometryTypes | "MultiLineString"
    options: PolylineOptions | ImageMarkerOptions
    decorators?: Array<{ type: DrawingGeometryTypes, options: PolylineOptions | ImageMarkerOptions }>
}

export const drawingCategoriesContext = createContext<Record<string, DrawingCategory>>({})

const DrawingCategories: FC<DrawingCategoriesProps> = ({ children }) => {
    const categories = useDrawingCategories()

    if (!categories) return <></>

    return (
        <drawingCategoriesContext.Provider value={categories}>
            { children }
        </drawingCategoriesContext.Provider>
    )
}

export default DrawingCategories