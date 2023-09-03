import { FC } from "react"
import { LayerGroup } from "react-leaflet"
import { Feature, MultiPoint } from "geojson"
import { ImageMarkerOptions, LatLngExpression } from "leaflet"
import ImageMarker from "./ImageMarker"
import { DrawingGeometries, DrawingProperties } from "../../store/reducers/drawings"

interface MarkerProps { 
    data: Feature<DrawingGeometries, DrawingProperties>
}

const Marker: FC<MarkerProps> = ({ data }) => {
    return (
        <LayerGroup>
            {(data.geometry as MultiPoint).coordinates.map((p, j) => (
                <ImageMarker key={j} 
                    position={p as LatLngExpression}
                    options={data.properties as ImageMarkerOptions}
                />
            ))}
        </LayerGroup>
    )
}

export default Marker