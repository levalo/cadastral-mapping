import { FC } from "react"
import { CircleMarker, LayerGroup } from "react-leaflet"
import usePoints from "../../hooks/usePoints"
import useProjection from "../../hooks/useProjection"

interface PointsLayerProps { }

const PointsLayer: FC<PointsLayerProps> = (props) => {
    const { points } = usePoints()
    
	const { project } = useProjection()

    return (
        <LayerGroup>
            {points?.map(p => (
                <CircleMarker key={p.uid} center={project([p.x, p.y])} radius={1} color="#000" tooltip={{
                    text: p.z.toString()
                }} />
            ))}
        </LayerGroup>
    )
}

export default PointsLayer