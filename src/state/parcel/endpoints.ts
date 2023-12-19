import endpoint from "utils/endpoint";

export const fetchParcelsEndpoint = endpoint('get', '/admin/parcels');
export const fetchParcelByIdEndpoint = (id: string) => endpoint('get', `/admin/parcels/${id}`);
export const addOrderEndpoint = (id: string) => endpoint('post', `admin/parcels/add-order/${id}`);
export const removeOrderEndpoint = (id: string) => endpoint('post', `admin/parcels/remove-order/${id}`);
export const createParcelEndpoint = endpoint('post', '/admin/parcels');
export const updateParcelEndpoint = (id: string) => endpoint('put', `/admin/parcels/${id}`);
export const deleteParcelEndpoint = (id: string) => endpoint('delete', `/admin/parcels/${id}`);
export const sendParcelEndpoint = (id: string) => endpoint('post', `/admin/parcels/send/${id}`);
export const receivedParcelEndpoint = (id: string) => endpoint('post', `/admin/parcels/received/${id}`);
