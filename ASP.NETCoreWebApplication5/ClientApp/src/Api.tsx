import React from "react";
import axios, {AxiosResponse} from 'axios';

interface ApiResponse<T> {
    data: T | null;
    error: string | null;
}

interface Endpoint<T> {
    (params?: any): string;
}

export async function callApi<T>(endpoint: Endpoint<T>, method: string, data?: any): Promise<ApiResponse<T>> {
    const url = endpoint();

    try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response: AxiosResponse<T> = await axios({
            url,
            method,
            data,
            headers
        });

        return {
            data: response.data,
            error: null,
        };
    } catch (error: any) {
        return {
            data: null,
            error: error.response?.data?.message ?? error.message,
        };
    }
}

export function getUserEndpoint(): Endpoint<any> {
    return () => "/api/user";
}
