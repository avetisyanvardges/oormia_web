import fetchAllRegions from './fetchAllRegions';
import createRegion from './createRegion';
import updateRegion from './updateRegion';
import deleteRegion from './deleteRegion';
import fetchCommunities from './fetchCommunities';
import fetchCommunityById from './fetchCommunityById';
import createCommunity from './createCommunity';
import updateCommunity from './updateCommunity';
import deleteCommunity from './deleteCommunity';
import fetchRegionById from './fetchRegionById';
import fetchRegions from './fetchRegions';

const regionsOperations = [
    fetchAllRegions,
    createRegion,
    updateRegion,
    deleteRegion,
    fetchCommunities,
    fetchCommunityById,
    createCommunity,
    updateCommunity,
    deleteCommunity,
    fetchRegionById,
    fetchRegions,
];

export default regionsOperations;