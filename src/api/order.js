import { data } from "react-router-dom";
import { API_BASE_URL, getHeaders } from "./constant"
import { get } from "lodash";

export const placeOrderAPI = async (orderData) => {
    const url = API_BASE_URL + '/api/order';
    try {
        const response = await fetch(url, {
            method: 'POST',
            data: data,
            headers: getHeaders(),
    });
        return  response?.data;
    } catch (error) {
        throw new Error('Error placing order: ' + error.message);
    }
}