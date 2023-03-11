import axios from "axios";

class Api {
    static async getData(endpoint: string, params?: object): Promise<any> {
        const response = await axios.get(endpoint, {
            params,
            withCredentials: true,
        });
        return response.data;
    }

    static async postData(endpoint: string, data: any): Promise<void> {
        await axios.post(endpoint, data, {withCredentials: true});
    }

    static saveadminlang = (data: any) =>
        Api.postData("/api/db/saveadminlang", data);
    static uploadimage = (data: any) =>
        Api.postData("/api/db/uploadimage", data);
    static deleteadminlang = (data: any) =>
        Api.postData("/api/db/deleteadminlang", data);
    static langall = () => Api.getData("/api/db/langall").catch(() => null);
    static user = () => Api.getData("/api/user").catch(() => null);
}

export default Api;
