import { FC, useMemo } from "react"
import { Card, Space, Tree, Typography } from "antd"
import useFeatures from "../../../hooks/useFeatures"
import categories from "../features/categories"
import { DataNode } from "antd/es/tree"

interface FeaturesPanelProps { }

const categoryIconProps = {
    width: 20,
    height: 20
}

const FeaturesPanel: FC<FeaturesPanelProps> = (props) => {
    const { features } = useFeatures()

    const items: DataNode[] = useMemo(() => features.map((x, i) => ({
        key: i,
        title: (
            <Space>
                {categories[x.category].Icon(categoryIconProps)}
                <Typography.Text>{x.name}</Typography.Text>
            </Space>
        ),
    })), [ features ])

    return (
        <Card className="features-panel">
            <Tree treeData={items} />
        </Card>
    )
}

export default FeaturesPanel