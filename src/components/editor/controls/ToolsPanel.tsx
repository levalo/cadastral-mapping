import { FC, useMemo } from "react"
import { Menu, MenuProps } from "antd"
import { useEditorContext } from "../../../contexts/EditorContext"
import Icon from "../../Icon"
import { ToolTypes } from "../../../store/reducers/editor"


interface ToolsPanelProps { }

const ToolsPanel: FC<ToolsPanelProps> = (props) => {
    const editor = useEditorContext()

    const menuItems: MenuProps['items'] = useMemo(() => [
        {
            key: ToolTypes.NONE,
            icon: <Icon name='cursor' width={20} height={20} />,
            label: "Cursor",
            onClick: () => editor.setActiveTool(ToolTypes.NONE)
        },
        {
            key: ToolTypes.ADD,
            icon: <Icon name='add-point' width={20} height={20} />,
            label: "Add",
            onClick: () => editor.setActiveTool(ToolTypes.ADD)
        },
        {
            key: ToolTypes.REMOVE,
            icon: <Icon name='remove-point' width={20} height={20} />,
            label: "Remove",
            onClick: () => editor.setActiveTool(ToolTypes.REMOVE)
        },
        {
            key: ToolTypes.DOT,
            icon: <Icon name='point' width={20} height={20} />,
            label: "Dot",
            onClick: () => editor.setActiveTool(ToolTypes.DOT)
        },
        {
            key: ToolTypes.LINE,
            icon: <Icon name='polyline' width={20} height={20} />,
            label: "Line",
            onClick: () => editor.setActiveTool(ToolTypes.LINE)
        },
        {
            key: ToolTypes.POLYGON,
            icon: <Icon name='polygon' width={20} height={20} />,
            label: "Polygon",
            onClick: () => editor.setActiveTool(ToolTypes.POLYGON)
        },
    ], [ editor ])

    return <Menu items={menuItems} selectable={true} mode="vertical" selectedKeys={[editor.activeTool]} />
}

export default ToolsPanel