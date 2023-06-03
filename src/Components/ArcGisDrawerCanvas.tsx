import { FC, useEffect } from "react"

import WebMap from "@arcgis/core/WebMap"
import MapView from "@arcgis/core/views/MapView"
import OpenStreetMapLayer from "@arcgis/core/layers/OpenStreetMapLayer"
import Graphic from "@arcgis/core/Graphic"
import { Point } from "@arcgis/core/geometry"

interface DrawerCanvasProps { }

const DrawerCanvas: FC<DrawerCanvasProps> = () => {

    const map = new WebMap({
        ground: "world-elevation"
    });
    
    useEffect(() => {
        const view = new MapView({
            map: map,
            container: "viewDiv",
        });

        view.constraints.minZoom = 1
    
        const osmLayer = new OpenStreetMapLayer();

        map.add(osmLayer)

        // First create a point geometry
        const point = new Point({
            longitude: 477641.004,
            latitude: 4626465.262,
            spatialReference: {
                wkid: 32638
            }
        });

        // Create a symbol for drawing the point
        const markerSymbol = {
            type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
            color: [226, 119, 40],
            outline: {
                // autocasts as new SimpleLineSymbol()
                color: [255, 255, 255],
                width: 2
            }
        };

        // Create a graphic and add the geometry and symbol to it
        const pointGraphic = new Graphic({
            geometry: point,
            symbol: markerSymbol
        });

        view.graphics.add(pointGraphic)
    }, [])

    return (
        <div id="viewDiv" style={{ height: '100%' }}>

        </div>
    )
}

export default DrawerCanvas