import { FC, Fragment } from "react"
import { LayerGroup } from "react-leaflet"
import useFeatures from "../../../hooks/useFeatures"
import useProjection from "../../../hooks/useProjection"
import ImageMarker from "./ImageMarker"
import Categories from "./categories"
import { PointFeatureCategories } from "../../../constants"

interface PointsFeatureLayerProps { }

const PointsFeatureLayer: FC<PointsFeatureLayerProps> = (props) => {
    const { features } = useFeatures(PointFeatureCategories)
	const { project } = useProjection()

    return (
        <Fragment>
            {features.map((p, i) => (
                <LayerGroup key={i}>
                    {p.points.map(({ x, y }, j) => (
						<ImageMarker key={j} 
                            position={project([x, y])} 
                            options={Categories[p.category].Options}/>
                    ))}
                </LayerGroup>
            ))}
        </Fragment>
    )
}

export default PointsFeatureLayer