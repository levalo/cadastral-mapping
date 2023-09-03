import { FC, useMemo } from "react"
import { CircleMarker, LayerGroup } from "react-leaflet"
import { LatLngExpression } from "leaflet"
import usePoints from "../../hooks/usePoints"
import { useDrawingLayersContext } from "../../contexts/DrawingLayersContext"
import { ToolTypes } from "../../store/reducers/editor"

interface PointsProps { }

const Points: FC<PointsProps> = (props) => {
    const { points } = usePoints()
    const { editor } = useDrawingLayersContext()

    const interactionCB = useMemo(() => {
        if (editor && [ToolTypes.DOT, ToolTypes.LINE, ToolTypes.POLYGON].includes(editor.activeTool)) return editor.togglePointSelection
        if (editor?.activeTool === ToolTypes.REMOVE) return editor.removePoint
        
        return null
    }, [ editor?.activeTool ])

    return (
        <LayerGroup key={`${interactionCB !== null}`}>
            {editor?.editingPoint && (
                <CircleMarker 
                    center={editor.editingPoint.geometry.coordinates as LatLngExpression} 
                    radius={2}
                    color="#00f"
                />
            )}
            {points.map(p => (
                <CircleMarker 
                    key={p.id} 
                    center={p.geometry.coordinates as LatLngExpression} 
                    radius={1} 
                    color="#000" 
                    eventHandlers={{
                        click: () => interactionCB!(p)
                    }} 
                    tooltip={{
                        text: p.properties.elevation?.toString() || ''
                    }} 
                    interactive={interactionCB !== null}
                />
            ))}
        </LayerGroup>
    )
}

export default Points