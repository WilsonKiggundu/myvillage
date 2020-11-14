import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import {ToastContainer} from "react-toastify";
import Routes from "./routes/Routes";
import {useSelector} from 'react-redux'
import LoaderDialog from "./components/LoaderDialog";
import Splash from "./modules/login/Splash";
import {AuthProvider} from "./modules/auth/AuthProvider";

const App: React.FC = () => {
    const coreState: any = useSelector((state: any) => state.core)

    const {globalLoader, isUserLoading} = coreState

    if (isUserLoading) {
        return <Splash />
    } else {
        return <AuthProvider>
            <ToastContainer/>
            <>
                {<LoaderDialog open={globalLoader}/>}
                <BrowserRouter children={Routes} basename={"/"} />
            </>
        </AuthProvider>;
    }
}

export default App;
