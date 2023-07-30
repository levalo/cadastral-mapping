import { FC, useContext, useMemo } from "react"
import { CircleMarker, LayerGroup } from "react-leaflet"
import usePoints from "../../hooks/usePoints"
import useProjection from "../../hooks/useProjection"
import { editorContext } from "./Editor"

interface SelectedPointsProps { }

const SelectedPointsLayer: FC<SelectedPointsProps> = (props) => {
    const editor = useContext(editorContext)
    const { features, filterByUid } = usePoints()
    
	const { project } = useProjection()

    const selectedPoints = useMemo(() => filterByUid(editor?.selectedPoints || []), [ editor?.selectedPoints, features ])

    return (
        <LayerGroup>
            {selectedPoints.map(p => (
                <CircleMarker key={p.id} center={project(p.geometry.coordinates)} radius={2} color="#00f" />
            ))}
        </LayerGroup>
    )
}

export default SelectedPointsLayer