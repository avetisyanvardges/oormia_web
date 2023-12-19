import {IMeta} from "state/types";

export enum RegionsTypes {
    FETCH_ALL_REGIONS_REQUEST = 'FETCH_ALL_REGIONS_REQUEST',
    FETCH_ALL_REGIONS_SUCCESS = 'FETCH_ALL_REGIONS_SUCCESS',
    FETCH_REGIONS_REQUEST = 'FETCH_REGIONS_REQUEST',
    FETCH_REGIONS_SUCCESS = 'FETCH_REGIONS_SUCCESS',
    CREATE_REGION = 'CREATE_REGION',
    UPDATE_REGION = 'UPDATE_REGION',
    DELETE_REGION = 'DELETE_REGION',
    FETCH_REGION_BY_ID_REQUEST = 'FETCH_REGION_BY_ID_REQUEST',
    FETCH_REGION_BY_ID_SUCCESS = 'FETCH_REGION_BY_ID_SUCCESS',
    FETCH_COMMUNITIES_REQUEST = 'FETCH_COMMUNITIES_REQUEST',
    FETCH_COMMUNITIES_SUCCESS = 'FETCH_COMMUNITIES_SUCCESS',
    FETCH_COMMUNITY_BY_ID_REQUEST = 'FETCH_COMMUNITY_BY_ID_REQUEST',
    FETCH_COMMUNITY_BY_ID_SUCCESS = 'FETCH_COMMUNITY_BY_ID_SUCCESS',
    CREATE_COMMUNITY = 'CREATE_COMMUNITY',
    UPDATE_COMMUNITY = 'UPDATE_COMMUNITY',
    DELETE_COMMUNITY = 'DELETE_COMMUNITY',
}

export interface IRegionTypes { region_am: string, region_en: string, region_ru: string, region?: string }

export interface IRegion extends IRegionTypes { id: number }

export interface IFetchRegionsSuccessPayload { meta: IMeta, regions: IRegion[] }

export interface ICommunity { community: string, id: number, region: { id: number, region: string }}

export interface ICommunityById {
    community_am: string, community_en: string, community_ru: string, id: number, region: { id: number, region: string }
}

export interface IRegionById {
    region_am?: string, region_en?: string, region_ru?: string, id?: number,
}

export interface IRegionsState {
    regionsAllMeta: IMeta,
    regionsAll: IRegion[],
    regions: IRegion[],
    regionById: IRegionById,
    communities: ICommunity[],
    communitiesMeta: IMeta,
    communityById: any,
}

export interface IFetchCommunitiesSuccessPayload { meta: IMeta, communities: ICommunity[] }

export interface IUpdateAndCreateCommunity { community_am: string, community_en: string, community_ru: string, region_id: string }



