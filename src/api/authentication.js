import axios from "axios";
import { API_BASE_URL } from "./constant"

export const loginApi = async (body) => {
     const url = API_BASE_URL + 'api/auth/login';
     try {
            const response = await axios(url, {
                method: 'POST',
                data: body
            });
            return response.data;
     }
        catch (error) {
            throw new Error(error);
    }
}

export const registerApi = async (body) => {
    const url = API_BASE_URL + 'api/auth/register';
    try {
        const response = await axios(url, {
            method: 'POST',
            data: body
        });
        return response.data;
    }
    catch (error) {
        throw new Error(error);
    }
}

export const verifyAPI = async (body) => {
    const url = API_BASE_URL + 'api/auth/verify';
    try {
        const response = await axios(url, {
            method: 'POST',
            data: body
        });
        return response.data;
    }
    catch (error) {
        throw new Error(error);
    }
}
