import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {ToastContainer} from "react-toastify";
import ContentSwitch from "./modules/ContentSwitch";
import {useSelector} from 'react-redux'
import LoaderDialog from "./components/LoaderDialog";
import Splash from "./modules/login/Splash";

const App: React.FC = () => {
    const coreState: any = useSelector((state: any) => state.core)

    const {globalLoader, isUserLoading} = coreState

    if (isUserLoading) {
        return <Splash />
    } else {
        return <Router>
            <ToastContainer/>
            <>
                {<LoaderDialog open={globalLoader}/>}
                <ContentSwitch/>
            </>
        </Router>;
    }
}

export default App;
