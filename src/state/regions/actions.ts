import {
	ICommunityById,
	IFetchCommunitiesSuccessPayload,
	IFetchRegionsSuccessPayload,
	IRegion,
	IRegionById,
	IRegionTypes,
	IUpdateAndCreateCommunity,
	RegionsTypes
} from "state/regions/types";
import {ActionWithPayload, IParams} from "state/types";

export type fetchAllRegionsRequestAction = ActionWithPayload<RegionsTypes.FETCH_ALL_REGIONS_REQUEST, IParams>;
export type fetchAllRegionsSuccessAction = ActionWithPayload<RegionsTypes.FETCH_ALL_REGIONS_SUCCESS, IFetchRegionsSuccessPayload>;
export type fetchRegionsRequestAction = ActionWithPayload<RegionsTypes.FETCH_REGIONS_REQUEST, IParams>;
export type fetchRegionsSuccessAction = ActionWithPayload<RegionsTypes.FETCH_REGIONS_SUCCESS, any>;
export type createRegionAction = ActionWithPayload<RegionsTypes.CREATE_REGION, {region: IRegionTypes} & {params: IParams}>;
export type updateRegionAction = ActionWithPayload<RegionsTypes.UPDATE_REGION, {region: IRegion} & {params: IParams}>;
export type deleteRegionAction = ActionWithPayload<RegionsTypes.DELETE_REGION, {id: string} & {params: IParams}>;
export type fetchRegionByIdRequestAction = ActionWithPayload<RegionsTypes.FETCH_REGION_BY_ID_REQUEST, string>;
export type fetchRegionByIdSuccessAction = ActionWithPayload<RegionsTypes.FETCH_REGION_BY_ID_SUCCESS, IRegionById>;
export type fetchCommunitiesRequestAction = ActionWithPayload<RegionsTypes.FETCH_COMMUNITIES_REQUEST, IParams>;
export type fetchCommunitiesSuccessAction = ActionWithPayload<RegionsTypes.FETCH_COMMUNITIES_SUCCESS, IFetchCommunitiesSuccessPayload>;
export type fetchCommunityByIdRequestAction = ActionWithPayload<RegionsTypes.FETCH_COMMUNITY_BY_ID_REQUEST, string>;
export type fetchCommunityByIdSuccessAction = ActionWithPayload<RegionsTypes.FETCH_COMMUNITY_BY_ID_SUCCESS, ICommunityById>;
export type createCommunityAction = ActionWithPayload<RegionsTypes.CREATE_COMMUNITY, IUpdateAndCreateCommunity>;
export type updateCommunityAction = ActionWithPayload<RegionsTypes.UPDATE_COMMUNITY, {community: IUpdateAndCreateCommunity, id: string}>;
export type deleteCommunityAction = ActionWithPayload<RegionsTypes.DELETE_COMMUNITY, {id: string} & {params: IParams}>;

export const fetchRegionsAllRequest = (params: any) => ({
    type: RegionsTypes.FETCH_ALL_REGIONS_REQUEST,
    payload: params,
});

export const fetchRegionsAllSuccess = (data: IFetchRegionsSuccessPayload) => ({
    type: RegionsTypes.FETCH_ALL_REGIONS_SUCCESS,
    payload: data,
});

export const fetchRegionsRequest = (params: any) => ({
    type: RegionsTypes.FETCH_REGIONS_REQUEST,
    payload: params,
});

export const fetchRegionsSuccess = (data: any) => ({
    type: RegionsTypes.FETCH_REGIONS_SUCCESS,
    payload: data,
});

export const createRegion = (data: {region: IRegionTypes} & {params: IParams}) => ({
    type: RegionsTypes.CREATE_REGION,
    payload: data,
});

export const updateRegion = (data: {region: IRegion} & {params: IParams}) => ({
    type: RegionsTypes.UPDATE_REGION,
    payload: data,
});

export const deleteRegion = (data: {params: IParams, id: string}) => ({
    type: RegionsTypes.DELETE_REGION,
    payload: data,
});

export const fetchRegionByIdRequest = (id: string) => ({
    type: RegionsTypes.FETCH_REGION_BY_ID_REQUEST,
    payload: id,
});

export const fetchRegionByIdSuccess = (data: IRegionById) => ({
    type: RegionsTypes.FETCH_REGION_BY_ID_SUCCESS,
    payload: data,
});

export const fetchCommunitiesRequest = (params: any) => ({
    type: RegionsTypes.FETCH_COMMUNITIES_REQUEST,
    payload: params,
});

export const fetchCommunitiesSuccess = (data: IFetchCommunitiesSuccessPayload) => ({
    type: RegionsTypes.FETCH_COMMUNITIES_SUCCESS,
    payload: data,
});

export const fetchCommunityByIdRequest = (id: string) => ({
    type: RegionsTypes.FETCH_COMMUNITY_BY_ID_REQUEST,
    payload: id,
});

export const fetchCommunityByIdSuccess = (data: ICommunityById) => ({
    type: RegionsTypes.FETCH_COMMUNITY_BY_ID_SUCCESS,
    payload: data,
});

export const createCommunity = (data: IUpdateAndCreateCommunity) => ({
    type: RegionsTypes.CREATE_COMMUNITY,
    payload: data,
});

export const updateCommunity = (data: {community: IUpdateAndCreateCommunity, id: string}) => ({
    type: RegionsTypes.UPDATE_COMMUNITY,
    payload: data,
});

export const deleteCommunity = (data: {id: string} & {params: IParams}) => ({
    type: RegionsTypes.DELETE_COMMUNITY,
    payload: data,
});

export type RegionActionTypes = fetchAllRegionsSuccessAction | fetchRegionsSuccessAction | fetchCommunitiesSuccessAction
    | fetchCommunityByIdSuccessAction | fetchRegionByIdSuccessAction;
