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

    if (isLoadingUser) {
        return <PleaseWait/>
    } else {

        return <>
            <ToastContainer enableMultiContainer={false} hideProgressBar/>
            <>
                {/*{<LoaderDialog open={globalLoader}/>}*/}
                <BrowserRouter children={Routes} basename={"/"}/>
            </>
        </>;
    }
}

export default App;
