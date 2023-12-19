import endpoint from "utils/endpoint";

export const fetchCustomersEndpoint = endpoint('get', '/admin/customers');
export const createCustomerEndpoint = endpoint('post', '/admin/customers');
export const updateCustomerEndpoint = (id: string) => endpoint('put', `/admin/customers/${id}`);
export const deleteCustomerEndpoint = (id: string) => endpoint('delete', `/admin/customers/${id}`);
export const fetchCustomerByUpdateEndpoint = (id: string) => endpoint('get', `/admin/customers/${id}/edit`);