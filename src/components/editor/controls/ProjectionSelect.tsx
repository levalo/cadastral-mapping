import { FC, useState } from "react"
import { Select } from "antd"
import { SelectProps } from "antd/es/select"

interface ProjectionSelectProps extends Omit<SelectProps, "options"> {
    readOnly?: boolean,
    value?: string,
    onChange?: (event: { target: { value: string | undefined } }) => void
}

const projections = [
    {
        label: 'EPSG:32638',
        value: '+proj=utm +zone=38 +ellps=WGS84 +datum=WGS84 +units=m +no_defs'
    }
]

const ProjectionSelect: FC<ProjectionSelectProps> = (props) => {
    const [ value, setValue ] = useState<string | undefined>(props.defaultValue)

    const handleChange = (data: string) => {

        setValue(data)

        if(props.onChange) {
            props.onChange({ target: { value: data }})
        }
    }

    return (
        <Select options={projections} {...props} onChange={handleChange} value={value}/>
    )
}

export default ProjectionSelect