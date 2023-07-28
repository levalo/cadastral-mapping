import { ControlOptions } from 'leaflet'
import { ComponentProps, FC, PropsWithChildren, useEffect, useRef } from 'react'

export const POSITION_CLASSES = {
    bottomleft: 'leaflet-bottom leaflet-left',
    bottomright: 'leaflet-bottom leaflet-right',
    topleft: 'leaflet-top leaflet-left',
    topright: 'leaflet-top leaflet-right',
}

interface PanelContainerProps extends ComponentProps<'div'>, ControlOptions, PropsWithChildren { }

const PanelContainer: FC<PanelContainerProps> = ({ position, children, className, ...props }) => {
    const controlRef = useRef<HTMLDivElement>(null)

    const positionClass = (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright
    
    useEffect(() => {
        controlRef.current?.addEventListener('wheel', (ev) => {
            ev.stopPropagation()
        })

        controlRef.current?.addEventListener('dblclick', (ev) => {
            ev.stopPropagation()
        })
    }, [ controlRef ])

    return (
        <div className={positionClass}>
            <div className={`leaflet-control ${className}`} {...props} ref={controlRef}>
                { children }
            </div>
        </div>
    )
}

export default PanelContainer