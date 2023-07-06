import { Space, SpaceProps } from "antd"
import { ControlOptions } from "leaflet"
import { FC, PropsWithChildren } from "react"

export const POSITION_CLASSES = {
    bottomleft: 'leaflet-bottom leaflet-left',
    bottomright: 'leaflet-bottom leaflet-right',
    topleft: 'leaflet-top leaflet-left',
    topright: 'leaflet-top leaflet-right',
}

interface ControlWrapperProps extends SpaceProps, ControlOptions, PropsWithChildren { }

const ControlsWrapper: FC<ControlWrapperProps> = ({ position, children, ...props }) => {
    const positionClass = (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright
    
    return (
        <div className={positionClass} style={{ width: "100%" }}>
            <div className="leaflet-control" style={{ display: "block", float: "none", margin: 10 }}>
                <Space {...props} style={{ width: "100%" }}>
                    { children }
                </Space>
            </div>
        </div>
    )
}

export default ControlsWrapper