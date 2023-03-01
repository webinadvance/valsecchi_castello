import axios from 'axios';

class Api {
    static async getData(endpoint: string, params?: object): Promise<any> {
        try {
            const response = await axios.get(endpoint, {params, withCredentials: true});
            return response.data;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                return null;
            } else {
                return null;
            }
        }
    }

    static async postData(endpoint: string, data: object): Promise<any> {
        try {
            const response = await axios.post(endpoint, data, {withCredentials: true});
            return response.data;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                return null;
            } else {
                return null;
            }
        }
    }

    static async saveadmin(data: object) {
        return await Api.postData('/api/db/saveadmin', data);
    }

    static async langAll() {
        return await Api.getData('/api/db/all');
    }

    static async user() {
        return await Api.getData('/api/user');
    }

    static async userparam(aaa: string) {
        return await Api.getData('/api/userparam', {aaa: aaa});
    }

}

export default Api;
