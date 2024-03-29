declare module '@turf/interpolate' {
    export default function interpolate(
        points: FeatureCollection<Point>,
        cellSize: number,
        options?: {
          gridType?: "point"
          property?: string
          units?: Units
          weight?: number
          mask?: Feature<Polygon | MultiPolygon>
        }
    ): FeatureCollection<Point>
}

declare module 'leaflet' {

    class SVGCustom extends SVG { }

    interface ImageMarkerOptions {
        href: string
        size: number | [ number, number ]
        anchor: [ number, number ]
    }
    
    class ImageMarker extends Layer {
        constructor(latlng: LatLngExpression, options?: ImageMarkerOptions)

        initialize(latlng: LatLngExpression, options: ImageMarkerOptions): void

        setLatLng(latlng: LatLngExpression): void

        getLatLng(): LatLng

        setSize(size: number | [ number, number ])

        getSize()

        setStyle(style: ImageMarkerOptions): this

        beforeAdd(map: Map): this

        redraw(): this

        getElement(): SVGElement

        toGeoJSON(): GeoJSON.Feature

        bringToFront(): this

        bringToBack(): this
    }

    function imageMarker(latLng: LatLngExpression, options: ImageMarkerOptions): ImageMarker

    interface MapOptions {
        preferCanvas?: boolean | undefined

        // Control options
        attributionControl?: boolean | undefined
        zoomControl?: boolean | undefined

        // Interaction options
        closePopupOnClick?: boolean | undefined
        zoomSnap?: number | undefined
        zoomDelta?: number | undefined
        trackResize?: boolean | undefined
        boxZoom?: boolean | undefined
        doubleClickZoom?: Zoom | undefined
        dragging?: boolean | undefined

        // Map state options
        crs?: CRS | undefined
        center?: LatLngExpression | undefined
        zoom?: number | undefined
        minZoom?: number | undefined
        maxZoom?: number | undefined
        layers?: Layer[] | undefined
        maxBounds?: LatLngBoundsExpression | undefined
        renderer?: Renderer | undefined

        // Animation options
        fadeAnimation?: boolean | undefined
        markerZoomAnimation?: boolean | undefined
        transform3DLimit?: number | undefined
        zoomAnimation?: boolean | undefined
        zoomAnimationThreshold?: number | undefined

        // Panning inertia options
        inertia?: boolean | undefined
        inertiaDeceleration?: number | undefined
        inertiaMaxSpeed?: number | undefined
        easeLinearity?: number | undefined
        worldCopyJump?: boolean | undefined
        maxBoundsViscosity?: number | undefined

        // Keyboard navigation options
        keyboard?: boolean | undefined
        keyboardPanDelta?: number | undefined

        // Mousewheel options
        scrollWheelZoom?: Zoom | undefined
        wheelDebounceTime?: number | undefined
        wheelPxPerZoomLevel?: number | undefined

        // Touch interaction options
        tap?: boolean | undefined
        tapTolerance?: number | undefined
        touchZoom?: Zoom | undefined
        bounceAtZoomLimits?: boolean | undefined

        continuousWorld?: boolean | undefined
    }
}

declare module "react-leaflet" {

    interface CircleMarkerProps extends CircleMarkerOptions, PathProps {
        center: LatLngExpression
        children?: ReactNode
        tooltip?: {
            text: string,
            offsetX?: number,
            offsetY?: number
        }
    }
}

declare global {

    // type PointsFeatureCategory = 
    //     'Ark' | // არკა
    //     'Shed' | // ფარდული
    //     'Stair' | // კიბე
    //     'FruitTree' | // ხეხილი
    //     'ConiferousTree' | // წიწვოვანი ხე
    //     'DeciduousTree' | // ფოთლოვანი ხე
    //     'Unknown1' | // 
    //     'Shrubbery' | // ბუჩქნარი
    //     'Unknown2' | //
    //     'MonitoringWell' | // სამეთვალყურეო ჭა
    //     'Hydrant' | // ჰიდრანტი
    //     'Fountain' | // ფანტანი
    //     'Tap' | // ონკანი
    //     'Well' | // წყარო ან ჭა
    //     'HighVoltageTransmitter' | // მაღალი ძაბვის გადამცემი
    //     'Transformer' | // ტრანსფორმატორი
    //     'TVmast' | // რადიო ან საელევიზიო ანძა
    //     'ElectricPole' | // ელ. ბოძი
    //     'Unknown3' //

    // type LineFeatureCategory = 
    //     'GasPipe' | // გაზის მილი
    //     'PowerCord' | // დენის კაბელი
    //     'Sewage' | // კანალიზაცია
    //     'WaterPipe' | // წყლის მილი
    //     'Communication' | // კავშირგაბმულობა
    //     'CadastralBorder' | // საკადასტრო საზღვარი
    //     'ContiguousCadastralBoundaries' | // მომიჯნავე საკადასტრო საზღვარი
    //     'LivingFence' | // ცოცხალი ღობე
    //     'Railway' | // რკინიგზა
    //     'ConcreteFence' | // ბეტონის ღობე
    //     'Easement' | // სერვიტუტი
    //     'MetalFence' | // ლითონის ღობე
    //     'WoodenFence' | // ხის ღობე
    //     'RetainingWall' | // საყრდენი კედელი
    //     'Curbside' | // ბორდიური
    //     'RoadOutline' | // გზის კონტური
    //     'Flat' | // ფლატი
    //     'Pipe' // მილი
    
    // type PolygonFeatureCategory = 
    //     'Building' // შენობა

    // type IsohypseFeatureCategory =
    //     'Isohypse' | // იზოჰიფსი
    //     'MainIsohypse' // მთავარი იზოჰიფსი


    interface PointProperties {
        elevation?: number,
        group: string
    }

    type DrawingGeometryTypes = "MultiPoint" | "LineString"

    interface DrawingCategory {
        type: DrawingGeometryTypes
        options: PolylineOptions | ImageMarkerOptions
        decorators?: Array<{ type: DrawingGeometryTypes, options: PolylineOptions | ImageMarkerOptions }>
        group: 'drawing' | 'contour'
    }
}

export {}
