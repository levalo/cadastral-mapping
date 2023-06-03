import { createContext } from "react"
import proj4 from "proj4"

interface Projection {
    project: (coordinates: [ number, number ]) => [ number, number ]
}

const fromProjection = "+proj=utm +zone=38 +ellps=WGS84 +datum=WGS84 +units=m +no_defs" // EPSG:32638
const projection = proj4(fromProjection)

const ProjectionContext = createContext<Projection>({
    project: (coordinates: [ number, number ]) => projection.inverse(coordinates).reverse() as [ number, number ]
})

export default ProjectionContext