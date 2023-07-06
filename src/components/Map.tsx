import { FC } from "react"
import { SVG } from "leaflet"
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet"

import "leaflet.pattern/dist/leaflet.pattern"
import "../plugins/leaflet"

import { Drawer } from "./editor"

// tilelayers https://leaflet-extras.github.io/leaflet-providers/preview/

interface MapProps { }

const Map: FC<MapProps> = (props) => {
    
    return (
        <MapContainer style={{ height: '100%' }} zoom={1} maxZoom={30} center={[0,0]} zoomControl={false} renderer={new SVG()}>
            <ZoomControl position='bottomright' />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
            />
            <Drawer />
        </MapContainer>
    )
}

export default Map