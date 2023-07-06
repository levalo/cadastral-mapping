import { ComponentProps, FC } from "react"
import { ImageMarkerOptions } from "leaflet"

const Options: ImageMarkerOptions = {
    href: 'markers/ark.svg',
    size: [22, 14],
    anchor: [11, 7]
}

const Icon: FC<ComponentProps<'img'>> = (props) => (
    <img {...props} src='markers/ark.svg' />
)

const Ark = {
    Options,
    Icon
}

export default Ark
