import { FC, Fragment } from "react"
import { Polygon } from "react-leaflet"
import useFeatures from "../../../hooks/useFeatures"
import useProjection from "../../../hooks/useProjection"

interface PolygonsFeatureProps { }

const PolygonsFeatureLayer: FC<PolygonsFeatureProps> = (props) => {
    const { features } = useFeatures("polygon")
    const { project } = useProjection()

    return (
        <Fragment>
            {features?.map((x, i) => (
                <Polygon key={i} positions={x.points.map(p => project([p.x, p.y]))} />
            ))}
        </Fragment>
    )
}

export default PolygonsFeatureLayer