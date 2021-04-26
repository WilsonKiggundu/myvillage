import React, {useState} from 'react';
import {BrowserRouter} from 'react-router-dom'
import {ToastContainer} from "react-toastify";
import Routes from "./routes/Routes";
import {useSelector} from 'react-redux'
import {PleaseWait} from "./components/PleaseWait";
import {Alert} from "@material-ui/lab";
import ReactGA from 'react-ga'
import CacheBuster from "./CacheBuster";
import {getToken, onMessageListener} from "./utils/web-push/firebase";
import {Snackbar} from "@material-ui/core";
// import {Toast} from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

if (process.env.GA_TRACKING_ID) {
    ReactGA.initialize(process.env.GA_TRACKING_ID)
}

const App: React.FC = () => {

    const [show, setShow] = useState(false);
    const [notification, setNotification] = useState({title: '', body: ''});
    const [isTokenFound, setTokenFound] = useState(false);

    getToken(setTokenFound);

    onMessageListener().then(payload => {
        setShow(true);
        setNotification({title: payload.notification.title, body: payload.notification.body})
        console.log(payload);
    }).catch(err => console.log('failed: ', err));

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

                        <Snackbar
                            open={show}
                            autoHideDuration={5000}
                            onClose={() => setShow(false)}>
                            <Alert
                                onClose={() => setShow(false)}
                                severity={"info"}>
                                {notification.body}
                            </Alert>
                        </Snackbar>

                        {/*{show && <Alert severity={"info"}>{notification.body}</Alert>}*/}

                        <ToastContainer enableMultiContainer={false} hideProgressBar/>
                        <>
                            {/*{<LoaderDialog open={globalLoader}/>}*/}
                            <BrowserRouter children={Routes} basename={"/"}/>
                        </>
                    </>;
                }}
            </CacheBuster>
        )


    }
}

export default App;
