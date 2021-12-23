import React, {useEffect, useState} from "react";
import {deleteDevice, getDevices, saveDevice, updateDevice} from "../api/services/devicesService";
import {Device} from "../api/model/Device";
import FILTERS from "../constants/filterConstants";
import {DeviceModal} from "./DeviceModal";
import {DeviceCard} from "./DeviceCard/DeviceCard";

export const DevicesPage: React.FC = () => {
    const [devices, setDevices] = useState<Device[]>([]);
    const [selectedType, setSelectedType] = useState<string>(FILTERS.TYPE_OPTIONS[0].value);
    const [selectedSort, setSelectedSort] = useState<string>(FILTERS.SORT_OPTIONS[0].value);
    const [selectedDevice, setSelectedDevice] = useState<Device>();
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(()=>{
        fetchDevices();
    },[])

    const fetchDevices = () => {
        getDevices().then(response => {
            setDevices(response.data);
        });
    }

    const handleShowModal = (device?: Device) => {
        if(!device){
            device = new Device();
        }
        setSelectedDevice(device);
        setShowModal(true);
    }

    const handleDeleteDevice = (device?: Device) => {
        if(device?.id){
            deleteDevice(device.id)
                .then(() => alert(`Device ${device?.system_name} deleted successfully`))
                .then(() => deleteDeviceFromList(device))
                .catch(() => alert("Device deletion failed"));
        }
    }

    const handleTypeFilterSelection = (event: React.ChangeEvent<HTMLSelectElement>) => setSelectedType(event.target.value)
    const handleTypeSortSelection = (event: React.ChangeEvent<HTMLSelectElement>) => setSelectedSort(event.target.value)

    const closeModal = () => {
        setShowModal(false);
    }

    const saveDeviceAction = async (device: Device) => {
        if(device.id){
            updateDevice(device)
                .then(() => updateDevicesList(device))
                .then(closeModal)
                .catch(() => alert("Device update failed"));
        }else{
            saveDevice(device)
                .then((result) => addToDevicesList(result.data))
                .then(closeModal)
                .catch(() => alert("Device save failed"));
        }
    }

    const updateDevicesList = (device: Device) => {
        setDevices(devices.map((deviceItem) => {
            if(deviceItem.id === device.id){
                return device;
            }
            return deviceItem;
        }));
    }

    const addToDevicesList = (device: Device) => {
        setDevices([...devices, device]);
    }

    const deleteDeviceFromList = (device: Device) => {
        setDevices(devices.filter((deviceItem) =>
            deviceItem.id !== device.id));
    }

    const filterAndSort = (devices: Device[]) => {
        return devices.filter((device) => (selectedType!=='all') ? device.type===selectedType : true)
            .sort((a, b) => {
                switch(selectedSort){
                    case "hdd_capacity":
                        return (parseInt(a.hdd_capacity || '0') > parseInt(b.hdd_capacity || '0')) ? 1 : -1;
                    case "system_name":
                        return ((a.system_name || '') > (b.system_name || '')) ? 1 : -1;
                    default:
                        return 0;
                }
            })
    }

    return (
        <>
            <div className="filter-section">
                <div>
                    Device Type:
                    <select
                        value={selectedType}
                        onChange={handleTypeFilterSelection}
                    >
                        {FILTERS.TYPE_OPTIONS
                            .map(type=><option key={type.value} value={type.value}>{type.label}</option>)}
                    </select>
                </div>
                <div>
                    Sort By:
                    <select
                        value={selectedSort}
                        onChange={handleTypeSortSelection}
                    >
                        {FILTERS.SORT_OPTIONS
                            .map(type=><option key={type.value} value={type.value}>{type.label}</option>)}
                    </select>
                </div>
            </div>
            <div className="add-device-container">
                <button className="button button-green" onClick={()=>handleShowModal()}>Add Device</button>
            </div>
            <div>
                {filterAndSort(devices)
                    .map((device:Device)=>{
                        return (
                            <DeviceCard key={`device_${device.id}`} device={device} openEditModal={handleShowModal} deleteDevice={handleDeleteDevice}/>
                        )
                    })}
            </div>
            <DeviceModal
                showModal={showModal}
                selectedDevice={selectedDevice}
                saveDeviceAction={saveDeviceAction}
                closeModal={closeModal}
            />
        </>
    );
}