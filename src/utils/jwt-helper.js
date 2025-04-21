

import { jwtDecode } from "jwt-decode";

export const isTokenValid = () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return false;
    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert to seconds
        return decoded.exp > currentTime;
    }
    catch (error) {
        console.error("Invalid token", error);
        return false;
    }
}

export const saveToken = (token) => {
    localStorage.setItem("authToken", token);
}

export const logout = () => {
    localStorage.clear();
}