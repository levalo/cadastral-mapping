import { FC, useMemo } from "react"
import { Button, Space, Tree, Typography } from "antd"
import useDrawings from "../../../hooks/useDrawings"
import { DataNode } from "antd/es/tree"
import DrawingIcon from "../../DrawingIcon"
import { MinusCircleOutlined } from "@ant-design/icons"
import { useDrawingCategories } from "../../../contexts/DrawingCategoriesContext"

interface DrawingsTreeProps { }

const DrawingsTree: FC<DrawingsTreeProps> = (props) => {
    const { drawings, removeDrawing } = useDrawings()
    const categories = useDrawingCategories()

    const items: DataNode[] = useMemo(() => Object.keys(categories).map(x => ({
        key: x,
        title: (
            <Space>
                <DrawingIcon {...categories[x]} width={20} height={20} />
                <Typography.Text>{x}</Typography.Text>
            </Space>
        ),
        children: drawings.filter(y => y.value.features[0].properties.category === x).map(y => ({
            key: y.id,
            title: (
                <Space>
                    <Typography.Text>{y.value.features[0].properties.title}</Typography.Text>
                    <Button onClick={() => removeDrawing(y.id)} type='link'>
                        <MinusCircleOutlined style={{ color: '#f00' }} />
                    </Button>
                </Space>
            )
        }))
    })).filter(x => x.children.length > 0), [ drawings, categories ])

    return (
        <Tree treeData={items} />
    )
}

export default DrawingsTree