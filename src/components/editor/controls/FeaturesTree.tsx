import { FC, useContext, useMemo } from "react"
import { Button, Space, Tree, Typography } from "antd"
import useFeatures from "../../../hooks/useFeatures"
import { DataNode } from "antd/es/tree"
import CategoryIcon from "../../CategoryIcon"
import { featureCategoriesContext } from "../../FeatureCategories"
import { MinusCircleOutlined } from "@ant-design/icons"

interface FeaturesTreeProps { }

const FeaturesTree: FC<FeaturesTreeProps> = (props) => {
    const categories = useContext(featureCategoriesContext)
    const { features, dispatchRemoveFeature } = useFeatures()

    const items: DataNode[] = useMemo(() => features.map((x, i) => ({
        key: i,
        title: (
            <Space>
                <CategoryIcon category={categories[x.category]} width={20} height={20} />
                <Typography.Text>{x.category}</Typography.Text>
                <Button onClick={() => dispatchRemoveFeature(i)} type='link'>
                    <MinusCircleOutlined style={{ color: '#f00' }} />
                </Button>
            </Space>
        ),
    })), [ features, categories ])

    return (
        <Tree treeData={items} />
    )
}

export default FeaturesTree