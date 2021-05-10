import React, {useEffect, useState} from 'react';
import {BrowserRouter} from 'react-router-dom'
import {ToastContainer} from "react-toastify";
import Routes from "./routes/Routes";
import {useSelector} from 'react-redux'
import {PleaseWait} from "./components/PleaseWait";
import CacheBuster from "./CacheBuster";
import {getToken, onMessageListener} from "./firebase";
import Toast from "./utils/Toast";

const App: React.FC = () => {

    const [show, setShow] = useState(false);
    const [notification, setNotification] = useState({title: '', body: ''});
    const [isTokenFound, setTokenFound] = useState(false);

    onMessageListener().then(payload => {
        setShow(true);
        setNotification({title: payload.notification.title, body: payload.notification.body})
        console.log(payload);

        Toast.success(payload.notification.title)
    }).catch(err => console.log('failed: ', err));

    const oidcState: any = useSelector((state: any) => state.oidc)

    const {user, isLoadingUser} = oidcState

    useEffect(() => {
        if(user){
            getToken(setTokenFound, user.profile.sub)
                .then((response: any) => {

                });
        }
    }, [user])


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
