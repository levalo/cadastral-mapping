import { FC } from "react"
import { Button, Form } from "antd"
import FormItem from "antd/es/form/FormItem"
import PointsTable from "../controls/PointsTable"
import usePoints from "../../../hooks/usePoints"
import { PointType } from "../../../store/reducers/points"
import { ProjectionSelect } from "../controls"
import { projection } from "../../../tools/geo"

interface PointsFormProps {
    onSuccess: () => void
}

const PointsForm: FC<PointsFormProps> = ({ onSuccess }) => {
    const { addPoints } = usePoints()

    const handleFinish = (data: { projection: string, points: PointType[] }) => {
        const { project } = projection(data.projection)

        const projectedPoints = data.points.map(x => ({ 
            ...x, 
            geometry: {
                ...x.geometry,
                coordinates: project(x.geometry.coordinates)
            }
        }))

        addPoints(projectedPoints)

        onSuccess()
    }

    return (
        <Form className="feature-form" labelCol={{ span: 24 }} onFinish={handleFinish}>
            <FormItem label="Projection" name="projection" rules={[{ required: true }]}>
                <ProjectionSelect />
            </FormItem>
            <FormItem label="Points" name="points" rules={[{ required: true }]}>
                <PointsTable />
            </FormItem>
            <Button htmlType="submit">Submit</Button>
        </Form>
    )
}

export default PointsForm