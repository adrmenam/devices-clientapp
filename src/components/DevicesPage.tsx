import React, {useEffect, useState} from "react";
import {deleteDevice, getDevices} from "../api/services/devicesService";
import {Device} from "../api/model/Device";
import FILTERS from "../constants/filterConstants";
import {ModalMethod} from "../constants/ModalMethod";
import {DeviceModal} from "./DeviceModal";
import {DeviceCard} from "./DeviceCard/DeviceCard";

export const DevicesPage: React.FC = () => {
    const [devices, setDevices] = useState<Device[]>([]);
    const [selectedType, setSelectedType] = useState<string>(FILTERS.TYPE_OPTIONS[0].value);
    const [selectedSort, setSelectedSort] = useState<string>(FILTERS.SORT_OPTIONS[0].value);
    const [selectedDevice, setSelectedDevice] = useState<Device>();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalMethod, setModalMethod] = useState<ModalMethod>(ModalMethod.ADD);


    useEffect(()=>{
        fetchDevices();
    },[])

    const fetchDevices = () => {
        getDevices().then(response => {
            setDevices(response.data);
        });
    }

    const handleShowModal = (modalMethod: ModalMethod, device?: Device) => {
        setModalMethod(modalMethod);
        if(!device){
            device = new Device();
        }
        setSelectedDevice(device);
        setShowModal(true);
    }

    const handleDeleteDevice = (device?: Device) => {
        if(device?.id){
            deleteDevice(device.id)
                .catch(()=>alert("Device deletion failed"))
                .then(()=>alert(`Device ${device?.system_name} deleted successfully`))
                .then(fetchDevices);
        }
    }

    const handleTypeFilterSelection = (event: React.ChangeEvent<HTMLSelectElement>) => setSelectedType(event.target.value)
    const handleTypeSortSelection = (event: React.ChangeEvent<HTMLSelectElement>) => setSelectedSort(event.target.value)

    const closeModal = () => {
        setShowModal(false);
        fetchDevices();
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
                        {FILTERS.TYPE_OPTIONS.map(type=>{
                            return (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    Sort By:
                    <select
                        value={selectedSort}
                        onChange={handleTypeSortSelection}
                    >
                        {FILTERS.SORT_OPTIONS.map(type=>{
                            return (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <div className="add-device-container">
                <button className="button button-green" onClick={()=>handleShowModal(ModalMethod.ADD)}>Add Device</button>
            </div>
            <div>
                {devices
                    .filter((device) => (selectedType!=='!') ? device.type===selectedType : true)
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
                    .map((device:Device)=>{
                        const actionButtons = (
                            <>
                                <button className="button button-main" onClick={()=>handleShowModal(ModalMethod.EDIT, device)}>Edit</button>
                                <button className="button button-warning" onClick={()=>handleDeleteDevice(device)}>Delete</button>
                            </>
                        )
                        return (
                            <DeviceCard device={device} actionButtons={actionButtons}/>
                        )
                    })}
            </div>
            <DeviceModal
                showModal={showModal}
                modalMethod={modalMethod}
                selectedDevice={selectedDevice}
                setSelectedDevice={setSelectedDevice}
                closeModal={closeModal}
            />
        </>
    );
}