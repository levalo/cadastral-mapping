import { ComponentProps, FC } from "react"
import { ImageMarkerOptions } from "leaflet"

const Options: ImageMarkerOptions = {
    href: 'markers/fruit-tree.svg',
    size: 20,
    anchor: [10, 20]
}

const Icon: FC<ComponentProps<'img'>> = (props) => (
    <img {...props} src='markers/fruit-tree.svg' />
)

const FruitTree = {
    Options,
    Icon
}

export default FruitTree
