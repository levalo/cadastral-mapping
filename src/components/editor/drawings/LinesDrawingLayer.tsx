import { FC, Fragment } from "react"

import useDrawings from "../../../hooks/useDrawings"
import useProjection from "../../../hooks/useProjection"
import { LineString } from "geojson"
import { Polyline } from "react-leaflet"
import DrawingDecorators from "./DrawingDecorators"

interface LinesDrawingLayerProps { }

const LinesDrawingLayer: FC<LinesDrawingLayerProps> = (props) => {
    const { features } = useDrawings("LineString")
    const { project } = useProjection()

    return (
        <Fragment>
            {features.map((x, i) => (
                <Polyline key={i} positions={(x.root.geometry as LineString).coordinates.map(p => project(p))} {...x.root.properties}>
                    {x.decorators.map((y, j) => <DrawingDecorators key={y.id} decorator={y} />)}
                    {x.isolines.map((y, j) => <Polyline key={y.id} positions={(y.geometry as LineString).coordinates.map(p => project(p))} {...x.root.properties} />)}
                </Polyline>
            ))}
        </Fragment>
    )
}

export default LinesDrawingLayer