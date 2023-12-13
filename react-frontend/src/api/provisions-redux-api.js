import axios from 'axios';
const BASE_URL = import.meta.env.REACT_APP_BASE_URL || "http://localhost:3001"

class ProvisionsReduxApi {
    static token;

    static async request(endpoint, data={}, method='get'){
        console.debug('API Call: ', endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = {Authorization: `Bearer ${ProvisionsReduxApi.token}`}
        const params = (method === 'get') ? data : {};

        try {
            return (await axios({url, method, data, params, headers}));
        } catch(err) {
            console.error('API Error:', err.respones);
            console.error('Endpoint:', endpoint);
            console.error('Data:', data);
            console.error('Method:', method);
            let message = err.response?.data?.error?.message;
            throw Array.isArray(message) ? message: [message];
        }    
    }
    
    static async getCurrUser(username){
        let res = await this.request(`users/${username}`);
        return res.data;        
    }

    static async userLogin(username, password) {
        let res = await this.request('users/login', {username, password},'post');
        console.log(res);
        return res.data.token;
    }

    static async userSignup(username, email, password, first_name, last_name, city, state){
        let res = await this.request('users/create', {username, email, password, first_name, last_name, city, state}, 'post');
        console.log(res);
        return res.data.token;
    }

    static async getOrdersByUser(user_id){
        console.log(`REQUESTING ORDERS FOR USER ${user_id}`);
        let res = await this.request(`orders/userOrders/${user_id}`);
        return res.data;
    }

    static async getAllFoodData(){
        console.log('REQUESTING FOOD DATA');
        let res = await this.request('foods/');
        return res.data;
    }

    static async getAllBeerData(){
        console.log('REQUESTING BEER DATA');
        let res = await this.request('beers/');
        return res.data;
    }

    static async getAllWineData(){
        console.log('REQUESTING WINE DATA')
        let res = await this.request('wines/');
        return res.data;
    }
}

export default ProvisionsReduxApi;