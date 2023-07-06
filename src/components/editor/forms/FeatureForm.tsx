import { FC } from "react"
import { Button, Form, Input } from "antd"
import FeatureCategorySelect from "../controls/FeatureCategorySelect"
import FormItem from "antd/es/form/FormItem"
import PointsTable from "../controls/PointsTable"

interface PointFeatureFormProps {
    onFinish?: (data: FeatureLayer) => void
}

const FeatureForm: FC<PointFeatureFormProps> = (props) => {

    return (
        <Form className="feature-form" labelCol={{ span: 24 }} onFinish={props.onFinish}>
            <FormItem label="Name" name="name" rules={[{ required: true }]}>
                <Input />
            </FormItem>
            <FormItem label="Type" name="category" rules={[{ required: true }]}>
                <FeatureCategorySelect />
            </FormItem>
            <FormItem label="Points" name="points" rules={[{ required: true }]}>
                <PointsTable />
            </FormItem>
            <Button htmlType="submit">Submit</Button>
        </Form>
    )
}

export default FeatureForm