import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {createWrapper, HYDRATE} from 'next-redux-wrapper';
import movies from "./movies";


const combinedReducer  = combineReducers({
    movies,
});

const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        return {
            ...state,
            ...action.payload,
        };
    }
    return combinedReducer(state, action);
};

const store = configureStore({
    reducer,
});

export const makeStore = () => store;
export const wrapper = createWrapper(makeStore);

export default store;
