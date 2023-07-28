import { FC } from "react"
import { Button, Form } from "antd"
import FormItem from "antd/es/form/FormItem"
import PointsTable from "../controls/PointsTable"
import usePoints from "../../../hooks/usePoints"

interface PointsFormProps {
    onSuccess: () => void
}

const PointsForm: FC<PointsFormProps> = ({ onSuccess }) => {
    const { dispatchAddPoints } = usePoints()

    const handleFinish = (data: { points: Point[] }) => {
        dispatchAddPoints(data.points)

        onSuccess()
    }

    return (
        <Form className="feature-form" labelCol={{ span: 24 }} onFinish={handleFinish}>
            <FormItem label="Points" name="points" rules={[{ required: true }]}>
                <PointsTable />
            </FormItem>
            <Button htmlType="submit">Submit</Button>
        </Form>
    )
}

export default PointsForm