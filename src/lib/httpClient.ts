import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import history from 'utils/browserHistory';

import {API_HOST, authController, eventController,  userController} from "constants/globals";
import Account from "lib/account";
import {store} from "state/store";
import {dataApiFailure, dataApiRequest, dataApiSuccess} from "state/data/actions";

const httpClient = axios.create({
    baseURL: `${API_HOST}`,
});

httpClient.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
    store.dispatch(dataApiRequest({ endpoint: `${config?.method} ${config?.url}` }));
    if(config?.url?.includes('auth')){
        config.baseURL = `${API_HOST}${authController}`
    } else if(config?.url?.includes('user')){
        config.baseURL = `${API_HOST}${userController}`
    } else if(config?.url?.includes('event')){
        config.baseURL = `${API_HOST}${eventController}`
    }

    const accessToken = Account.getAccessToken();
    if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
});

httpClient.interceptors.response.use(

    (response: AxiosResponse): AxiosResponse => {
        store.dispatch(dataApiSuccess({
            endpoint: `${response?.config?.method} ${response?.config?.url}`,
            response: response?.data?.message,
        }));

        return response;
    },
    (error: AxiosError): Promise<AxiosError> => {
        if (error.response && error.response.status === 401) {
            Account.delete();
            history.replace('auth/sign-in');
        }
        if (error.response && error.response.data) {
        // if (error.response && error.response.data && error.response.status !== 401) {
            store.dispatch(dataApiFailure({
                endpoint: `${error?.config?.method} ${error?.config?.url}`,
                error: error.response.data,
            }));
        }
        return Promise.reject(error)
    }
);

export default httpClient;
