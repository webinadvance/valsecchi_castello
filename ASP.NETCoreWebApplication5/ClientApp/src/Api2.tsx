import axios from "axios";

export class Api2 {
    private static readonly baseURL = "/api/Db";

    static async getLangAll(): Promise<any> {
        const response = await axios.get(`${Api2.baseURL}/langall`);
        return response.data;
    }

    static async getLocales(lang: string): Promise<any> {
        const response = await axios.get(`${Api2.baseURL}/locales/${lang}`);
        return response.data;
    }

    static async syncLocales(): Promise<void> {
        await axios.get(`${Api2.baseURL}/synclocales`);
    }

    static async deleteAdminLang(dataToDelete: any): Promise<void> {
        await axios.post(`${Api2.baseURL}/deleteadminlang`, dataToDelete);
    }

    static async saveAdminLang(newData: any): Promise<void> {
        await axios.post(`${Api2.baseURL}/saveadminlang`, newData);
    }

    static async deleteImage(imageToDelete: string): Promise<void> {
        await axios.post(`${Api2.baseURL}/deleteimage?imageToDelete=${imageToDelete}`);
    }

    static async uploadImage(parentTitle: string, file: any): Promise<any> {
        const formData = new FormData();
        formData.append("parentTitle", parentTitle);
        formData.append("file", file);
        const response = await axios.post(`${Api2.baseURL}/uploadimage`, formData);
        return response.data;
    }
}
