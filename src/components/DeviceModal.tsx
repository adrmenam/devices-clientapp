import React, {useState} from "react";
import {Modal} from "./Modal/Modal";
import {ModalMethod} from "../constants/ModalMethod";
import {Device} from "../api/model/Device";
import FILTERS from "../constants/filterConstants";
import {saveDevice, updateDevice} from "../api/services/devicesService";

interface IDeviceModalProps {
    modalMethod: ModalMethod;
    selectedDevice?: Device;
    setSelectedDevice: React.Dispatch<React.SetStateAction<Device | undefined>>;
    showModal: boolean;
    closeModal: () => void;
}

export const DeviceModal: React.FC<IDeviceModalProps> = ({
    modalMethod,
    selectedDevice,
    setSelectedDevice,
    showModal=false,
    closeModal
}) => {

    const [isSystemNameValid, setIsSystemNameValid] = useState<boolean>(false);
    const [isHddCapacityValid, setIsHddCapacityValid] = useState<boolean>(false);

    const handleSystemNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsSystemNameValid(isValidInput(event.target.value));
        setSelectedDevice({...selectedDevice, system_name: event.target.value})
    }

    const handleHddCapacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsHddCapacityValid(isValidInput(event.target.value));
        setSelectedDevice({...selectedDevice, hdd_capacity: event.target.value})
    }

    const isValidInput = (input: string | number) => {
        return (input !== '' && input != null)
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
        setSelectedDevice({...selectedDevice, type: event.target.value})
    }

    const modalChildren =  (
            <>
                <p>
                    <span className="modal-label">System Name *: </span>
                    <input value={selectedDevice?.system_name}
                           onChange={handleSystemNameChange} />
                </p>
                <p>
                    <span className="modal-label">Type *: </span>
                    <select
                        value={selectedDevice?.type || FILTERS.TYPE_OPTIONS[1].value}
                        onChange={handleDeviceTypeChange}
                    >
                        {FILTERS.TYPE_OPTIONS.filter(type => type.value!=='!').map(type=>{
                            return (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            )
                        })}
                    </select>
                </p>
                <p>
                    <span className="modal-label">HDD Capacity (GB) *: </span>
                    <input type="number" value={selectedDevice?.hdd_capacity} onChange={handleHddCapacityChange} />
                </p>
            </>
        )

    const handleSaveDevice = async () => {
        if(selectedDevice){
            if(!selectedDevice.type) {
                selectedDevice.type = FILTERS.TYPE_OPTIONS[1].value
            }
            switch(modalMethod){
                case ModalMethod.ADD:
                    saveDevice(selectedDevice)
                        .catch(()=>alert("Device save failed"))
                        .then(() => setSelectedDevice(new Device()))
                        .then(closeModal);
                    break;
                case ModalMethod.EDIT:
                    updateDevice(selectedDevice)
                        .catch(()=>alert("Device save failed"))
                        .then(() => setSelectedDevice(new Device()))
                        .then(closeModal)
                    break;
                default:
                    break;
            }
        }
    }

    const modalFooter = (
        <>
            <button
                className="button"
                onClick={handleSaveDevice}
                disabled={modalMethod !== ModalMethod.EDIT && (!isSystemNameValid || !isHddCapacityValid)}>
                Save
            </button>
        </>
    )

    return (
        <Modal
            title={`${modalMethod.toString()} DEVICE`}
            children={modalChildren}
            footer={modalFooter}
            show={showModal}
            closeAction={closeAction}
        />
    )
}