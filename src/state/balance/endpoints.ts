import endpoint from "utils/endpoint";

export const transferEndpoint = endpoint('post', '/admin/balance/transfer');
export const fetchBalanceEndpoint = endpoint('get', '/admin/balance');
export const deleteBalanceEndpoint = (id: string) => endpoint('delete', `/admin/balance/${id}`);
