import { ImageMarkerOptions, LatLngExpression } from "leaflet"
import { createElementObject, createLayerComponent, extendContext, LayerProps } from '@react-leaflet/core'
import { ImageMarker as LeafletImageMarker } from 'leaflet'

interface ImageMarkerProps extends LayerProps { 
    position: LatLngExpression
    options: ImageMarkerOptions
}
  
const ImageMarker = createLayerComponent<
    LeafletImageMarker,
    ImageMarkerProps
>(({ position, options }, ctx) => {
    const marker = new LeafletImageMarker(position, options)
    return createElementObject(
        marker,
        extendContext(ctx, { overlayContainer: marker }),
    )
}, (layer, props, prevProps) => {

    if (props.position !== prevProps.position) {
        layer.setLatLng(props.position)
    }

    if (props.options != null && props.options !== prevProps.options) {
        layer.setStyle(props.options)
    }

})

export default ImageMarker