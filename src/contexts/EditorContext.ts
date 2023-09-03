import { createContext, useContext } from "react"
import useTools from "../hooks/useTools"
import useSideDrawer from "../hooks/useSideDrawer"
import useUndo from "../hooks/useUndo"

export const useEditorContextValue = () => {
    const sideDrawer = useSideDrawer()
    const tools = useTools()
    const undo = useUndo()

    return {
        ...sideDrawer,
        ...tools,
        ...undo
    }
}

export type EditorContextType = ReturnType<typeof useEditorContextValue>

const EditorContext = createContext<EditorContextType | null>(null)

export const useEditorContext = () => {
    const data = useContext(EditorContext)

    if (!data) {
        throw Error('Wrap component inside provider!')
    }

    return data
}

export default EditorContext