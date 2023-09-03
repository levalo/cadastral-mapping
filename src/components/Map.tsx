import { FC, PropsWithChildren } from "react"
import { SVGCustom } from "leaflet"
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet"

import "../plugins/leaflet"

// tilelayers https://leaflet-extras.github.io/leaflet-providers/preview/

interface MapProps extends PropsWithChildren { }

const Map: FC<MapProps> = ({ children }) => {
    
    return (
        <MapContainer style={{ height: '100%' }} zoom={3} maxZoom={30} center={[0,0]} zoomControl={false} renderer={new SVGCustom()}>
            <ZoomControl position='bottomright' />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
            />
            { children }
        </MapContainer>
    )
}

export default Map