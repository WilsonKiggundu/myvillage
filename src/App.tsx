import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {ToastContainer} from "react-toastify";
import ContentSwitch from "./modules/ContentSwitch";
import Splash from "./modules/login/Splash";
import {useSelector} from 'react-redux'
import LoaderDialog from "./components/LoaderDialog";
import Home from "./modules/home/Home";
import FrontLayout from "./components/layout/FrontLayout";

const App: React.FC = () => {
  const coreState: any = useSelector((state: any) => state.core)

  const {isLoadingUser, user, globalLoader} = coreState
  if (isLoadingUser) {
    return <Splash/>
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
