import axios from 'axios';

export const rpaApi = axios.create({
    baseURL:`http://10.13.18.84:5000/`
})

