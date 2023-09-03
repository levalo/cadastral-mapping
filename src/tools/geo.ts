import tin from "@turf/tin"
import Decimal from "decimal.js"
import { Feature, FeatureCollection, LineString, Point, Polygon } from "geojson"
import proj4 from "proj4"

function findPointWithZ(_zTarget: number, _x0: number, _y0: number, _z0: number, _x1: number, _y1: number, _z1: number) {
    const zTarget = new Decimal(_zTarget), x0 = new Decimal(_x0), y0 = new Decimal(_y0), z0 = new Decimal(_z0), x1 = new Decimal(_x1), y1 = new Decimal(_y1), z1 = new Decimal(_z1)

    if (z0.eq(z1)) {
        return [ _x0, _y0, _z0 ]
    }

    const t = zTarget.minus(z0).div(z1.minus(z0))
    const x = x0.add(t.mul(x1.minus(x0)))
    const y = y0.add(t.mul(y1.minus(y0)))
    
    return [ x.toNumber(), y.toNumber(), zTarget.toNumber() ]
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

export function createIsolines(triangles: number[][][], properties: any): FeatureCollection<LineString, any>[] {
    const grid: number[][][] = []

    let rootIndex = 0
    let currentContourIndex = 0
    let currentTriangleIndex = undefined

    while(rootIndex < triangles.length) {

        // continue line from last point
        if (grid[currentContourIndex] && grid[currentContourIndex].length > 0) {
            const lastPoint = grid[currentContourIndex][grid[currentContourIndex].length - 1]

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
                grid[currentContourIndex] = []

                continue
            }

            const endPoint: number[] = triangles[currentTriangleIndex][endPointIndex]
            // remove point from loop
            triangles[currentTriangleIndex!].splice(endPointIndex, 1)

            grid[currentContourIndex].push(endPoint)

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

        grid[currentContourIndex] = [ startPoint, endPoint ]
    }

    const group = grid.filter(x => x.length > 1).reduce<Record<number, number[][][]>>((acc, x) => ({ ...acc, [x[0][2]]: [...(acc[x[0][2]] || []), x ] }), {})

    const result = Object.keys(group).map(x => group[Number(x)])

    return result.map(x => ({
        type: "FeatureCollection",
        features: x.map(y => ({
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: y
            },
            properties: {
                ...properties,
                title: y[0][2],
                tooltip: y[0][2]
            }
        }))
    }))
}

export function interpolateElevations(points: Feature<Point, PointProperties>[], _min: number, _max: number, _tick: number) {
    const breaks = []

    for(let i = new Decimal(_min); i.lte(_max); i = i.add(_tick)) breaks.push(i.toNumber())

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
    
    return ticks
}

export function projection(param: string) {
    const proj = proj4(param)
    
    const project = (coordinates: number[]) => proj.inverse([coordinates[0], coordinates[1]]).reverse() as [ number, number ]

    return {
        project
    }
}