import { FC, Fragment } from "react"
import { Polyline } from "react-leaflet"
import { LineFeatureCategories } from "../../../constants"
import useFeatures from "../../../hooks/useFeatures"
import useProjection from "../../../hooks/useProjection"

interface LinesFeatureProps { }

const LinesFeatureLayer: FC<LinesFeatureProps> = (props) => {
    const { features } = useFeatures(LineFeatureCategories)
    const { project } = useProjection()

    return (
        <Fragment>
            {features?.map((x, i) => (
                <Polyline key={i} positions={x.points.map(p => project([p.x, p.y]))} />
            ))}
        </Fragment>
    )
}

export default LinesFeatureLayer