import { useEffect, useState } from "react"
import { DrawingCategory } from "../components/DrawingCategories"


const useDrawingCategories = () => {
    const [ categories, setCategories ] = useState<Record<string, DrawingCategory>>()

    useEffect(() => {
        let subscribed = true

        fetch('/cadastral-mapping/drawing-categories.json').then(res => res.json()).then((data: Record<string, DrawingCategory>) => subscribed && setCategories(data))

        return () => { subscribed = false }
    }, [])

    return categories
}

export default useDrawingCategories