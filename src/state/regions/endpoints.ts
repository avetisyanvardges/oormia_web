import endpoint from "utils/endpoint";

export const fetchRegionsEndpointAll = endpoint('get', '/admin/regions/all');
export const fetchRegionsEndpoint = endpoint('get', '/admin/regions');
export const createRegionEndpoint = endpoint('post', '/admin/regions');
export const updateRegionEndpoint = (id: string) => endpoint('put', `/admin/regions/${id}`);
export const deleteRegionEndpoint = (id: string) => endpoint('delete', `/admin/regions/${id}`);
export const fetchRegionByIdEndpoint = (id: string) => endpoint('get', `/admin/regions/${id}`);

export const fetchCommunitiesEndpoint = endpoint('get', '/admin/communities');
export const fetchCommunityByIdEndpoint = (id: string) => endpoint('get', `/admin/communities/${id}`);
export const createCommunityEndpoint =  endpoint('post', `/admin/communities`);
export const updateCommunityEndpoint = (id: string) => endpoint('put', `/admin/communities/${id}`);
export const deleteCommunityEndpoint = (id: string) => endpoint('delete', `/admin/communities/${id}`);
