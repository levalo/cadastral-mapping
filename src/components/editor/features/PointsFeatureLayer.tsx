import { FC, Fragment, useContext } from "react"
import { LayerGroup } from "react-leaflet"
import useFeatures from "../../../hooks/useFeatures"
import useProjection from "../../../hooks/useProjection"
import ImageMarker from "./ImageMarker"
import { featureCategoriesContext } from "../../FeatureCategories"

interface PointsFeatureLayerProps { }

const PointsFeatureLayer: FC<PointsFeatureLayerProps> = (props) => {
    const categories = useContext(featureCategoriesContext)

    const { features } = useFeatures("point")
	const { project } = useProjection()

    return (
        <Fragment>
            {features.map((p, i) => (
                <LayerGroup key={i}>
                    {p.points.map(({ x, y }, j) => (
						<ImageMarker key={j} 
                            position={project([x, y])} 
                            options={categories[p.category].options!}/>
                    ))}
                </LayerGroup>
            ))}
        </Fragment>
    )
}

export default PointsFeatureLayer