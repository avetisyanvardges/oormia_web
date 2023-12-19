import React from 'react';
import ReactDOM from 'react-dom/client';
import {unstable_HistoryRouter as HistoryRouter} from "react-router-dom";
import {Provider} from "react-redux";
import history from "utils/browserHistory";
import {store} from "state/store";
import reportWebVitals from './reportWebVitals';
import App from './App';
import './index.css';
import 'antd/dist/antd.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <HistoryRouter history={history}>
            <App />
        </HistoryRouter>
    </Provider>
);
reportWebVitals();

// order filtering is company order balance hisory table
