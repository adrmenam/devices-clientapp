import axios from "axios";
import {Device} from "../model/Device";

export const getDevices = async (): Promise<any> => {
    return axios('http://localhost:3000/devices');
}

export const saveDevice = async (device: Device): Promise<any> => {
    return axios({
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        url: `http://localhost:3000/devices`,
        data: device
    });
}

export const updateDevice = async (device: Device): Promise<any> => {
    return axios({
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        url: `http://localhost:3000/devices/${device.id}`,
        data: device
    });
}

export const deleteDevice = async (id: string): Promise<any> => {
    return axios({
        method: 'DELETE',
        url: `http://localhost:3000/devices/${id}`,
    });
}
