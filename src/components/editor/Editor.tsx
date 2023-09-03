import { FC } from "react"
import { UIControls } from "./controls"
import { DrawingLayers } from "../drawings"
import { useEditorContextValue } from "../../contexts/EditorContext"
import EditorContext from "../../contexts/EditorContext"

interface EditorProps { }

const Editor: FC<EditorProps> = (props) => {
    const value = useEditorContextValue()

    return (
        <EditorContext.Provider value={value}>
            <UIControls />
            <DrawingLayers editor={value} />
        </EditorContext.Provider>
    )
}

export default Editor