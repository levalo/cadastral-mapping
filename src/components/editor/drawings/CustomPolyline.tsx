import { PolylineOptions } from 'leaflet'
import { Polyline, PolylineProps } from 'react-leaflet'
import { FC, Fragment } from 'react'

export interface CustomPolylineProps extends PolylineProps {
    decorators?: PolylineOptions[]
}

export const CustomPolyline: FC<CustomPolylineProps> = ({ positions, decorators, ...options }) => {

    return (
        <Fragment>
            <Polyline positions={positions} {...options}>
                {decorators?.map((x, i) => (
                    <Polyline key={i} positions={positions} {...x} interactive={false} />
                ))}
            </Polyline>
        </Fragment>
    )
}