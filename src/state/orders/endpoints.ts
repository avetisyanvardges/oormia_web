import endpoint from "utils/endpoint";

export const fetchOrdersEndpoint = endpoint('get', '/admin/orders');
export const createOrderEndpoint = endpoint('post', '/admin/orders');
export const updateOrderEndpoint = (id: string) => endpoint('put', `/admin/orders/${id}`);
export const fetchOrderByIdEndpoint = (id: string) => endpoint('get', `/admin/orders/${id}`);
export const fetchPickupOrdersEndpoint = endpoint('get', '/admin/couriers/orders');
export const fetchDeliveryOrdersEndpoint = endpoint('get', '/admin/couriers/orders/delivery');
export const acceptOrderEndpoint = endpoint('post', `/admin/couriers/orders/accepted`);
export const receiveOrderEndpoint = endpoint('post', `/admin/couriers/orders/received`);
export const deleteOrderEndpoint = (id: string) => endpoint('delete', `/admin/orders/${id}`);
export const sortOrderEndpoint =  endpoint('delete', `/admin/orders/sorting`);
export const confirmOrderEndpoint = endpoint('post', `/admin/orders/confirm`);
export const rejectOrderEndpoint = endpoint('post', `/admin/orders/reject`);
