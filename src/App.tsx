import React, {useState} from 'react';
import {BrowserRouter} from 'react-router-dom'
import {ToastContainer} from "react-toastify";
import Routes from "./routes/Routes";
import {useSelector} from 'react-redux'
import {PleaseWait} from "./components/PleaseWait";
import CacheBuster from "./CacheBuster";

const App: React.FC = () => {

    const oidcState: any = useSelector((state: any) => state.oidc)

    const {user, isLoadingUser} = oidcState

    if (isLoadingUser) {
        return <PleaseWait/>
    } else {

        return (
            <CacheBuster>
                {({loading, isLatestVersion, refreshCacheAndReload}: any) => {
                    if (loading) return null;
                    if (!loading && !isLatestVersion) {
                        refreshCacheAndReload();
                    }

                    return <>
                        <ToastContainer enableMultiContainer={false} hideProgressBar/>
                        <>
                            <BrowserRouter children={Routes} basename={"/"}/>
                        </>
                    </>;
                }}
            </CacheBuster>
        )


    }
}

export default App;
