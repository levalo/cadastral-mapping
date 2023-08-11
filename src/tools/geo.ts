import tin from "@turf/tin"
import { Feature, FeatureCollection, LineString, Point, Polygon } from "geojson"

function findPointWithZ(zTarget: number, x0: number, y0: number, z0: number, x1: number, y1: number, z1: number) {
    if (z0 === z1) {
        return [ x0, y0, z0 ]
    }

    const t = (zTarget - z0) / (z1 - z0)
    const x = x0 + t * (x1 - x0)
    const y = y0 + t * (y1 - y0)
    
    return [ x, y, zTarget ]
}

function interpolateTriangleElevationTicks(triangle: Feature<Polygon>, breaks: number[]) {
    const properties = triangle.properties as { a: number, b: number, c: number }
    
    const result: number[][] = []

    for (let i = 0; i < breaks.length; i++) {
        if (breaks[i] >= Math.min(properties.a, properties.b) && breaks[i] <= Math.max(properties.a, properties.b)) {
            // in a-b
            result.push(findPointWithZ(
                breaks[i],
                triangle.geometry.coordinates[0][0][0],
                triangle.geometry.coordinates[0][0][1],
                properties.a,
                triangle.geometry.coordinates[0][1][0],
                triangle.geometry.coordinates[0][1][1],
                properties.b,
            ))
        }

        if (breaks[i] >= Math.min(properties.b, properties.c) && breaks[i] <= Math.max(properties.b, properties.c)) {
            // in b-c
            result.push(findPointWithZ(
                breaks[i],
                triangle.geometry.coordinates[0][1][0],
                triangle.geometry.coordinates[0][1][1],
                properties.b,
                triangle.geometry.coordinates[0][2][0],
                triangle.geometry.coordinates[0][2][1],
                properties.c,
            ))
        }

        if (breaks[i] >= Math.min(properties.c, properties.a) && breaks[i] <= Math.max(properties.c, properties.a)) {
            // in c-a
            result.push(findPointWithZ(
                breaks[i],
                triangle.geometry.coordinates[0][2][0],
                triangle.geometry.coordinates[0][2][1],
                properties.c,
                triangle.geometry.coordinates[0][0][0],
                triangle.geometry.coordinates[0][0][1],
                properties.a,
            ))
        }
    }

    return result
}

function generateContours(triangles: number[][][]): Feature<LineString, any>[] {
    const result: number[][][] = []

    let rootIndex = 0
    let currentContourIndex = 0
    let currentTriangleIndex = undefined

    while(rootIndex < triangles.length) {

        // continue line from last point
        if (result[currentContourIndex] && result[currentContourIndex].length > 0) {
            const lastPoint = result[currentContourIndex][result[currentContourIndex].length - 1]

            // move next sibling triangle
            currentTriangleIndex = triangles.findIndex(x => x.find(y => y[0] === lastPoint[0] && y[1] === lastPoint[1]))
            // if no sibling end current line
            if (currentTriangleIndex < 0) {
                currentContourIndex += 1
                
                continue
            }

            // remove point from loop
            const startPointIndex = triangles[currentTriangleIndex].findIndex(x => x[0] === lastPoint[0] && x[1] === lastPoint[1])
            triangles[currentTriangleIndex].splice(startPointIndex, 1)

            const endPointIndex = triangles[currentTriangleIndex].findIndex(x => x[2] === lastPoint[2])

            // if not found end point into current triangle reset line
            if (endPointIndex < 0) {
                result[currentContourIndex] = []

                continue
            }

            const endPoint: number[] = triangles[currentTriangleIndex][endPointIndex]
            // remove point from loop
            triangles[currentTriangleIndex!].splice(endPointIndex, 1)

            result[currentContourIndex].push(endPoint)

            continue
        }

        // start new contour
        const startPoint = triangles[rootIndex].pop()

        if (!startPoint) {
            rootIndex += 1

            continue
        }

        const endPointIndex = triangles[rootIndex].findIndex(x => x[2] === startPoint[2])

        if (endPointIndex < 0) {
            rootIndex += 1

            continue
        }

        const endPoint: number[] = triangles[rootIndex][endPointIndex]

        triangles[rootIndex].splice(endPointIndex, 1)

        result[currentContourIndex] = [ startPoint, endPoint ]
    }

    return result.filter(x => x.length > 1).map(x => ({
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates: x
        },
        properties: {}
    }) as Feature<LineString, any>)
}

export function createContourMap(points: Feature<Point, PointProperties>[]) {
    const breaks = Array.from(new Set(points.filter(x => x.properties.elevation).map(x => Math.round(x.properties.elevation! * 5) / 5)))

    const pointsCollection: FeatureCollection<Point, PointProperties> = {
        type: 'FeatureCollection',
        features: points,
    }

    const tinPolygons = tin(pointsCollection, 'elevation')
    
    let ticks: number[][][] = []

    for (let i = 0; i < tinPolygons.features.length; i++) {

        const triangleTicks = interpolateTriangleElevationTicks(tinPolygons.features[i], breaks)

        if (triangleTicks.length) ticks.push(triangleTicks)
    }

    const result = generateContours(ticks)
    
    return result
}
