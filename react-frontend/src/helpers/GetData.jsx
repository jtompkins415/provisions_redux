import axios from 'axios';

export async function GetUserData(){
    const response = await axios.get('http://localhost:3001/users');
    const userData = response.data;

    return userData;
}