import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';
import {fetchCategoriesEndpoint} from "../endpoints";
import {CategoryTypes} from "../types";
import { orderReceivedRequestAction} from "../actions";

interface IDependencies {
    httpClient: AxiosInstance,
    action: orderReceivedRequestAction,
}

const fetchAllCategories = createLogic({
    type: CategoryTypes.FETCH_ALL_CATEGORIES_REQUEST,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = fetchCategoriesEndpoint;

        try {
            const {data} = await httpClient.get(url);
            console.log(data,"DATA")

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default fetchAllCategories;
