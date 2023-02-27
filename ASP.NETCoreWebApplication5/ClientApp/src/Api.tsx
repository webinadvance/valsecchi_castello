import axios, {AxiosResponse} from 'axios';

class Api {
    static async Eng(): Promise<AxiosResponse> {
        return await axios.get('/api/user');
    }

    static async User(): Promise<AxiosResponse> {
        return await axios.get('/api/user', {
            withCredentials: true,
        });
    }

    // add more endpoint methods as needed
}

export default Api;
