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

    static async postData(endpoint: string, data: object): Promise<void> {
        try {
            await axios.post(endpoint, data, {withCredentials: true});
        } catch (error: any) {
            if (error.response) {
                console.error(error.response.data);
                alert(JSON.stringify(error.response.data.errors));
                throw error;
            } else if (error.request) {
                console.error(error.request);
                throw error;
            } else {
                console.error('Error', error.message);
                throw error;
            }
        }
    }

    static async saveadminlang(data: object): Promise<any> {
        return await Api.postData('/api/db/saveadminlang', data);
    }

    static async deleteadminlang(data: object): Promise<any> {
        return await Api.postData('/api/db/deleteadminlang', data);
    }

    static async langall(): Promise<any> {
        return await Api.getData('/api/db/langall');
    }

    static async user(): Promise<any> {
        return await Api.getData('/api/user');
    }

}

export default Api;
