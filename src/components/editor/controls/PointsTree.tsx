import { FC, useMemo } from "react"
import { Button, Space, Tree, Typography } from "antd"
import { DataNode } from "antd/es/tree"
import { MinusCircleOutlined } from "@ant-design/icons"

import usePoints from "../../../hooks/usePoints"
import { useEditorContext } from "../../../contexts/EditorContext"
import { PointType } from "../../../store/reducers/points"

interface PointsTreeProps { }

const PointsTree: FC<PointsTreeProps> = (props) => {
    const editor = useEditorContext()
    const { points: features, groups, removePointsByGroup, removePoints } = usePoints()

    const items: Array<DataNode & { point?: PointType }> = useMemo(() => {
        const g = groups()

        return Object.keys(g).map((x, i) => ({
            key: i,
            title: (
                <Space>
                    <Typography.Text>{x}</Typography.Text>
                    <Button onClick={() => removePointsByGroup(x)} type='link'>
                        <MinusCircleOutlined style={{ color: '#f00' }} />
                    </Button>
                </Space>
            ),
            children: g[x].map(y => ({
                key: y.id!,
                id: y.id,
                point: y,
                title: (
                    <Space>
                        <Typography.Text>{y.properties.elevation}</Typography.Text>
                        <Button onClick={() => removePoints([y])} type='link'>
                            <MinusCircleOutlined style={{ color: '#f00' }} />
                        </Button>
                    </Space>
                ),
                isLeaf: true
            }))
        }))
    }, [ features ])

    const selectedKeys = useMemo(() => editor.selectedPoints.map(x => x.id!), [ editor.selectedPoints ])

    return (
        <Tree.DirectoryTree 
            treeData={items} 
            style={{ width: 210 }} 
            height={233} 
            checkedKeys={selectedKeys}
            onCheck={(_, { checkedNodes }) => editor.setSelectedPoints(checkedNodes.filter(x => x.point).map(x => x.point!))} 
            selectable={false}
            checkable 
            defaultExpandAll 
            showLine 
        />
    )
}

export default PointsTree