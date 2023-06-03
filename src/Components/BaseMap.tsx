import { createContext, FC, PropsWithChildren, useEffect, useRef, useState } from "react"
import { Map, svg } from "leaflet"

interface BaseMapProps extends PropsWithChildren { }

interface BaseMap {
    map?: Map
}

export const BaseMapContext = createContext<BaseMap>({})

const BaseMapComponent: FC<BaseMapProps> = ({ children }) => {
    const [ map, setMap ] = useState<Map>()

    const mapRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (map) return

        if (!mapRef.current) throw Error('map element undefined')

        const _map = new Map(mapRef.current, {
            renderer: svg()
        })

        setMap(_map)
    }, [])

    return (
        <BaseMapContext.Provider value={{ map }}>
            <div style={{ height: '100%' }}>
                <div ref={mapRef} style={{ height: '100%' }}></div>
                { children }
            </div>
        </BaseMapContext.Provider>
    )
}

export default BaseMapComponent