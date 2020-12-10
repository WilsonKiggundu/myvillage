import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {ThemeProvider,} from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import store from "./data/store";
import './index.css';
import App from './App';

import * as serviceWorker from './serviceWorker';
import theme from "./theme";
// @ts-ignore
import PWAPrompt from 'react-ios-pwa-prompt';

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <>
                <CssBaseline/>
                <PWAPrompt
                    copyBody="MyVillage has app functionality. Add it to your home screen to use it as a native app and while offline"
                    promptOnVisit={1}
                    timesToShow={3}
                    copyClosePrompt="Close"
                    permanentlyHideOnDismiss={true}/>
                <App/>
            </>
        </ThemeProvider>
    </Provider>, document.getElementById('root'));

serviceWorker.unregister();
