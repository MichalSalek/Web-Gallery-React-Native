// node_modules
import axios from 'axios'

// Environment
import {env} from '../environment/environment'

export class HttpService {

    get(url, params) {
        return axios(env.apiUrl + url, {
            headers: {
                ...params,
            },
            method: 'GET',
        })
    }

    post(url, data, params) {
        return axios(env.apiUrl + url, {
            data,
            headers: {
                ...params,
            },
            method: 'POST',
        })
    }

    put(url, data, params) {
        return axios(env.apiUrl + url, {
            data,
            headers: {
                ...params,
            },
            method: 'PUT',
        })
    }

    patch(url, data, params) {
        return axios(env.apiUrl + url, {
            data,
            headers: {
                ...params,
            },
            method: 'PATCH',
        })
    }

    delete(url, data, params) {
        return axios(env.apiUrl + url, {
            data,
            headers: {
                ...params,
            },
            method: 'DELETE',
        })
    }
}

export default new HttpService()
