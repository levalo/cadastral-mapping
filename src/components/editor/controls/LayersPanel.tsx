import { FC } from "react"
import PointsTree from "./PointsTree"
import FeaturesTree from "./FeaturesTree"
import PanelContainer from "./PanelContainer"

interface LayersPanelProps { }

const LayersPanel: FC<LayersPanelProps> = (props) => {
    return (
        <PanelContainer position='topleft' style={{ marginTop: 80 }}>
            <PointsTree />
            <FeaturesTree />
        </PanelContainer>
    )
}

export default LayersPanel