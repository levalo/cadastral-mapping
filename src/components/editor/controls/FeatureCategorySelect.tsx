import { FC } from "react"
import { Select, Space, Typography } from "antd"
import { DefaultOptionType, SelectProps } from "antd/es/select"
import categories from "../features/categories"

const categoryItems: DefaultOptionType[] = Object.keys(categories).map(x => ({
    value: x as FeatureCategory,
    label: (
        <Space>
            {categories[x as FeatureCategory].Icon({
                width: 16,
            })}
            <Typography.Text>{x}</Typography.Text>
        </Space>
    )
}))

const FeatureCategorySelect: FC<Omit<SelectProps, "options">> = (props) => {

    return (
        <Select options={categoryItems} {...props}/>
    )
}

export default FeatureCategorySelect