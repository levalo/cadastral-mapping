import { FC, useContext, useMemo } from "react"
import { Menu, MenuProps } from "antd"
import { editorContext } from "../Editor"
import { FileAddOutlined, FolderOpenOutlined, PlusOutlined } from "@ant-design/icons"

interface ActionsPanelProps { 
    
}

const ActionsPanel: FC<ActionsPanelProps> = (props) => {
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
            icon: <PlusOutlined />,
            label: "Add",
            onClick: editor?.onAddFeatureDrawerOpen
        }
    ], [ editor ])

    return (
        <Menu className="actions-panel" items={menuItems} selectable={false} mode="horizontal" />
    )
}

export default ActionsPanel