import { FC, useMemo } from "react"
import { Button, Space, Tree, Typography } from "antd"
import useDrawings from "../../../hooks/useDrawings"
import { DataNode } from "antd/es/tree"
import DrawingIcon from "../../DrawingIcon"
import { MinusCircleOutlined } from "@ant-design/icons"

interface DrawingsTreeProps { }

const DrawingsTree: FC<DrawingsTreeProps> = (props) => {
    const { features, removeDrawing } = useDrawings()

    const items: DataNode[] = useMemo(() => features.map(({ root, decorators }, i) => ({
        key: i,
        title: (
            <Space>
                <DrawingIcon 
                    type={root.geometry.type} 
                    options={root.properties} 
                    decorators={decorators.map(x => ({ 
                        type: x.geometry.type, 
                        options: x.properties 
                    }))}
                    width={20} 
                    height={20} 
                />
                <Typography.Text>{root.properties.title}</Typography.Text>
                <Button onClick={() => removeDrawing(root.id! as string)} type='link'>
                    <MinusCircleOutlined style={{ color: '#f00' }} />
                </Button>
            </Space>
        ),
    })), [ features ])

    return (
        <Tree treeData={items} />
    )
}

export default DrawingsTree