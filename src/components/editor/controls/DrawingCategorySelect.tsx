import { FC, useMemo, useState } from "react"
import { Select, Space, Typography } from "antd"
import { DefaultOptionType, SelectProps } from "antd/es/select"
import DrawingIcon from "../../DrawingIcon"
import { useDrawingCategories } from "../../../contexts/DrawingCategoriesContext"

interface DrawingCategorySelectProps extends Omit<SelectProps, "options"> {
    categoryGroup: 'drawing' | 'contour',
    readOnly?: boolean,
    value?: DrawingCategory,
    onChange?: (event: { target: { value: { name: string, data: DrawingCategory | undefined} } }) => void
}

const DrawingCategorySelect: FC<DrawingCategorySelectProps> = ({ categoryGroup, ...props }) => {
    const [ value, setValue ] = useState<string | undefined>(props.defaultValue)
    const categories = useDrawingCategories()

    const items: DefaultOptionType[] = useMemo(() => Object.keys(categories).filter(x => categories[x].group === categoryGroup).map(x => ({
        value: x,
        label: (
            <Space>
                <DrawingIcon {...categories[x]} width={20} height={20} />
                <Typography.Text>{x}</Typography.Text>
            </Space>
        )
    })), [ categories ])

    const handleChange = (data: string) => {

        setValue(data)

        if(props.onChange) {
            props.onChange({ target: { value: { name: data, data: categories[data] } }})
        }
    }

    return (
        <Select options={items} {...props} onChange={handleChange} value={value}/>
    )
}

export default DrawingCategorySelect