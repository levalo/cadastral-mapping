import { ComponentProps, FC } from "react"
import { ImageMarkerOptions } from "leaflet"

const Options: ImageMarkerOptions = {
    href: 'markers/stair.svg',
    size: [26, 14],
    anchor: [13, 7]
}

const Icon: FC<ComponentProps<'img'>> = (props) => (
    <img {...props} src='markers/stair.svg' />
)

const Stair = {
    Options,
    Icon
}

export default Stair
