import { FC, useContext, useMemo } from "react"
import { Grid, Menu, MenuProps } from "antd"
import { editorContext } from "../Editor"
import { FileAddOutlined, FolderOpenOutlined, PlusOutlined, SelectOutlined } from "@ant-design/icons"
import PanelContainer from "./PanelContainer"

interface ActionsPanelProps { 
    
}

const ActionsPanel: FC<ActionsPanelProps> = (props) => {
    const { md } = Grid.useBreakpoint()
    const editor = useContext(editorContext)

    const menuItems: MenuProps['items'] = useMemo(() => [
        {
            key: 0,
            icon: <FileAddOutlined />,
            label: "New"
        },
        {
            key: 1,
            icon: <FolderOpenOutlined />,
            label: "Open"
        },
        {
            key: 2,
            type: 'divider'
        },
        {
            key: 3,
            icon: <PlusOutlined />,
            label: "Points",
            children: [
                {
                    key: 4,
                    label: "Import Points",
                    onClick: () => editor?.openDrawer("points")
                }
            ]
        },
        {
            key: 5,
            icon: <SelectOutlined />,
            label: "Selection",
            children: [
                {
                    key: 6,
                    label: "Add Feature",
                    onClick: () => editor?.openDrawer("feature")
                },
                {
                    key: 7,
                    label: "Clear Selection",
                    onClick: () => editor?.setSelectedPoints([])
                }
            ]
        }
    ], [ editor ])

    return (
        <PanelContainer position="topleft">
            <Menu className="actions-panel" items={menuItems} selectable={false} mode="horizontal" style={{ width: md ? 748 : 'auto' }} />
        </PanelContainer>
    )
}

export default ActionsPanel