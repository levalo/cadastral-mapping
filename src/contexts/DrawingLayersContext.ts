import { createContext, useContext } from "react"
import { EditorContextType } from "./EditorContext"

interface DrawingLayersContextType {
    editor?: EditorContextType
}

const DrawingLayersContext = createContext<DrawingLayersContextType>({})

export const useDrawingLayersContext = () => {
    const data = useContext(DrawingLayersContext)

    if (!data) {
        throw Error('Wrap component inside provider!')
    }

    return data
}

export default DrawingLayersContext