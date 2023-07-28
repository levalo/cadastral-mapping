import { FC, useContext, useMemo } from "react"
import { CircleMarker, LayerGroup } from "react-leaflet"
import usePoints from "../../hooks/usePoints"
import useProjection from "../../hooks/useProjection"
import { editorContext } from "./Editor"

interface SelectedPointsProps { }

const SelectedPointsLayer: FC<SelectedPointsProps> = (props) => {
    const editor = useContext(editorContext)
    const { points, filterByUid } = usePoints()
    
	const { project } = useProjection()

    const selectedPoints = useMemo(() => filterByUid(editor?.selectedPoints || []), [ editor?.selectedPoints, points ])

    return (
        <LayerGroup>
            {selectedPoints.map(p => (
                <CircleMarker key={p.uid} center={project([p.x, p.y])} radius={2} color="#00f" />
            ))}
        </LayerGroup>
    )
}

export default SelectedPointsLayer