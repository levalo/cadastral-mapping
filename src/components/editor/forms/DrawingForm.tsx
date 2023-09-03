import { FC, useMemo } from "react"
import { Button, Form, Input } from "antd"
import { Feature, FeatureCollection, Point } from "geojson"
import FormItem from "antd/es/form/FormItem"
import PointsTable from "../controls/PointsTable"
import useDrawings from "../../../hooks/useDrawings"
import { useEditorContext } from "../../../contexts/EditorContext"
import { DrawingGeometries, DrawingProperties } from "../../../store/reducers/drawings"
import { DrawingCategorySelect } from "../controls"
import { ToolTypes } from "../../../store/reducers/editor"

interface DrawingFormProps {
    onSuccess: () => void
}

const DrawingForm: FC<DrawingFormProps> = ({ onSuccess }) => {
    const { addDrawing } = useDrawings()
    const { selectedPoints, activeTool } = useEditorContext()

    const handleFinish = (data: { name: string, category: { name: string, data: DrawingCategory }, points: Feature<Point, PointProperties>[] }) => {
        if (data.points.length === 0) return

        //if polygon selection mode retry first point at end
        if (activeTool === ToolTypes.POLYGON) {
            data.points.push(data.points[0])
        }

        const { name, category, points } = data

        const collection: FeatureCollection<DrawingGeometries, DrawingProperties> = {
            type: 'FeatureCollection',
            features: []
        }

        collection.features.push({
            type: 'Feature',
            geometry: {
                type: category.data.type,
                coordinates: data.points.map(x => x.geometry.coordinates)
            },
            properties: {
                ...category.data.options,
                title: name,
                category: category.name 
            }
        })

        if (category.data.decorators) {
            collection.features.push(...category.data.decorators.map(x => ({
                type: 'Feature',
                geometry: {
                    type: x.type,
                    coordinates: points.map(x => x.geometry.coordinates)
                },
                properties: {
                    ...x.options,
                    title: name,
                    category: category.name 
                }
            }) as Feature<DrawingGeometries, DrawingProperties> ))
        }

        addDrawing([collection])

        onSuccess()
    }

    return (
        <Form initialValues={{ points: selectedPoints }} className="feature-form" labelCol={{ span: 24 }} onFinish={handleFinish}>
            <FormItem label="Name" name="name" rules={[{ required: true }]}>
                <Input />
            </FormItem>
            <FormItem label="Type" name="category" rules={[{ required: true }]}>
                <DrawingCategorySelect categoryGroup="drawing" />
            </FormItem>
            <FormItem label="Points" name="points" rules={[{ required: true }]}>
                <PointsTable readOnly />
            </FormItem>
            <Button htmlType="submit">Submit</Button>
        </Form>
    )
}

export default DrawingForm