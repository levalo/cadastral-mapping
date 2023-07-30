import { FC, Fragment } from "react"

import useProjection from "../../../hooks/useProjection"
import { DecoratorType } from "../../../store/reducers/drawings"
import { Polyline } from "react-leaflet"
import ImageMarker from "./ImageMarker"
import { LineString, MultiPoint } from "geojson"
import { ImageMarkerOptions } from "leaflet"

interface DrawingDecoratorsProps { 
    decorator: DecoratorType
}

const DrawingDecorators: FC<DrawingDecoratorsProps> = ({ decorator }) => {
    const { project } = useProjection()

    return (
        <Fragment>
            {decorator.geometry.type === "LineString" && <Polyline positions={(decorator.geometry as LineString).coordinates.map(p => project(p))} {...decorator.properties} interactive={false} />}
            {decorator.geometry.type === "MultiPoint" && ((decorator.geometry as MultiPoint).coordinates.map((p, i) => (
                <ImageMarker key={i} position={project(p)} options={decorator.properties as ImageMarkerOptions} />
            )))}
        </Fragment>
    )
}

export default DrawingDecorators