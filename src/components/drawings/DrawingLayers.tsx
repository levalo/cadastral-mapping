import { FC, Fragment, useMemo } from "react"
import Points from "./Points"
import { EditorContextType } from "../../contexts/EditorContext"
import Marker from "./Marker"
import Line from "./Line"
import Selection from "./Selection"
import DrawingLayersContext from "../../contexts/DrawingLayersContext"
import useDrawings from "../../hooks/useDrawings"
import { LayerGroup } from "react-leaflet"

interface DrawingLayersProps {
    editor?: EditorContextType
}

const DrawingLayers: FC<DrawingLayersProps> = ({ editor }) => {
    const { drawings } = useDrawings()

    const drawingsRendered = useMemo(() => drawings.map(x => (
        <LayerGroup key={x.id}>
            {x.value.features.map((y, j) => (
                <Fragment key={j}>
                    {y.geometry.type === 'LineString' && <Line key={`line-${x.id}-${j}`} data={y} />}
                    {y.geometry.type === 'MultiPoint' && <Marker key={`point-${x.id}-${j}`} data={y} />}
                </Fragment>
            ))}
        </LayerGroup>
    )), [ drawings ])

    return (
        <DrawingLayersContext.Provider value={{ editor }}>
            <Selection />
            <Points />
            <LayerGroup>
                { drawingsRendered }
            </LayerGroup>
        </DrawingLayersContext.Provider>
    )
}

export default DrawingLayers