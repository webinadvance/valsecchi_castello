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
        const response = await axios.post(endpoint, data, {withCredentials: true});
        return false;
        try {
            try {
                const response = await axios.post(endpoint, data, {withCredentials: true});
                return response.data;
            } catch (error: any) {
                if (error.response) {
                    console.error(error.response.data);
                    alert(JSON.stringify(error.response.data.errors));
                    throw (error);
                } else if (error.request) {
                    console.error(error.request);
                    throw (error);
                } else {
                    console.error('Error', error.message);
                    throw (error);
                }
                return null;
            }
        } catch (e) {
            console.log(e);
            throw (e);
        }
    }

    static async saveadminlang(data: object) {
        return await Api.postData('/api/db/saveadminlang', data);
    }

    static async deleteadminlang(data: object) {
        return await Api.postData('/api/db/deleteadminlang', data);
    }

    static async langall() {
        return await Api.getData('/api/db/langall');
    }

    static async user() {
        return await Api.getData('/api/user');
    }

    static async userparam(aaa: string) {
        return await Api.getData('/api/userparam', {aaa: aaa});
    }

}

export default Api;
