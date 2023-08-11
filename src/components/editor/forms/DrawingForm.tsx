import { FC, useMemo } from "react"
import { Button, Form, Input } from "antd"
import DrawingCategorySelect from "../controls/DrawingCategorySelect"
import FormItem from "antd/es/form/FormItem"
import PointsTable from "../controls/PointsTable"
import useDrawings from "../../../hooks/useDrawings"
import usePoints from "../../../hooks/usePoints"
import { Feature, Point } from "geojson"
import { DrawingCategory } from "../../DrawingCategories"

interface DrawingFormProps {
    points: string[]
    onSuccess: () => void
}

const DrawingForm: FC<DrawingFormProps> = ({ points, onSuccess }) => {
    const { addDrawing } = useDrawings()
    const { filterByUid } = usePoints()

    const selectedPoints = useMemo(() => filterByUid(points), [ points ])

    const handleFinish = (data: { name: string, category: DrawingCategory, points: Feature<Point, PointProperties>[] }) => {
        if (data.points.length === 0) return

        addDrawing(data.name, data.category, data.points)

        onSuccess()
    }

    return (
        <Form initialValues={{ points: selectedPoints }} className="feature-form" labelCol={{ span: 24 }} onFinish={handleFinish}>
            <FormItem label="Name" name="name" rules={[{ required: true }]}>
                <Input />
            </FormItem>
            <FormItem label="Type" name="category" rules={[{ required: true }]}>
                <DrawingCategorySelect />
            </FormItem>
            <FormItem label="Points" name="points" rules={[{ required: true }]}>
                <PointsTable readOnly />
            </FormItem>
            <Button htmlType="submit">Submit</Button>
        </Form>
    )
}

export default DrawingForm