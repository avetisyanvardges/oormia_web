import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';
import {ParcelTypes} from "../types";
import {fetchParcelRequestAction, fetchParcelSuccess} from "../actions";
import {fetchParcelsEndpoint} from "../endpoints";


interface IDependencies {
    httpClient: AxiosInstance,
    action: fetchParcelRequestAction,
}

const fetchParcels = createLogic({
    type: ParcelTypes.FETCH_PARCELS_REQUEST,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = fetchParcelsEndpoint;

        try {
            const {data:{data}} = await httpClient.get(url, {params: action.payload});
            const metaData = {
                current_page: data.meta.current_page,
                last_page: data.meta.last_page,
                total: data.meta.total
            }
            dispatch(fetchParcelSuccess({ meta: metaData, parcel: data.data }));

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default fetchParcels;
