import { createContext, FC, PropsWithChildren, useEffect } from "react"
import { Map, TileLayer } from "leaflet"
import { BaseMapContext } from "./BaseMap"

interface OpenStreetLayerProps extends PropsWithChildren {
    map?: Map
}

interface OpenStreetLayer {
    layer?: TileLayer
}

const tileLayer = new TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
})

export const OpenStreetLayerContext = createContext<OpenStreetLayer>({})

export const OpenStreetLayerProvider: FC<OpenStreetLayerProps> = ({ map, children }) => {

    useEffect(() => {
        if (!map) return

        map.addLayer(tileLayer)

        return () => {
            map.removeLayer(tileLayer)
        }
    }, [])

    return (
        <OpenStreetLayerContext.Provider value={{ layer: tileLayer }}>
            { children }
        </OpenStreetLayerContext.Provider>
    )
}

const OpenStreetLayerConnected: FC<OpenStreetLayerProps> = ({ children, ...props }) => (
    <BaseMapContext.Consumer>
        {({ map }) => map && (
            <OpenStreetLayerProvider {...props} map={map}>
                { children }
            </OpenStreetLayerProvider>
        )}
    </BaseMapContext.Consumer>
)

export default OpenStreetLayerConnected