import axios, { AxiosResponse } from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;


export class ApiService {
    public async get(url: string) {
        const response: AxiosResponse<any[]> = await axios.get(baseURL + url);
        return response.data;
    }

    public async post(url: string, data: any) {
        const response: AxiosResponse<any> = await axios.post(baseURL + url, data);
        return response.data;
    }

    public async update(url: string, data: any) {
        const response: AxiosResponse<any> = await axios.put(baseURL + url, data);
        return response.data;
    }
    public async patch(url: string, data: any) {
        const response: AxiosResponse<any> = await axios.patch(baseURL + url, data);
        return response.data;
    }
    public async delete(url: string, data: any) {
        const response: AxiosResponse<any> = await axios.delete(baseURL + url, { data });
        return response.data;
    }
}