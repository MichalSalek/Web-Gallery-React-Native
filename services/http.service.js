// node_modules
import axios from 'axios'

// Environment
import {env} from '../environment/environment'

export class HttpService {
    headers = {}

    // setRESTHeaders = () => {
    //     this.headers = {
    //         Accept: 'text/html,application/xhtml+xml,application/json,application/xml;q=0.9,*/*;q=0.8',
    //         'Content-Type': 'application/json',
    //     }
    // }

    get(url, params) {
        // this.setRESTHeaders()
        return axios(env.apiUrl + url, {
            headers: {
                ...params,
            },
            method: 'GET',
        })
    }

    post(url, data) {
        return axios(env.apiUrl + url, {
            data,
            headers: {
                ...this.headers,
            },
            method: 'POST',
        })
    }

    put(url, data) {
        return axios(env.apiUrl + url, {
            data,
            headers: {
                ...this.headers,
            },
            method: 'PUT',
        })
    }

    patch(url, data) {
        return axios(env.apiUrl + url, {
            data,
            headers: {
                ...this.headers,
            },
            method: 'PATCH',
        })
    }

    delete(url, data) {
        return axios(env.apiUrl + url, {
            data,
            headers: {
                ...this.headers,
            },
            method: 'DELETE',
        })
    }
}

export default new HttpService()
