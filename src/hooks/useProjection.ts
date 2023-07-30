import proj4 from "proj4"

const fromProjection = "+proj=utm +zone=38 +ellps=WGS84 +datum=WGS84 +units=m +no_defs" // EPSG:32638

const useProjection = () => {
    const projection = proj4(fromProjection)
    
    const project = (coordinates: number[]) => projection.inverse([coordinates[0], coordinates[1]]).reverse() as [ number, number ]

    return {
        project
    }
}

export default useProjection