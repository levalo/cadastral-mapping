import { ComponentProps, FC } from "react"
import { ImageMarkerOptions } from "leaflet"

const Options: ImageMarkerOptions = {
    href: 'markers/shed.svg',
    size: [22, 14],
    anchor: [11, 7]
}

const Icon: FC<ComponentProps<'img'>> = (props) => (
    <img {...props} src='markers/shed.svg' />
)

const Shed = {
    Options,
    Icon
}

export default Shed
