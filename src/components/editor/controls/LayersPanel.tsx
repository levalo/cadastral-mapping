import { FC } from "react"
import PointsTree from "./PointsTree"
import DrawingsTree from "./DrawingsTree"
import PanelContainer from "./PanelContainer"

interface LayersPanelProps { }

const LayersPanel: FC<LayersPanelProps> = (props) => {
    return (
        <PanelContainer position='topleft' style={{ marginTop: 80 }}>
            <PointsTree />
            <DrawingsTree />
        </PanelContainer>
    )
}

export default LayersPanel