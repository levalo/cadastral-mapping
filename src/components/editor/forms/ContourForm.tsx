import { FC, useMemo } from "react"
import { Button, Form, InputNumber } from "antd"
import { Feature, Point } from "geojson"
import FormItem from "antd/es/form/FormItem"
import PointsTable from "../controls/PointsTable"
import useDrawings from "../../../hooks/useDrawings"
import { useEditorContext } from "../../../contexts/EditorContext"
import { createIsolines, interpolateElevations } from "../../../tools/geo"
import { DrawingCategorySelect } from "../controls"

interface ContourFormProps {
    onSuccess: () => void
}

const ContourForm: FC<ContourFormProps> = ({ onSuccess }) => {
    const { addDrawing } = useDrawings()
    const { selectedPoints } = useEditorContext()

    const handleFinish = (data: { min: number, max: number, tick: number, category: { name: string, data: DrawingCategory }, points: Feature<Point, PointProperties>[] }) => {
        if (data.points.length === 0) return

        const { min, max, tick, category, points } = data

        const properties = {
            ...category.data.options,
            category: category.name 
        }

        const interpolatedGrid = interpolateElevations(points, min, max, tick)

        const isolines = createIsolines(interpolatedGrid, properties)
        
        addDrawing(isolines)

        onSuccess()
    }

    return (
        <Form 
            initialValues={{ 
                points: selectedPoints, 
                min: Math.floor(Math.min(...selectedPoints.map(x => x.properties.elevation || 0))), 
                max: Math.ceil(Math.max(...selectedPoints.map(x => x.properties.elevation || 0)))
            }} 
            className="feature-form" 
            labelCol={{ span: 24 }} 
            onFinish={handleFinish}
        >
            <FormItem label="Min" name="min" rules={[{ required: true }]}>
                <InputNumber />
            </FormItem>
            <FormItem label="Max" name="max" rules={[{ required: true }]}>
                <InputNumber />
            </FormItem>
            <FormItem label="Tick" name="tick" rules={[{ required: true }]}>
                <InputNumber />
            </FormItem>
            <FormItem label="Type" name="category" rules={[{ required: true }]}>
                <DrawingCategorySelect categoryGroup="contour" />
            </FormItem>
            <FormItem label="Points" name="points" rules={[{ required: true }]}>
                <PointsTable readOnly />
            </FormItem>
            <Button htmlType="submit">Submit</Button>
        </Form>
    )
}

export default ContourForm