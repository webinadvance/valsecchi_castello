import axios, {AxiosResponse} from 'axios';
import Cookies from "js-cookie";

class Api {
    static async Eng(): Promise<AxiosResponse> {
        return await axios.get('/api/user');
    }

    static async User(): Promise<AxiosResponse> {
        const token = Cookies.get(".AspNetCore.Cookies");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        return await axios.get('/api/user', config);
    }

    // add more endpoint methods as needed
}

export default Api;
