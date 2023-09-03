import { FC } from "react"
import { Button, Form, Input, InputNumber } from "antd"
import { Feature, Point } from "geojson"
import FormItem from "antd/es/form/FormItem"
import { useEditorContext } from "../../../contexts/EditorContext"

interface AddPointFormProps {
    onSuccess: () => void
}

const AddPointForm: FC<AddPointFormProps> = ({ onSuccess }) => {
    const { editingPoint, addCreatedPoint } = useEditorContext()

    const handleFinish = (data: { group: string, lat: number, lng: number, elevation: number }) => {

        const point: Feature<Point, PointProperties> = {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [
                    data.lat,
                    data.lng,
                    data.elevation
                ]
            },
            properties: {
                elevation: data.elevation,
                group: data.group
            }
        }
        
        addCreatedPoint(point)

        onSuccess()
    }

    return (
        <Form 
            initialValues={{ 
                lat: editingPoint?.geometry.coordinates[0],
                lng: editingPoint?.geometry.coordinates[1],
            }} 
            className="feature-form" 
            labelCol={{ span: 24 }} 
            onFinish={handleFinish}
        >
            <FormItem label="Group" name="group" rules={[{ required: true }]}>
                <Input />
            </FormItem>
            <FormItem label="Latitude" name="lat" rules={[{ required: true }]}>
                <InputNumber />
            </FormItem>
            <FormItem label="Longtitude" name="lng" rules={[{ required: true }]}>
                <InputNumber />
            </FormItem>
            <FormItem label="Elevation" name="elevation" rules={[{ required: true }]}>
                <InputNumber />
            </FormItem>
            <Button htmlType="submit">Submit</Button>
        </Form>
    )
}

export default AddPointForm