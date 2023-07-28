import { FC, Fragment, useContext } from "react"

import useFeatures from "../../../hooks/useFeatures"
import useProjection from "../../../hooks/useProjection"
import { featureCategoriesContext } from "../../FeatureCategories"
import { CustomPolyline } from "./CustomPolyline"

interface LinesFeatureProps { }

const LinesFeatureLayer: FC<LinesFeatureProps> = (props) => {
    const categories = useContext(featureCategoriesContext)

    const { features } = useFeatures("line")
    const { project } = useProjection()

    return (
        <Fragment>
            {features?.map((x, i) => (
                <CustomPolyline key={i} positions={x.points.map(p => project([p.x, p.y]))} {...categories[x.category].options} />
            ))}
        </Fragment>
    )
}

export default LinesFeatureLayer