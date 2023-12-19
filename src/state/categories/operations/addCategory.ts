import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';
import {addCategoryEndpoint} from "../endpoints";
import {CategoryTypes} from "../types";
import {orderReceivedRequestAction} from "../actions";

interface IDependencies {
    httpClient: AxiosInstance,
    action: orderReceivedRequestAction,
}

const addCategory = createLogic({
    type: CategoryTypes.ADD_CATEGORY_REQUEST,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = addCategoryEndpoint

        try {
            const {data} = await httpClient.get(url);
        }catch {
            // take in httpClient
        }
        done();
    },
});

export default addCategory;
