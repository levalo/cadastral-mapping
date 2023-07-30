import { FC, Fragment } from "react"
import { LayerGroup } from "react-leaflet"
import useDrawings from "../../../hooks/useDrawings"
import useProjection from "../../../hooks/useProjection"
import ImageMarker from "./ImageMarker"
import { MultiPoint } from "geojson"
import { ImageMarkerOptions } from "leaflet"

interface PointsDrawingLayerProps { }

const PointsDrawingLayer: FC<PointsDrawingLayerProps> = (props) => {
    const { features } = useDrawings("MultiPoint")
	const { project } = useProjection()

    return (
        <Fragment>
            {features.map((x, i) => (
                <LayerGroup key={i}>
                    {(x.root.geometry as MultiPoint).coordinates.map((p, j) => (
						<ImageMarker key={j} 
                            position={project(p)}
                            options={x.root.properties as ImageMarkerOptions}
                        />
                    ))}
                </LayerGroup>
            ))}
        </Fragment>
    )
}

export default PointsDrawingLayer