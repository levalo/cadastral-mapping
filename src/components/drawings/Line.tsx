import { FC } from "react"
import { LatLngExpression } from "leaflet"
import { Feature } from "geojson"
import { Polyline } from "react-leaflet"
import { DrawingGeometries, DrawingProperties } from "../../store/reducers/drawings"

interface LineProps { 
    data: Feature<DrawingGeometries, DrawingProperties>
}

const Line: FC<LineProps> = ({ data }) => {
    return (
        <Polyline positions={data.geometry.coordinates as LatLngExpression[]} {...data.properties} />
    )
}

export default Line