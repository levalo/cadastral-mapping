import { createContext, FC } from "react"
import { Drawer } from "antd"
import useEditor from "../../hooks/useEditor"
import ControlsWrapper from "../ControlsWrapper"
import { ActionsPanel, FeaturesPanel } from "./controls"
import { LinesFeatureLayer, PointsFeatureLayer, PolygonsFeatureLayer } from "./features"
import FeatureForm from "./forms/FeatureForm"
import useFeatures from "../../hooks/useFeatures"

interface EditorProps { }

export const editorContext = createContext<ReturnType<typeof useEditor> | null>(null)

const Editor: FC<EditorProps> = (props) => {
    const value = useEditor()
    const { handleAddFeature } = useFeatures()

    return (
        <editorContext.Provider value={value}>
            <ControlsWrapper position="topleft" direction="vertical">
                <ActionsPanel />
                <FeaturesPanel />
            </ControlsWrapper>
            <PointsFeatureLayer />
            <LinesFeatureLayer />
            <PolygonsFeatureLayer />
            <Drawer open={value.showAddFeatureDrawer} onClose={value.onAddFeatureDrawerClose}>
                <FeatureForm key={Number(value.showAddFeatureDrawer)} onFinish={handleAddFeature} />
            </Drawer>
        </editorContext.Provider>
    )
}

export default Editor