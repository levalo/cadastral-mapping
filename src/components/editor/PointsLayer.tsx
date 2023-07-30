import { FC } from "react"
import { CircleMarker, LayerGroup } from "react-leaflet"
import usePoints from "../../hooks/usePoints"
import useProjection from "../../hooks/useProjection"

interface PointsLayerProps { }

const PointsLayer: FC<PointsLayerProps> = (props) => {
    const { features } = usePoints()
    
	const { project } = useProjection()

    return (
        <LayerGroup>
            {features.map(p => (
                <CircleMarker key={p.id} center={project(p.geometry.coordinates)} radius={1} color="#000" tooltip={{
                    text: p.properties.elevation?.toString() || ''
                }} />
            ))}
        </LayerGroup>
    )
}

export default PointsLayer