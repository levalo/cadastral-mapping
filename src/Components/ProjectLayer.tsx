import { createContext, FC, PropsWithChildren, useContext, useEffect } from "react"
import { Map, SVGOverlay, circleMarker } from "leaflet"
import { BaseMapContext } from "./BaseMap"
import ProjectionContext from "./Projection"

interface ProjectLayerProps extends PropsWithChildren {
    map?: Map
}

interface ProjectLayer {
    layer?: SVGOverlay
}

export const ProjectLayerContext = createContext<ProjectLayer>({})

export const ProjectLayerProvider: FC<ProjectLayerProps> = ({ map, children }) => {
    const { project } = useContext(ProjectionContext)

    useEffect(() => {
        if (!map) return

        const LatLng = project([477641.004, 4626465.262])

        map.setView(LatLng, 19)

        circleMarker(LatLng, { radius: 5 }).addTo(map)
    }, [])

    return (
        <ProjectLayerContext.Provider value={{}}>
            { children }
        </ProjectLayerContext.Provider>
    )
}

const ProjectLayerConnected: FC<ProjectLayerProps> = ({ children, ...props }) => (
    <BaseMapContext.Consumer>
        {({ map }) => map && (
            <ProjectLayerProvider {...props} map={map}>
                { children }
            </ProjectLayerProvider>
        )}
    </BaseMapContext.Consumer>
)

export default ProjectLayerConnected