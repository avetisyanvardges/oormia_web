import endpoint from "utils/endpoint";

export const fetchRolesEndpoint = endpoint('get', '/admin/roles');
export const fetchPermissionsEndpoint = endpoint('get', '/admin/permissions');
export const fetchRolesByIdEndpoint = (id: string) => endpoint('get', `/admin/roles/${id}`);
export const createRoleEndpoint = endpoint('post', '/admin/roles');
export const updateRoleEndpoint = (id: string) => endpoint('put', `/admin/roles/${id}`);
export const deleteRoleEndpoint = (id: string) => endpoint('delete', `/admin/roles/${id}`);
