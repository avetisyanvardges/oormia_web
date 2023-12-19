import {createLogicMiddleware} from "redux-logic";
import {applyMiddleware, compose, legacy_createStore as createStore} from "redux";
import httpClient from "lib/httpClient";
import rootOperations from "./rootOperations";
import {rootReducer} from "./rootReducer";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const operationsDependencies: any = { httpClient };
const logicMiddleware = createLogicMiddleware(rootOperations, operationsDependencies);
export const store = createStore(rootReducer, composeEnhancers( applyMiddleware(logicMiddleware) ));
