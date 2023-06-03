import { FC } from "react"
import BaseMap from "./BaseMap"
import OpenStreetLayer from "./OpenStreetLayer"
import ProjectLayer from "./ProjectLayer"


interface DrawerCanvasProps { }

const DrawerCanvas: FC<DrawerCanvasProps> = (props) => {

    return (
        <BaseMap>
            <OpenStreetLayer>
                <ProjectLayer></ProjectLayer>
            </OpenStreetLayer>
        </BaseMap>
    )
}

export default DrawerCanvas