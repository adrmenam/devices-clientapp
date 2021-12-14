import {Device} from "../../api/model/Device";
import React from "react";
import "./DeviceCard.css"

interface IDeviceCardProps {
    device: Device
    openEditModal: (device?: Device | undefined) => void,
    deleteDevice: (device?: Device | undefined) => void,
}

export const DeviceCard: React.FC<IDeviceCardProps> = ({
    device,
    openEditModal,
    deleteDevice
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
                <button className="button button-main" onClick={()=>openEditModal(device)}>Edit</button>
                <button className="button button-warning" onClick={()=>deleteDevice(device)}>Delete</button>
            </div>
        </div>
    )
}

