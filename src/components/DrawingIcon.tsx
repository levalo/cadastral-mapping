import { PolylineOptions, ImageMarkerOptions } from "leaflet"
import { ComponentProps, FC, Fragment } from "react"

interface DrawingIconProps extends Omit<ComponentProps<'svg'>, 'type'>, DrawingCategory { }

function parseDashArray(options: PolylineOptions) {
    if(!Array.isArray(options.dashArray)) return options.dashArray

    const t = [ ...options.dashArray ]

    t[0] = (options.weight || 0) * options.dashArray[0] * 5

    return t.join(' ')
}

const LineIcon: FC<{ options: PolylineOptions }> = ({ options }) => (
    <g>
        <line 
            x1="0" y1="50" x2="100" y2="50"
            style={{
                stroke: options.color,
                strokeWidth: options.weight ? 5 * options.weight : 0,
                strokeDasharray: parseDashArray(options)
            }}
        />
    </g>
)

const Decorators: FC<{
    decorators: Array<{ type: DrawingGeometryTypes, options: ImageMarkerOptions | PolylineOptions }>
}> = ({ decorators }) => (
    <g>
        {decorators.map(({ type, options }, i) => 
            <Fragment key={i}>
                {type === 'LineString' && <LineIcon options={options as PolylineOptions} />}
                {type === 'MultiPoint' && <PointIcon options={options as ImageMarkerOptions} />}
            </Fragment>
        )}
    </g>
)

const PointIcon: FC<{ options: ImageMarkerOptions }> = ({ options }) => (
    <g>
        <image 
            href={options.href} 
            width='100'
            height='100'
        />
    </g>
)

const DrawingIcon: FC<DrawingIconProps> = ({ type, options, decorators = [], ...props }) => {

    return (
        <svg {...props} viewBox="0 0 100 100">
            {type === 'LineString' && <LineIcon options={options as PolylineOptions} />}
            {type === 'MultiPoint' && <PointIcon options={options as ImageMarkerOptions} />}
            {decorators.length > 0 && <Decorators decorators={decorators} />}
        </svg>
    )
}

export default DrawingIcon