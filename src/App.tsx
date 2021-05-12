import React, {useEffect, useState} from 'react';
import {BrowserRouter, useHistory} from 'react-router-dom'
import {ToastContainer} from "react-toastify";
import Routes from "./routes/Routes";
import {useSelector} from 'react-redux'
import {PleaseWait} from "./components/PleaseWait";
import CacheBuster from "./CacheBuster";
import {getToken, onMessageListener} from "./firebase";
import {Alert} from "@material-ui/lab";
import {Avatar, Grid, Snackbar} from "@material-ui/core";
import {timeAgo} from "./utils/dateHelpers";
import {Urls} from "./routes/Urls";

const App: React.FC = () => {

    const [show, setShow] = useState(false);
    const [notification, setNotification] = useState<any>({});
    const [isTokenFound, setTokenFound] = useState(false);

    onMessageListener().then(payload => {
        setShow(true);
        setNotification({...payload})
    }).catch(err => console.log('failed: ', err));

    const oidcState: any = useSelector((state: any) => state.oidc)

    const {user, isLoadingUser} = oidcState

    useEffect(() => {
        if (user) {
            getToken(setTokenFound, user.profile.sub)
        }
    }, [user])

    const handleNotification = (notification: any) => {
        if (notification.data.postId) {
            window.location.replace(`${Urls.feed}?postId=${notification.data.postId}`)
        }
        if (notification.data.profileId) {
            window.location.replace(`${Urls.profiles.onePerson(notification.data.profileId)}`)
        }
    }

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
                        <Snackbar
                            style={{cursor: 'pointer'}}
                            onClick={() => handleNotification(notification)}
                            anchorOrigin={{vertical: "bottom", horizontal: "left"}}
                            open={show} autoHideDuration={10000}
                            onClose={() => setShow(false)}>
                            <Alert onClose={() => setShow(false)} icon={false} severity="success">
                                <Grid container spacing={2}>
                                    {
                                        notification.icon &&
                                        <Grid item>
                                            <Avatar src={notification.icon}/>
                                        </Grid>
                                    }
                                    <Grid item>
                                        <h6>{notification.title}</h6>
                                        {notification.body && <p>{notification.body}</p>}
                                        {/*<small>{timeAgo(notification.date)}</small>*/}
                                    </Grid>
                                </Grid>
                            </Alert>
                        </Snackbar>
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
