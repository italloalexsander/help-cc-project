import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://help-cc-default-rtdb.firebaseio.com/'
});

export default instance;