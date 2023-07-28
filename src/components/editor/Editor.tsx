import { createContext, FC } from "react"
import { Drawer } from "antd"
import useEditor from "../../hooks/useEditor"
import { ActionsPanel, LayersPanel } from "./controls"
import { LinesFeatureLayer, PointsFeatureLayer, PolygonsFeatureLayer } from "./features"
import FeatureForm from "./forms/FeatureForm"
import PointsForm from "./forms/PointsForm"
import PointsLayer from "./PointsLayer"
import SelectedPointsLayer from "./SelectedPointsLayer"

interface EditorProps { }

export const editorContext = createContext<ReturnType<typeof useEditor> | null>(null)

const Editor: FC<EditorProps> = (props) => {
    const editor = useEditor()

    return (
        <editorContext.Provider value={editor}>
            <ActionsPanel />
            <LayersPanel />
            <SelectedPointsLayer />
            <PointsLayer />
            <PointsFeatureLayer />
            <LinesFeatureLayer />
            <PolygonsFeatureLayer />
            <Drawer open={editor.showDrawer === "feature"} onClose={editor.closeDrawer}>
                <FeatureForm points={editor.selectedPoints || []} key={editor.showDrawer} onSuccess={editor.closeDrawer} />
            </Drawer>
            <Drawer open={editor.showDrawer === "points"} onClose={editor.closeDrawer}>
                <PointsForm key={editor.showDrawer} onSuccess={editor.closeDrawer} />
            </Drawer>
        </editorContext.Provider>
    )
}

export default Editor