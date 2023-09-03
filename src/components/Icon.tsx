import { FC } from "react"
import AntIcon from "@ant-design/icons"
import { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon"

interface IconProps {
    name: string
}

const Icon: FC<IconProps & Partial<CustomIconComponentProps>> = ({ name, width, height }) => {
    return (
        <AntIcon 
            component={() =>
                <svg width={width} height={height}>
                    <image href={`/cadastral-mapping/icons/${name}.svg`} width={width} height={height} />
                </svg>
            }
        />
    )
}

export default Icon