import React, {useEffect, useState} from "react";
import {getDevices} from "../api/services/devicesService";
import {Device} from "../api/model/Device";

const typeOptions = [
    { value: '!', label: 'All' },
    { value: 'WINDOWS_WORKSTATION', label: 'Windows Workstation' },
    { value: 'WINDOWS_SERVER', label: 'Windows Server' },
    { value: 'MAC', label: 'MAC' }
];

const sortOptions = [
    { value: 'system_name', label: 'System Name' },
    { value: 'hdd_capacity', label: 'HDD Capacity' }
];

export const DevicesList: React.FC = () => {
    const [devices, setDevices] = useState([]);

    useEffect(()=>{
        getDevices().then(response => {
            setDevices(response.data);
        });
    })

    return (
        <>
        <table>
            {devices.map((device:Device)=>{
                return (
                    <tr>
                        <td>{device.id}</td>
                        <td>{device.system_name}</td>
                        <td>{device.type}</td>
                        <td>{device.hdd_capacity}</td>
                    </tr>
                )
            })}
        </table>
        </>
    );
}