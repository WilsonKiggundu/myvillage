import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {ToastContainer} from "react-toastify";
import ContentSwitch from "./modules/ContentSwitch";
import {useSelector} from 'react-redux'
import LoaderDialog from "./components/LoaderDialog";

const App: React.FC = () => {
  const coreState: any = useSelector((state: any) => state.core)

  const {globalLoader} = coreState

    return <Router>
      <ToastContainer/>
      <>
        {<LoaderDialog open={globalLoader}/>}
        <ContentSwitch/>
      </>
    </Router>;
}

export default App;
