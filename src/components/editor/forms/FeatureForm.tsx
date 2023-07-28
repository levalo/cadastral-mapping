import { FC, useMemo } from "react"
import { Button, Form } from "antd"
import FeatureCategorySelect from "../controls/FeatureCategorySelect"
import FormItem from "antd/es/form/FormItem"
import PointsTable from "../controls/PointsTable"
import useFeatures from "../../../hooks/useFeatures"
import usePoints from "../../../hooks/usePoints"

interface FeatureFormProps {
    points: string[]
    onSuccess: () => void
}

const FeatureForm: FC<FeatureFormProps> = ({ points, onSuccess }) => {
    const { dispatchAddFeature } = useFeatures()
    const { filterByUid } = usePoints()

    const selectedPoints = useMemo(() => filterByUid(points), [ points ])

    const handleFinish = (data: Feature) => {
        if (data.points.length === 0) return

        dispatchAddFeature(data)

        onSuccess()
    }

    return (
        <Form initialValues={{ points: selectedPoints }} className="feature-form" labelCol={{ span: 24 }} onFinish={handleFinish}>
            <FormItem label="Type" name="category" rules={[{ required: true }]}>
                <FeatureCategorySelect />
            </FormItem>
            <FormItem label="Points" name="points" rules={[{ required: true }]}>
                <PointsTable readOnly />
            </FormItem>
            <Button htmlType="submit">Submit</Button>
        </Form>
    )
}

export default FeatureForm