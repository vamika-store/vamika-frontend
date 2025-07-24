import axios from "axios";
import { API_BASE_URL, getHeaders } from "./constant"

export const fetchUserDetails = async () => {
    const url = API_BASE_URL + `/api/auth/profile`;
    try {
        const response = await axios(url, {
            method: 'GET',
            headers: getHeaders(),
        });
        return response?.data;
    } catch (error) {
        throw new Error(error);
    }
}