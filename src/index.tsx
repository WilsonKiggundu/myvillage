import React from 'react';
import ReactDOM from 'react-dom';
import {ThemeProvider,} from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import store from "./data/store";
import './index.css';
import * as serviceWorker from './serviceWorker';
import theme from "./theme";
import {OidcProvider} from "redux-oidc";
import userManager from "./utils/userManager";
import App from "./App";
import {Provider} from "react-redux";

ReactDOM.render(
    <Provider store={store}>
        <OidcProvider store={store} userManager={userManager}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <App />
            </ThemeProvider>
        </OidcProvider>
    </Provider>, document.getElementById('root'));

serviceWorker.register();
