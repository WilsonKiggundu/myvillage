import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import {ToastContainer} from "react-toastify";
import Routes from "./routes/Routes";
import {useSelector} from 'react-redux'
import LoaderDialog from "./components/LoaderDialog";
import Splash from "./modules/login/Splash";
import {AuthProvider} from "./modules/auth/AuthProvider";
import {PleaseWait} from "./components/PleaseWait";
import {Alert} from "@material-ui/lab";
import XAlert from "./components/alerts/XAlert";
import {coreConstants} from "./data/coreReducer";
import {withSnackbar} from "notistack";

const App: React.FC = () => {
    const oidcState: any = useSelector((state: any) => state.oidc)

    const {user, isLoadingUser} = oidcState

    const isServiceWorkerInitialized = useSelector(
        (state: any) => state.serviceWorkerInitialized,
    )

    const isServiceWorkerUpdated = useSelector(
        (state: any) => state.serviceWorkerUpdated,
    )

    const serviceWorkerRegistration = useSelector(
        (state: any) => state.serviceWorkerRegistration,
    )

    const updateServiceWorker = () => {
        const registrationWaiting = serviceWorkerRegistration.waiting;

        if (registrationWaiting) {
            registrationWaiting.postMessage({ type: 'SKIP_WAITING' });

            registrationWaiting.addEventListener('statechange', (e: any) => {
                if (e.target.state === 'activated') {
                    window.location.reload();
                }
            });
        }
    };

    if (isLoadingUser) {
        return <PleaseWait/>
    } else {

        return <>
            <ToastContainer enableMultiContainer={false} hideProgressBar/>
            <>
                {isServiceWorkerInitialized && (
                        <XAlert text="Service Worker is initialized for the first time"
                                type={coreConstants.swInit} />
                    )}
                    {isServiceWorkerUpdated && (
                        <XAlert
                            text="There is a new version available."
                            buttonText="Update"
                            type={coreConstants.swUpdate}
                            onClick={updateServiceWorker}
                        />
                    )}

                {/*{<LoaderDialog open={globalLoader}/>}*/}
                <BrowserRouter children={Routes} basename={"/"}/>
            </>
        </>;
    }
}

export default App;
