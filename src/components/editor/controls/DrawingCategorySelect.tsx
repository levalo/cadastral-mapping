import { FC, useContext, useMemo, useState } from "react"
import { Select, Space, Typography } from "antd"
import { DefaultOptionType, SelectProps } from "antd/es/select"
import DrawingIcon from "../../DrawingIcon"
import { DrawingCategory, drawingCategoriesContext } from "../../DrawingCategories"

interface DrawingCategorySelectProps extends Omit<SelectProps, "options"> {
    readOnly?: boolean,
    value?: DrawingCategory,
    onChange?: (event: { target: { value: DrawingCategory | undefined } }) => void
}

const DrawingCategorySelect: FC<DrawingCategorySelectProps> = (props) => {
    const [ value, setValue ] = useState<string | undefined>(props.defaultValue)

    const categories = useContext(drawingCategoriesContext)

    const categoryItems: DefaultOptionType[] = useMemo(() => Object.keys(categories).map(x => ({
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
            props.onChange({ target: { value: categories[data] }})
        }
    }

    return (
        <Select options={categoryItems} {...props} onChange={handleChange} value={value}/>
    )
}

export default DrawingCategorySelect