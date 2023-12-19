export enum DataRequestTypes {
    DATA_API_REQUEST = 'DATA_API_REQUEST',
    DATA_API_SUCCESS = 'DATA_API_SUCCESS',
    DATA_API_FAILURE = 'DATA_API_FAILURE',
    CLEAR_DATA_REDUCER = 'CLEAR_DATA_REDUCER',
}

export interface IEndpoint { endpoint: string }

export interface IDataApiSuccessPayload extends IEndpoint { response: any }

export interface IDataApiFailurePayload extends IEndpoint { error: any }