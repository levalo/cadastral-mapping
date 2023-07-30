import { FC, useContext, useMemo } from "react"
import { Button, Space, Tree, Typography } from "antd"
import { DataNode } from "antd/es/tree"
import { MinusCircleOutlined } from "@ant-design/icons"
import usePoints from "../../../hooks/usePoints"
import { editorContext } from "../Editor"

interface PointsTreeProps { }

const PointsTree: FC<PointsTreeProps> = (props) => {
    const editor = useContext(editorContext)
    const { features, groups, dispatchRemovePointsGroup, dispatchRemovePoints } = usePoints()

    const items: Array<DataNode & { id?: string }> = useMemo(() => {
        const g = groups()

        return Object.keys(g).map((x, i) => ({
            key: i,
            title: (
                <Space>
                    <Typography.Text>{x}</Typography.Text>
                    <Button onClick={() => dispatchRemovePointsGroup(x)} type='link'>
                        <MinusCircleOutlined style={{ color: '#f00' }} />
                    </Button>
                </Space>
            ),
            children: g[x].map(y => ({
                key: y.id!,
                id: y.id,
                title: (
                    <Space>
                        <Typography.Text>{y.properties.elevation}</Typography.Text>
                        <Button onClick={() => dispatchRemovePoints([y.id! as string])} type='link'>
                            <MinusCircleOutlined style={{ color: '#f00' }} />
                        </Button>
                    </Space>
                ),
                isLeaf: true
            }))
        }))
    }, [ features ])

    return (
        <Tree.DirectoryTree 
            treeData={items} 
            style={{ width: 210 }} 
            height={233} 
            checkedKeys={editor?.selectedPoints || []}
            onCheck={(_, { checkedNodes }) => editor?.setSelectedPoints(checkedNodes.filter(x => x.id).map(x => x.id!))} 
            selectable={false}
            checkable 
            defaultExpandAll 
            showLine 
        />
    )
}

export default PointsTree