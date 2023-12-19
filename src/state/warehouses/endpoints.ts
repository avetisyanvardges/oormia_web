import endpoint from "utils/endpoint";

export const fetchWarehousesEndpoint = endpoint('get', '/admin/warehouses');
export const fetchWarehouseEndpoint = endpoint('get', '/admin/warehouses');
export const setToWarehouseEndpoint = endpoint('get', '/admin/warehouses/orders/set-warehouse');
export const setToCourierEndpoint = endpoint('get', '/admin/warehouses/orders/set-in-courier');
export const createWarehouseEndpoint = endpoint('post', '/admin/warehouses');
export const updateWarehouseEndpoint = (id: string) => endpoint('put', `/admin/warehouses/${id}`);
export const deleteWarehouseEndpoint = (id: string) => endpoint('delete', `/admin/warehouses/${id}`);
export const fetchWarehouseByUpdateEndpoint = (id: string) => endpoint('get', `/admin/warehouses/${id}/edit`);
