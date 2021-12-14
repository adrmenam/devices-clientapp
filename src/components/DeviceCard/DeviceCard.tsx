import {Device} from "../../api/model/Device";
import React, {ReactNode} from "react";
import "./DeviceCard.css"

interface IDeviceCardProps {
    device: Device
    actionButtons?: ReactNode
}

export const DeviceCard: React.FC<IDeviceCardProps> = ({
    device,
    actionButtons
}) => {
    return (
        <div className="card">
            <div className="card-body">
                <div className="card-item-name">
                    {device.system_name}
                </div>
                <div className="card-item-details">
                    {device.type}<br/>
                    {device.hdd_capacity} GB
                </div>
            </div>
            <div className="card-actions">
                {actionButtons}
            </div>
        </div>
    )
}

