import React, {useEffect, useState} from "react";
import {Modal} from "./Modal/Modal";
import {Device} from "../api/model/Device";
import FILTERS from "../constants/filterConstants";

interface IDeviceModalProps {
    selectedDevice?: Device;
    showModal: boolean;
    saveDeviceAction: (device: Device) => void;
    closeModal: () => void;
}

export const DeviceModal: React.FC<IDeviceModalProps> = ({
    selectedDevice,
    saveDeviceAction,
    showModal=false,
    closeModal
}) => {

    const [isSystemNameValid, setIsSystemNameValid] = useState<boolean>(false);
    const [isHddCapacityValid, setIsHddCapacityValid] = useState<boolean>(false);

    const [systemName, setSystemName] = useState<string>('');
    const [type, setType] = useState<string>(FILTERS.TYPE_OPTIONS[1].value);
    const [hddCapacity, setHddCapacity] = useState<string>('');

    useEffect(()=>{
        if(selectedDevice){
            setType(selectedDevice?.type || FILTERS.TYPE_OPTIONS[1].value);
            setSystemName(selectedDevice?.system_name || '');
            setHddCapacity(selectedDevice?.hdd_capacity || '');
        }

        if(selectedDevice?.id){
            setIsSystemNameValid(true);
            setIsHddCapacityValid(true);
        }
    }, [selectedDevice])

    const isValidHddCapacityNumber = (value: string) => {
        return Number(value) >= 0 && !value.includes('.');
    }

    const handleSystemNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsSystemNameValid(isValidInput(event.target.value));
        setSystemName(event.target.value);
    }

    const handleHddCapacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsHddCapacityValid(isValidInput(event.target.value) && isValidHddCapacityNumber(event.target.value));
        setHddCapacity(event.target.value);
    }

    const isValidInput = (input: string | number) => {
        return (input !== '' && input != null && input.toString().trim() !== '')
    }

    const closeAction = () => {
        resetFieldsValidation();
        closeModal();
    }

    const resetFieldsValidation = () => {
        setIsHddCapacityValid(false);
        setIsSystemNameValid(false);
    }

    const handleDeviceTypeChange = (event:  React.ChangeEvent<HTMLSelectElement>) => {
        setType(event.target.value);
    }

    const modalChildren =  (
            <>
                <p>
                    <span className="modal-label">System Name *: </span>
                    <input value={systemName}
                           onChange={handleSystemNameChange} />
                </p>
                <p>
                    <span className="modal-label">Type *: </span>
                    <select
                        value={type}
                        onChange={handleDeviceTypeChange}
                    >
                        {FILTERS.TYPE_OPTIONS.filter(type => type.value!=='all').map(type=>{
                            return (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            )
                        })}
                    </select>
                </p>
                <p>
                    <span className="modal-label">HDD Capacity (GB) *: </span>
                    <input type="number" min="0" value={hddCapacity} onChange={handleHddCapacityChange} />
                </p>
            </>
        )

    const handleSaveDevice = () => {
        saveDeviceAction({id: selectedDevice?.id, system_name: systemName, type: type, hdd_capacity: hddCapacity});
    }

    const modalFooter = (
        <>
            <button
                className="button button-main"
                onClick={handleSaveDevice}
                disabled={!isSystemNameValid || !isHddCapacityValid}>
                Save
            </button>
        </>
    )

    return (
        <Modal
            title={`${selectedDevice?.id ? 'EDIT': 'ADD'} DEVICE`}
            footer={modalFooter}
            show={showModal}
            closeAction={closeAction}
        >
            {modalChildren}
        </Modal>
    )
}