import { FC, useMemo } from "react"
import { Grid, Menu, MenuProps } from "antd"
import { FileAddOutlined, FolderOpenOutlined, PlusOutlined, SelectOutlined } from "@ant-design/icons"
import { useEditorContext } from "../../../contexts/EditorContext"
import { DrawerTypes } from "../../../store/reducers/editor"

interface ActionsPanelProps { }

const ActionsPanel: FC<ActionsPanelProps> = (props) => {
    const editor = useEditorContext()
    const { md } = Grid.useBreakpoint()

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
                    onClick: () => editor.openDrawer(DrawerTypes.POINTS)
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
                    onClick: () => editor.openDrawer(DrawerTypes.DRAWING)
                },
                {
                    key: 7,
                    label: "Add Contour",
                    onClick: () => editor.openDrawer(DrawerTypes.CONTOUR)
                },
                {
                    key: 8,
                    label: "Clear Selection",
                    onClick: () => editor.clearSelectedPoints()
                }
            ]
        }
    ], [ editor ])

    return (
        <Menu className="actions-panel" items={menuItems} selectable={false} mode="horizontal" style={{ maxWidth: md ? 240 : 'auto' }} />
    )
}

export default ActionsPanel