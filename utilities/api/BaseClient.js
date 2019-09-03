import axios from 'axios';
import {state} from '../../../store/users';
import Raven from 'raven-js';

/**
 * Create a new Axios client instance
 * @see https://github.com/mzabriskie/axios#creating-an-instance
 */
export default function callApi(baseUrl = `http://localhost:8080/api/1.0/`) {

    const options = {
        baseURL: baseUrl
    };

    if (state.accessToken) {
        options.headers = {
            Authorization: `Bearer ${state.accessToken}`,
        };
    }

    const client = axios.create(options);

    // Add a request interceptor
    client.interceptors.request.use(
        requestConfig => requestConfig,
        (requestError) => {
            Raven.captureException(requestError);
            return Promise.reject(requestError);
        },
    );

    // Add a response interceptor
    client.interceptors.response.use(
        response => response,
        (error) => {
            if (error.response.status >= 500) {
                Raven.captureException(error);
            }

            return Promise.reject(error);
        },
    );

    return client;
};

