
declare module 'leaflet' {

    class SVGCustom extends SVG { }

    interface CustomPolylineOptions extends PolylineOptions {
        decorators?: PolylineOptions[]
    }

    // interface MarkerOptions extends PathOptions {
    //     radius?: number | undefined
    //     tooltip?: {
    //         text: string,
    //         offsetX?: number,
    //         offsetY?: number
    //     }
    // }

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

    interface FeatureCategory {
        type: FeatureType,
        options: CustomPolylineOptions | ImageMarkerOptions | PolygonOptions
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

    type FeatureType = 'line' | 'point' | 'polygon' | 'isohypse'

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

    // type FeatureCategory = PointsFeatureCategory | LineFeatureCategory | PolygonFeatureCategory | IsohypseFeatureCategory

    interface Uid {
        uid?: string
    }

    interface Point extends Uid {
        x: number
        y: number
        z: number
        group: string
    }
    
    interface Feature {
        points: Point[]
        category: string
    }
    
    interface ProjectState {
        points: Point[]
        features: Feature[]
        name: string
    }
}

export {}
