import { CustomPolylineOptions, FeatureCategory, ImageMarkerOptions } from "leaflet"
import { ComponentProps, FC } from "react"

interface CategoryIconProps extends ComponentProps<'svg'> { 
    category: FeatureCategory
}

function parseDashArray(options: CustomPolylineOptions) {
    if(!Array.isArray(options.dashArray)) return options.dashArray

    const t = [ ...options.dashArray ]

    t[0] = (options.weight || 0) * options.dashArray[0] * 5

    return t.join(' ')
}

const LineIcon: FC<{ options: CustomPolylineOptions }> = ({ options }) => (
    <g>
        {options.decorators && options.decorators.map((x, i) => (
            <line key={i}
                x1="0" y1="50" x2="100" y2="50"
                style={{
                    stroke: x.color,
                    strokeWidth: x.weight ? 5 * x.weight : 0,
                    strokeDasharray: parseDashArray(x)
                }}
            />
        ))}
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

const PointIcon: FC<{ options: ImageMarkerOptions }> = ({ options }) => (
    <g>
        <image 
            href={options.href} 
            width='100'
            height='100'
        />
    </g>
)

const CategoryIcon: FC<CategoryIconProps> = ({ category, ...props }) => {

    return (
        <svg {...props} viewBox="0 0 100 100">
            {category.type === 'line' && <LineIcon options={category.options} />}
            {category.type === 'point' && <PointIcon options={category.options} />}
        </svg>
    )
}

export default CategoryIcon