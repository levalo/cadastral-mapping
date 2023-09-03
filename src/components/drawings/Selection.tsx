import { FC } from "react"
import { CircleMarker, LayerGroup, Polygon, Polyline } from "react-leaflet"
import { LatLngExpression } from "leaflet"
import { useDrawingLayersContext } from "../../contexts/DrawingLayersContext"
import { ToolTypes } from "../../store/reducers/editor"

interface SelectionProps { }

const Selection: FC<SelectionProps> = (props) => {
    const { editor } = useDrawingLayersContext()

    return (
        <>
            <LayerGroup>
                {editor?.activeTool === ToolTypes.LINE && (
                    <Polyline positions={editor.selectedPoints.map(x => x.geometry.coordinates as LatLngExpression)} color="#00f" dashArray={[0, 10]} />
                )}
                {editor?.activeTool === ToolTypes.POLYGON && (
                    <Polygon positions={editor.selectedPoints.map(x => x.geometry.coordinates as LatLngExpression)} fillOpacity={0} color="#00f" dashArray={[0, 10]} />
                )}
            </LayerGroup>
            <LayerGroup>
                {editor?.selectedPoints.map((p, i) => (
                    <CircleMarker 
                        key={i + '-' + p.id} 
                        center={p.geometry.coordinates as LatLngExpression} 
                        radius={2} 
                        color="#00f"
                        eventHandlers={{
                            click: () => editor.removeSelectedPoint(p)
                        }}
                        interactive
                    />
                ))}
            </LayerGroup>
        </>
    )
}

export default Selection