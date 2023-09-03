import { FC, useMemo } from "react"
import PanelContainer from "./PanelContainer"
import PointsTree from "./PointsTree"
import DrawingsTree from "./DrawingsTree"
import ToolsPanel from "./ToolsPanel"
import ActionsPanel from "./ActionsPanel"
import { Drawer } from "antd"
import DrawingForm from "../forms/DrawingForm"
import PointsForm from "../forms/PointsForm"
import { useEditorContext } from "../../../contexts/EditorContext"
import DrawingCategoriesContext, { useDrawingCategoriesContextValue } from "../../../contexts/DrawingCategoriesContext"
import ContourForm from "../forms/ContourForm"
import AddPointForm from "../forms/AddPointForm"
import { DrawerTypes } from "../../../store/reducers/editor"

interface UIControlsProps {}

const UIControls: FC<UIControlsProps> = () => {
    const editor = useEditorContext()

    const features = useDrawingCategoriesContextValue()

    const activeForm = useMemo(() => (
        <>
            {editor.showDrawer === DrawerTypes.DRAWING && <DrawingForm key={editor.showDrawer} onSuccess={editor.closeDrawer} />}
            {editor.showDrawer === DrawerTypes.POINTS && <PointsForm key={editor.showDrawer} onSuccess={editor.closeDrawer} />}
            {editor.showDrawer === DrawerTypes.CONTOUR && <ContourForm key={editor.showDrawer} onSuccess={editor.closeDrawer} />}
            {editor.showDrawer === DrawerTypes.POINT && <AddPointForm key={editor.showDrawer} onSuccess={editor.closeDrawer} />}
        </>
    ), [ editor.showDrawer ])

    return features ? (
        <DrawingCategoriesContext.Provider value={features}>
            <PanelContainer position="topleft">
                <ActionsPanel />
            </PanelContainer>
            <PanelContainer position="topleft" style={{ marginTop: 80 }}>
                <ToolsPanel />
            </PanelContainer>
            <PanelContainer position="topright">
                <PointsTree />
                <DrawingsTree />
            </PanelContainer>
            <Drawer open={!!editor.showDrawer} onClose={editor.closeDrawer}>
                { activeForm }
            </Drawer>
        </DrawingCategoriesContext.Provider>
    ) : <></>
}

export default UIControls