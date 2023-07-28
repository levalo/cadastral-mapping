import { FC, useContext, useMemo } from "react"
import { Select, Space, Typography } from "antd"
import { DefaultOptionType, SelectProps } from "antd/es/select"
import CategoryIcon from "../../CategoryIcon"
import { featureCategoriesContext } from "../../FeatureCategories"

const FeatureCategorySelect: FC<Omit<SelectProps, "options">> = (props) => {
    const categories = useContext(featureCategoriesContext)

    const categoryItems: DefaultOptionType[] = useMemo(() => Object.keys(categories).map(x => ({
        value: x,
        label: (
            <Space>
                <CategoryIcon category={categories[x]} width={20} height={20} />
                <Typography.Text>{x}</Typography.Text>
            </Space>
        )
    })), [ categories ])

    return (
        <Select options={categoryItems} {...props}/>
    )
}

export default FeatureCategorySelect